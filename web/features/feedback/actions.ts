"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { getSessionOrRedirect } from "@/lib/auth/session";
import {
  betaFeedbackKinds,
  betaFeedbackSeverities,
  betaFeedbackStatuses,
  canViewBetaFeedback,
} from "@/features/feedback/constants";
import type {
  BetaFeedbackKind,
  BetaFeedbackSeverity,
  BetaFeedbackStatus,
} from "@/types/database";

function getString(formData: FormData, key: string, max = 4000): string {
  const value = String(formData.get(key) ?? "").trim();
  return value.slice(0, max);
}

function pickAllowed<T extends string>(
  value: string,
  allowed: readonly T[],
  fallback: T,
): T {
  return allowed.includes(value as T) ? (value as T) : fallback;
}

export async function criarBetaFeedback(formData: FormData): Promise<void> {
  const ctx = await getSessionOrRedirect();
  const supabase = await createClient();

  const kind = pickAllowed<BetaFeedbackKind>(
    getString(formData, "kind", 40),
    betaFeedbackKinds,
    "bug",
  );
  const severity = pickAllowed<BetaFeedbackSeverity>(
    getString(formData, "severity", 40),
    betaFeedbackSeverities,
    "media",
  );
  const title = getString(formData, "title", 160);
  const description = getString(formData, "description", 4000);
  const pagePath = getString(formData, "page_path", 500) || null;
  const userAgent = getString(formData, "user_agent", 1000) || null;

  if (!title) throw new Error("Informe um título curto para o feedback.");
  if (!description) throw new Error("Descreva o bug, sugestão ou inconsistência.");

  const { error } = await supabase.from("beta_feedback").insert({
    created_by: ctx.userId,
    user_email: ctx.email,
    user_name: ctx.profile.nome_completo,
    page_path: pagePath,
    user_agent: userAgent,
    kind,
    severity,
    title,
    description,
    status: "novo",
  });

  if (error) throw error;
  revalidatePath("/admin/feedback-beta");
}

export async function atualizarBetaFeedbackStatus(
  formData: FormData,
): Promise<void> {
  const ctx = await getSessionOrRedirect();
  if (!canViewBetaFeedback(ctx.email)) {
    throw new Error("Acesso negado ao painel de feedback beta.");
  }

  const id = getString(formData, "id", 80);
  const status = pickAllowed<BetaFeedbackStatus>(
    getString(formData, "status", 40),
    betaFeedbackStatuses,
    "novo",
  );
  const adminNotes = getString(formData, "admin_notes", 2000) || null;

  if (!id) throw new Error("Feedback inválido.");

  const supabase = await createClient();
  const { error } = await supabase
    .from("beta_feedback")
    .update({ status, admin_notes: adminNotes })
    .eq("id", id);

  if (error) throw error;
  revalidatePath("/admin/feedback-beta");
}
