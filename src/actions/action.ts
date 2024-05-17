"use server";

import { DEFAULT_SIGNIN_PATH, DEFAULT_SIGNIN_REDIRECT } from "@/lib/routes";
import { createClient } from "@/lib/supabase/server";

import { Provider } from "@supabase/supabase-js";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function signInOauth(provider: Provider) {
  const supabase = createClient();
  const origin = headers().get("origin");
  const { error, data } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    return redirect(
      `${DEFAULT_SIGNIN_PATH}?message=Could not authenticate user`
    );
  }
  return redirect(data.url);
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect(DEFAULT_SIGNIN_PATH);
}

export async function signInRedirect() {
  const supabase = createClient();
  const user = await supabase.auth.getUser();
  if (user) return redirect(DEFAULT_SIGNIN_REDIRECT);
}
