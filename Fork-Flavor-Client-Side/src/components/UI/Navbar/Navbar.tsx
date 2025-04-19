"use client";

import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import logo from "../../../public/logo-nav.png";

import NavbarDropdown from "./NavbarDropdown";

import { useUser } from "@/src/context/user.provider";

export default function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const { user } = useUser();
  const router = useRouter();

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "All Recipes", href: "/recipe" },
    { name: "About US", href: "/about" },
    { name: "Contact US", href: "/contact" },
  ];

  return (
    <Navbar
      className="bg-[#e69f42] py-0 md:py-3 w-full"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/">
            <Image alt={"Logo"} className="w-[180px]" src={logo} />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem key={index}>
            <Link
              className={`text-gray-800 font-extrabold text-lg px-2 py-1 hover:bg-[#fef0e0] rounded-lg transition duration-300 ease-in-out`}
              color="foreground"
              href={item.href}
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        {user?.email ? (
          <NavbarItem className=" sm:flex gap-2">
            <NavbarDropdown />
          </NavbarItem>
        ) : (
          <NavbarItem className=" sm:flex gap-2">
            <Button
              className="bg-blue-500 text-white text-lg rounded-none font-bold"
              onClick={() => router.push("/login")}
            >
              Login
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link className="w-full" href={item.href} size="lg">
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
