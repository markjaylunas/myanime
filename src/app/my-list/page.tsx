import { auth } from "@/auth";
import NotSignedIn from "@/components/ui/NotSignedIn";

export default async function MyListPage() {
  const session = await auth();

  if (!session) return <NotSignedIn />;

  return (
    <main className="container max-w-5xl mx-auto min-h-screen px-2 py-4 md:px-4">
      MyList Page
      <>
        <p>Already signed in as {session.user?.email}</p>
        <pre>{JSON.stringify(session, null, 2)}</pre>
      </>
    </main>
  );
}
