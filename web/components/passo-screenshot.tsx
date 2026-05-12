"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { useRouter } from "next/navigation";
import { Image as ImageIcon, Paperclip, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  uploadScreenshot,
  getScreenshotSignedUrl,
  deleteScreenshot,
} from "@/lib/storage/screenshots";
import { setPassoScreenshot } from "@/features/journeys/actions";

/**
 * Botão por passo que abre um modal aceitando paste (Ctrl+V) ou drag&drop
 * de uma imagem. Faz upload para o Supabase Storage e persiste o path no
 * registro do passo via Server Action. Se já houver imagem, mostra preview
 * com signed URL temporária.
 */
export default function PassoScreenshot({
  jornadaId,
  passoId,
  initialPath,
  disabled,
}: {
  jornadaId: string;
  passoId: string;
  initialPath: string | null;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [previewBlobUrl, setPreviewBlobUrl] = useState<string | null>(null);
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, startTransition] = useTransition();
  const router = useRouter();
  const dropRef = useRef<HTMLDivElement>(null);

  const hasScreenshot = !!initialPath;

  useEffect(() => {
    if (!open || !hasScreenshot || previewBlobUrl) return;
    let cancelled = false;
    getScreenshotSignedUrl(initialPath!).then((u) => {
      if (!cancelled) setSignedUrl(u);
    });
    return () => {
      cancelled = true;
    };
  }, [open, hasScreenshot, initialPath, previewBlobUrl]);

  const handleFile = useCallback(
    (file: File | Blob) => {
      if (previewBlobUrl) URL.revokeObjectURL(previewBlobUrl);
      const url = URL.createObjectURL(file);
      setPreviewBlobUrl(url);
      setError(null);

      startTransition(async () => {
        try {
          const ext =
            (file as File).type?.split("/")[1] ??
            (file as File).name?.split(".").pop() ??
            "png";
          const { path } = await uploadScreenshot(file, {
            jornadaId,
            passoId,
            extension: ext,
          });
          await setPassoScreenshot(passoId, path);
          router.refresh();
        } catch (err) {
          setError(err instanceof Error ? err.message : "Erro ao enviar imagem");
        }
      });
    },
    [jornadaId, passoId, previewBlobUrl, router],
  );

  // Paste global enquanto modal está aberto
  useEffect(() => {
    if (!open) return;

    function onPaste(e: ClipboardEvent) {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const item of items) {
        if (item.type.startsWith("image/")) {
          const blob = item.getAsFile();
          if (blob) {
            e.preventDefault();
            handleFile(blob);
            return;
          }
        }
      }
    }

    document.addEventListener("paste", onPaste);
    return () => document.removeEventListener("paste", onPaste);
  }, [open, handleFile]);

  useEffect(() => {
    return () => {
      if (previewBlobUrl) URL.revokeObjectURL(previewBlobUrl);
    };
  }, [previewBlobUrl]);

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) handleFile(file);
  }

  function onDragOver(e: React.DragEvent) {
    e.preventDefault();
  }

  function onPickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  function handleRemove() {
    if (!initialPath) return;
    if (!confirm("Remover o print deste passo?")) return;
    startTransition(async () => {
      try {
        await deleteScreenshot(initialPath);
        await setPassoScreenshot(passoId, null);
        setPreviewBlobUrl(null);
        setSignedUrl(null);
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao remover");
      }
    });
  }

  return (
    <>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(true)}
        title={hasScreenshot ? "Ver / trocar print" : "Anexar print"}
        className={`inline-flex h-7 w-7 items-center justify-center rounded-md border transition-colors ${
          hasScreenshot
            ? "bg-blue-50 border-blue-300 text-blue-700 hover:bg-blue-100 dark:bg-blue-950/40 dark:border-blue-800 dark:text-blue-200"
            : "bg-background hover:bg-muted"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {hasScreenshot ? (
          <ImageIcon className="h-4 w-4" />
        ) : (
          <Paperclip className="h-4 w-4" />
        )}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-2xl rounded-lg border bg-background shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b px-5 py-3">
              <div>
                <h3 className="font-medium">Print do passo</h3>
                <p className="text-xs text-muted-foreground">
                  Cole (Ctrl+V), arraste, ou selecione um arquivo de imagem.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md p-1 hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-5 flex flex-col gap-4">
              <div
                ref={dropRef}
                onDrop={onDrop}
                onDragOver={onDragOver}
                className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-3 min-h-[260px] text-sm text-muted-foreground bg-muted/20"
              >
                {previewBlobUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={previewBlobUrl}
                    alt="Preview do print"
                    className="max-h-72 rounded border"
                  />
                ) : signedUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={signedUrl}
                    alt="Print salvo"
                    className="max-h-72 rounded border"
                  />
                ) : (
                  <>
                    <ImageIcon className="h-8 w-8 opacity-50" />
                    <div className="text-center">
                      <div>Cole uma imagem aqui (Ctrl+V)</div>
                      <div className="text-xs opacity-70">
                        ou arraste um arquivo de imagem
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <label className="inline-flex">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onPickFile}
                    className="hidden"
                    disabled={disabled || busy}
                  />
                  <span
                    role="button"
                    className="inline-flex items-center gap-2 rounded-md border bg-background px-3 py-1.5 text-sm hover:bg-muted cursor-pointer"
                  >
                    <Paperclip className="h-4 w-4" /> Selecionar arquivo
                  </span>
                </label>
                {hasScreenshot && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={busy || disabled}
                    onClick={handleRemove}
                  >
                    <Trash2 className="h-4 w-4 mr-1.5" />
                    Remover
                  </Button>
                )}
                {busy && (
                  <span className="text-xs text-muted-foreground">
                    enviando…
                  </span>
                )}
              </div>

              {error && (
                <p className="text-sm text-red-600 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-md p-3">
                  {error}
                </p>
              )}
            </div>

            <div className="border-t px-5 py-3 flex justify-end">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Fechar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
