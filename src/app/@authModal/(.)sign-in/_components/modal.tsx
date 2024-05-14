"use client";

import SignInHeader from "@/app/sign-in/_components/SignInHeader";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { usePathname, useRouter } from "next/navigation";

export default function AuthModal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isOpen = pathname === "/sign-in";
  return (
    <Modal
      backdrop="opaque"
      defaultOpen
      isOpen={isOpen}
      onClose={() => router.replace("/")}
    >
      <ModalHeader>
        <SignInHeader />
      </ModalHeader>
      <ModalContent>
        <ModalBody>{children}</ModalBody>
      </ModalContent>
      <ModalFooter></ModalFooter>
    </Modal>
  );
}
