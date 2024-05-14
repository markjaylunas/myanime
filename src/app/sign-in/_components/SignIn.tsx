import OAuthButon from "./OAuthButton";

export default function SignIn() {
  return (
    <>
      <OAuthButon provider="google">Sign in with Google</OAuthButon>
      <OAuthButon provider="github">Sign in with Github</OAuthButon>
    </>
  );
}
