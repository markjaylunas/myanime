// import { toTitleCase } from "@/lib/utils";
// import { Avatar } from "@nextui-org/avatar";
// import {
//   Dropdown,
//   DropdownItem,
//   DropdownMenu,
//   DropdownSection,
//   DropdownTrigger,
// } from "@nextui-org/dropdown";
// import { useTheme } from "next-themes";
// import NextLink from "next/link";
// import { Icons } from "./Icons";

// type Props = {
//   // user: User;
// };

// export default function UserAvatar({  }: Props) {
//   const { theme, setTheme } = useTheme();
//   // const { email, full_name, avatar_url, picture } = user.user_metadata;
//   return (
//     <Dropdown placement="bottom-end">
//       <DropdownTrigger>
//         <Avatar
//           isBordered
//           as="button"
//           name={full_name}
//           src={avatar_url || picture}
//         />
//       </DropdownTrigger>
//       <DropdownMenu aria-label="Profile Actions" variant="flat">
//         <DropdownSection title="User" showDivider>
//           <DropdownItem key="profile" isReadOnly className="h-14 gap-2">
//             <p className="font-semibold">{toTitleCase(full_name)}</p>
//             <p className="text-sm">{email}</p>
//           </DropdownItem>
//         </DropdownSection>
//         <DropdownSection>
//           <DropdownItem
//             as={NextLink}
//             href="/setting"
//             startContent={<Icons.setting className="size-4" />}
//             key="settings"
//           >
//             My Settings
//           </DropdownItem>
//           <DropdownItem
//             key="theme toggle"
//             onPress={() => setTheme(theme === "dark" ? "light" : "dark")}
//             startContent={
//               theme === "dark" ? (
//                 <Icons.moon className="size-4" />
//               ) : (
//                 <Icons.sun className="size-4" />
//               )
//             }
//           >
//             {theme === "dark" ? "Dark" : "Light"}
//           </DropdownItem>
//           <DropdownItem
//             startContent={<Icons.logout className="size-4" />}
//             onPress={() => signOut()}
//             key="logout"
//             color="danger"
//           >
//             Log out
//           </DropdownItem>
//         </DropdownSection>
//       </DropdownMenu>
//     </Dropdown>
//   );
// }
