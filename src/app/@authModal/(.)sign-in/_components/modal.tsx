"use client";

import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/modal";
import { usePathname, useRouter } from "next/navigation";

export default function AuthModal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isOpen = pathname === "/sign-in";
  return (
    <Modal defaultOpen isOpen={isOpen} onClose={() => router.replace("/")}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">Sign In</ModalHeader>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
}
