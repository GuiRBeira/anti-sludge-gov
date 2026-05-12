"use client";

import { createClient } from "@/lib/supabase/client";

const BUCKET = "passo-screenshots";

export type UploadResult = { path: string };

/**
 * Faz upload de uma imagem (blob) para o bucket privado de screenshots.
 * Retorna o path armazenado, que deve ser persistido em
 * `passo_jornada.screenshot_path` via Server Action.
 */
export async function uploadScreenshot(
  blob: Blob,
  opts: { jornadaId: string; passoId: string; extension?: string },
): Promise<UploadResult> {
  const supabase = createClient();
  const ext = opts.extension ?? blob.type.split("/")[1] ?? "png";
  const path = `${opts.jornadaId}/${opts.passoId}.${ext}`;

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .upload(path, blob, {
      contentType: blob.type || "image/png",
      upsert: true,
      cacheControl: "no-cache",
    });
  if (error) throw error;
  return { path: data.path };
}

/**
 * Gera uma URL assinada temporária para exibir a imagem.
 * Expira em 1 hora — para previews curtos é suficiente.
 */
export async function getScreenshotSignedUrl(
  path: string,
  expiresInSeconds = 3600,
): Promise<string | null> {
  const supabase = createClient();
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(path, expiresInSeconds);
  if (error || !data) return null;
  return data.signedUrl;
}

export async function deleteScreenshot(path: string): Promise<void> {
  const supabase = createClient();
  const { error } = await supabase.storage.from(BUCKET).remove([path]);
  if (error) throw error;
}
