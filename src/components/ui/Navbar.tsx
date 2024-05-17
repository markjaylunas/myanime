"use client";

import { routesConfig, siteConfig } from "@/lib/config";
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextNavbar,
} from "@nextui-org/react";
import { motion } from "framer-motion";
import NextLink from "next/link";
import React, { useState } from "react";
import { Icons } from "./Icons";
import MyLink from "./MyLink";
import QuickSearch from "./QuickSearch";
import { ThemeSwitcher } from "./ThemeSwitcher";

type Props = {};

export default function Navbar({}: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <NextNavbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      shouldHideOnScroll
      maxWidth="2xl"
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

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {routesConfig.mainNav.map((item, index) => (
          <NavbarItem key={`${item.title}-${index}`}>
            <MyLink href={item.href} className="font-medium">
              {item.title}
            </MyLink>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <QuickSearch />
        </NavbarItem>

        {/* <NavbarItem>
          {user === null && (
            <MyLink href={DEFAULT_SIGNIN_PATH} className="font-medium">
              Sign In
            </MyLink>
          )}
          {user !== null && <UserAvatar user={user} />}
        </NavbarItem> */}

        {/* {user === null && (
          <NavbarItem onClick={closeMenu} className="sm:flex hidden">
            <ThemeSwitcher />
          </NavbarItem>
        )} */}

        <NavbarMenuToggle className="sm:hidden" />
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
          {routesConfig.mainNav.map((item, index) => (
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
