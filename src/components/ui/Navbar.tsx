"use client";

import { routesConfig, siteConfig } from "@/lib/config";
import { DEFAULT_SIGNIN_PATH } from "@/lib/routes";
import { MainNavItem } from "@/lib/types";
import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextNavbar,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import { User } from "next-auth";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Icons } from "./Icons";
import MyLink from "./MyLink";
import QuickSearch from "./QuickSearch";
import { ThemeSwitcher } from "./ThemeSwitcher";
import UserAvatar from "./UserAvatar";

type Props = {
  user: User | null;
};

export default function Navbar({ user }: Props) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  let routes: MainNavItem[] = [];
  if (pathname.startsWith("/s1")) routes = routesConfig.s1Nav;
  if (pathname.startsWith("/s2")) routes = routesConfig.s2Nav;
  return (
    <NextNavbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      maxWidth="2xl"
      shouldHideOnScroll
    >
      <NavbarContent>
        <NavbarBrand>
          <MyLink
            as={NextLink}
            href="/"
            color="foreground"
            className="rounded-md space-x-3"
          >
            <Icons.logo className=" size-10" />
            <span className="font-medium text- text-xl sr-only md:not-sr-only ">
              {siteConfig.name}
            </span>
          </MyLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="center">
        {routes.length > 0 && (
          <Dropdown>
            <NavbarItem>
              <DropdownTrigger>
                <Button
                  disableRipple
                  className="bg-transparent data-[hover=true]:bg-transparent font-medium text-md"
                  endContent={<Icons.chevronDown />}
                  radius="sm"
                  variant="light"
                >
                  Servers
                </Button>
              </DropdownTrigger>
            </NavbarItem>
            <DropdownMenu
              aria-label="Anime"
              className="w-[340px]"
              itemClasses={{
                base: "gap-4",
              }}
            >
              <DropdownItem
                key="anime_s1"
                description="Reliable but may experience slower speeds."
                href="/s1"
              >
                Server 1
              </DropdownItem>
              <DropdownItem
                key="anime_s2"
                description="Faster and more efficient for a smoother viewing experience."
                href="/s2"
                endContent={
                  <Chip color="primary" size="sm">
                    Recommended
                  </Chip>
                }
              >
                Server 2
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </NavbarContent>
      <NavbarContent className="hidden md:flex gap-4 md:gap-8" justify="center">
        {routes.map((item, index) => (
          <NavbarItem key={`${item.title}-${index}`}>
            <MyLink href={item.href} className="font-medium">
              {item.title}
            </MyLink>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>{routes.length > 0 && <QuickSearch />}</NavbarItem>

        <NavbarItem>
          {user === null && (
            <MyLink href={DEFAULT_SIGNIN_PATH} className="font-medium">
              Sign In
            </MyLink>
          )}
          {user !== null && <UserAvatar user={user} />}
        </NavbarItem>

        {user === null && (
          <NavbarItem onClick={closeMenu} className="sm:flex hidden">
            <ThemeSwitcher />
          </NavbarItem>
        )}

        <NavbarMenuToggle className="md:hidden" />
      </NavbarContent>

      <NavbarMenu>
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col justify-start  items-center gap-10"
        >
          <NavbarMenuItem>
            <ThemeSwitcher className="md:hidden" />
          </NavbarMenuItem>
          {routes.map((item, index) => (
            <NavbarMenuItem key={`${item.href}-${index}`}>
              <MyLink
                className="text-4xl font-bold w-full"
                href={item.href}
                onClick={closeMenu}
                size="lg"
              >
                {item.title}
              </MyLink>
            </NavbarMenuItem>
          ))}
        </motion.div>
      </NavbarMenu>
    </NextNavbar>
  );
}
