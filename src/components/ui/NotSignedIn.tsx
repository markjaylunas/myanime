import { DEFAULT_SIGNIN_PATH } from "@/lib/routes";
import Heading from "./Heading";
import MyLink from "./MyLink";

export default function NotSignedIn() {
  return (
    <main className="container max-w-5xl mx-auto min-h-screen px-2 py-4 md:px-4 flex justify-center items-center gap-10 flex-col">
      <Heading>Not signed in</Heading>

      <p>
        Please{" "}
        <MyLink
          href={DEFAULT_SIGNIN_PATH}
          className="underline underline-offset-1 text-primary-500"
        >
          sign in
        </MyLink>{" "}
        to view this page.
      </p>
    </main>
  );
}
