import { supabase } from "./supabase";

export type UserPlan = "free" | "pro" | "admin";

export type UserProfile = {
  id: string;
  email: string;
  role: string;
  plan: UserPlan;
  credits: number;
};

export async function getUserProfile(email: string) {
  const { data, error } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("email", email)
    .single();

  if (error || !data) {
    return null;
  }

  return data as UserProfile;
}

export function isAdmin(profile: UserProfile | null) {
  return profile?.role === "admin" || profile?.plan === "admin";
}

export function isPro(profile: UserProfile | null) {
  return profile?.plan === "pro" || isAdmin(profile);
}

export function canUsePaidTools(profile: UserProfile | null) {
  return profile?.plan === "pro" || profile?.plan === "admin";
}

export function getPlanLabel(profile: UserProfile | null) {
  if (!profile) return "Guest";
  if (profile.plan === "admin") return "Admin Unlimited";
  if (profile.plan === "pro") return "Pro";
  return "Free";
}