import SignIn from "@/app/sign-in/_components/SignIn";
import SignInHeader from "@/app/sign-in/_components/SignInHeader";
import { Spacer } from "@nextui-org/spacer";

export default function AuthModalPage() {
  return (
    <>
      <Spacer y={2} />
      <SignInHeader />
      <Spacer y={2} />

      <SignIn />
      <Spacer y={2} />
    </>
  );
}
