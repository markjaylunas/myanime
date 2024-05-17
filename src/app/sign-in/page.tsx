import { Card, CardBody, CardHeader } from "@nextui-org/card";
import SignIn from "./_components/SignIn";
import SignInHeader from "./_components/SignInHeader";

export default async function SignInPage() {
  return (
    <main className="container max-w-5xl mx-auto min-h-screen px-2 py-4 md:px-4 space-y-8">
      <Card classNames={{ base: "max-w-sm mx-auto mt-10" }}>
        <CardHeader>
          <SignInHeader />
        </CardHeader>

        <CardBody className="space-y-4">
          <SignIn />
        </CardBody>
      </Card>
    </main>
  );
}
