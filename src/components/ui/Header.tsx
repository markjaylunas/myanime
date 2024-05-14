import { createClient } from "@/lib/supabase/server";
import Navbar from "./Navbar";

export default async function Header() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header>
      <Navbar user={user} />
    </header>
  );
}
