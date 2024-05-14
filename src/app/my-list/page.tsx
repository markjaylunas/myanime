import { DEFAULT_SIGNIN_PATH } from "@/lib/routes";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function MyListPage() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect(DEFAULT_SIGNIN_PATH);
  }
  return <main>MyList Page</main>;
}
