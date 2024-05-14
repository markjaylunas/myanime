import { DEFAULT_SIGNIN_REDIRECT } from "@/lib/routes";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import OAuthButon from "./_components/OAuthButton";

export default async function SignInPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    redirect(DEFAULT_SIGNIN_REDIRECT);
  }

  return (
    <main>
      Sign in
      <OAuthButon provider="google">Google</OAuthButon>
    </main>
  );
}
