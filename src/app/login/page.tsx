import OAuthButon from "./_components/oauthButton";

export default async function Login() {
  return (
    <main>
      Login
      <OAuthButon provider="google">Google</OAuthButon>
    </main>
  );
}
