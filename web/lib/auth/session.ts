import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { PapelGlobal, Profile } from "@/types/database";

export type SessionContext = {
  userId: string;
  email: string;
  profile: Profile;
};

export async function getSessionOrRedirect(): Promise<SessionContext> {
  const supabase = await createClient();
  const { data: userData, error } = await supabase.auth.getUser();
  if (error || !userData.user) redirect("/auth/login");

  const { data: profile } = await supabase
    .from("profile")
    .select("*")
    .eq("id", userData.user.id)
    .single();

  if (!profile) redirect("/auth/login");

  return {
    userId: userData.user.id,
    email: userData.user.email ?? "",
    profile: profile as Profile,
  };
}

export async function getSessionOrNull(): Promise<SessionContext | null> {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) return null;

  const { data: profile } = await supabase
    .from("profile")
    .select("*")
    .eq("id", userData.user.id)
    .single();
  if (!profile) return null;

  return {
    userId: userData.user.id,
    email: userData.user.email ?? "",
    profile: profile as Profile,
  };
}

export function requireRole(
  ctx: SessionContext,
  allowed: PapelGlobal[],
): void {
  if (!allowed.includes(ctx.profile.papel_global)) {
    throw new Error(
      `Acesso negado: papel '${ctx.profile.papel_global}' não está em [${allowed.join(", ")}]`,
    );
  }
}

export function isAdmin(ctx: SessionContext): boolean {
  return ctx.profile.papel_global === "admin";
}
