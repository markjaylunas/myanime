import SignOutButton from "@/components/auth/signOutButton";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const hasUser = !!user;

  return <>{hasUser && <SignOutButton>Signout</SignOutButton>}</>;
}
