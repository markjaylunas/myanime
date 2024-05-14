import AuthModal from "./_components/modal";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthModal>{children}</AuthModal>;
}
