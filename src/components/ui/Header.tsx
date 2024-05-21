import { auth } from "@/auth";
import Navbar from "./Navbar";

export default async function Header() {
  const session = await auth();
  const user = session?.user ?? null;

  return <Navbar user={user} />;
}
