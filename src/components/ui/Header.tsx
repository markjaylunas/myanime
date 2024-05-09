import { routesConfig, siteConfig } from "@/lib/config";
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/react";
import NextLink from "next/link";
import React from "react";
import { Icons } from "./Icons";
import MyLink from "./MyLink";
import { ThemeSwitcher } from "./ThemeSwitcher";

export default function Header() {
  return (
    <Navbar maxWidth="2xl">
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
            <MyLink color="foreground" href={item.href} className="font-medium">
              {item.title}
            </MyLink>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={NextLink} color="primary" href="/login" variant="flat">
            Log In
          </Button>
        </NavbarItem>
        <NavbarItem className="sm:flex hidden">
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {routesConfig.mainNav.map((item, index) => (
          <NavbarMenuItem key={`${item.href}-${index}`}>
            <MyLink
              color={
                index === 2
                  ? "primary"
                  : index === routesConfig.mainNav.length - 1
                  ? "danger"
                  : "foreground"
              }
              className="w-full"
              href={item.href}
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
