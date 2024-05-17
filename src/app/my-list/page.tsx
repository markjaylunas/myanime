import { auth } from "@/auth";
import { DEFAULT_SIGNIN_PATH } from "@/lib/routes";
import { redirect } from "next/navigation";

export default async function MyListPage() {
  const session = await auth();
  if (!session) redirect(DEFAULT_SIGNIN_PATH);

  return (
    <main>
      MyList Page
      <>
        <p>Already signed in as {session.user?.email}</p>
      </>
    </main>
  );
}
