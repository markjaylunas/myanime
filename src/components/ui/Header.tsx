"use client";

import { routesConfig, siteConfig } from "@/lib/config";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import NextLink from "next/link";
import React, { useState } from "react";
import { Icons } from "./Icons";
import MyLink from "./MyLink";
import { ThemeSwitcher } from "./ThemeSwitcher";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Navbar
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      shouldHideOnScroll
      maxWidth="2xl"
    >
      <NavbarContent>
        <NavbarMenuToggle className="sm:hidden" />
        <NavbarBrand>
          <MyLink
            as={NextLink}
            href="/"
            color="foreground"
            className="rounded-md"
          >
            <Icons.logo className="mr-3 size-10" />
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
        {/* <NavbarItem>
          <Button as={NextLink} color="primary" href="/login" variant="flat">
            Log In
          </Button>
        </NavbarItem> */}
        <NavbarItem onClick={closeMenu} className="sm:flex hidden">
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="flex flex-col justify-start  items-center gap-10">
        <NavbarMenuItem>
          <ThemeSwitcher className="md:hidden" />
        </NavbarMenuItem>
        {routesConfig.mainNav.map((item, index) => (
          <NavbarMenuItem key={`${item.href}-${index}`}>
            <MyLink
              className="text-3xl w-full"
              href={item.href}
              onClick={closeMenu}
              size="lg"
            >
              {item.title}
            </MyLink>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
