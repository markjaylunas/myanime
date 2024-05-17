import { toTitleCase } from "@/lib/utils";
import { Avatar } from "@nextui-org/avatar";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import NextLink from "next/link";
import { Icons } from "./Icons";

type Props = {
  user: User;
};

export default function UserAvatar({ user }: Props) {
  const { theme, setTheme } = useTheme();
  const { name, email, image } = user;

  if (!name || !email || !image) return null;

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar isBordered as="button" name={name} src={image} />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownSection title="User" showDivider>
          <DropdownItem key="profile" isReadOnly className="h-14 gap-2">
            <p className="font-semibold">{toTitleCase(name)}</p>
            <p className="text-sm">{email}</p>
          </DropdownItem>
        </DropdownSection>
        <DropdownSection>
          <DropdownItem
            as={NextLink}
            href="/setting"
            startContent={<Icons.setting className="size-4" />}
            key="settings"
          >
            My Settings
          </DropdownItem>
          <DropdownItem
            key="theme toggle"
            onPress={() => setTheme(theme === "dark" ? "light" : "dark")}
            startContent={
              theme === "dark" ? (
                <Icons.moon className="size-4" />
              ) : (
                <Icons.sun className="size-4" />
              )
            }
          >
            {theme === "dark" ? "Dark" : "Light"}
          </DropdownItem>
          <DropdownItem
            startContent={<Icons.logout className="size-4" />}
            onPress={() => signOut()}
            key="logout"
            color="danger"
          >
            Log out
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
