"use client";
import React, { useEffect, useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button } from "@nextui-org/react";
import faceguard from "../public/faceguard.png"
import Image from "next/image";
import { usePathname } from "next/navigation";
import { auth } from "@/firebase/config";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { DarkModeSwitch } from "./SwitchTheme";
import { useTheme as useNextTheme } from "next-themes";

export default function SiteNavbar() {
  const { setTheme, resolvedTheme } = useNextTheme();

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const router = useRouter()
  const [loggedIn, setLoggedIn] = useState(false);
  const menuItems = [
    {
      label: "Home",
      link: "/"
    },
    {
      label: "Dashboard",
      link: "/dashboard"
    },
    {
      label: "Verify",
      link: "/verify"
    },
    {
      label: "Contact",
      link: "/contact"
    },
    {
      label: "About",
      link: "/about"
    }
  ];
  const handleLogout = async () => {
    try {
      await auth.signOut();
      toast.success("Sing Out Successfully")
      router.push('/signin'); // Redirect to login page after successful sign-out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {
    // Check if user is already logged in
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true)
      }
    });

    // Cleanup function
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}
      classNames={{
        wrapper: "max-w-[1400px] mx-auto w-full px-3 md:px-6 lg:px-9"
      }}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/">
          {resolvedTheme === "dark" ? ( <Image
              loading="eager"
              priority
              src={faceguard}
              width={200}
              height={80}
              alt="Face Guard"
            />) : ("FaceGuard")}
           
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link
            className={`${pathname === '/' ?
              "text-primary" : ""
              }`}
            color="foreground" href="/">
            Home
          </Link>
        </NavbarItem>
        {loggedIn && <><NavbarItem>
          <Link
            className={`${pathname === '/dashboard' ?
              "text-primary" : ""
              }`}
            color="foreground" href="/dashboard">
            Dashboard
          </Link>
        </NavbarItem>
          <NavbarItem>
            <Link className={`${pathname === '/verify' ?
              "text-primary" : ""
              }`}
              color="foreground" href="/verify">
              Verify
            </Link>
          </NavbarItem></>}
        <NavbarItem>
          <Link
            className={`${pathname === '/about' ?
              "text-primary" : ""
              }`}
            color="foreground" href="/about">
            About
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            className={`${pathname === '/contact' ?
              "text-primary" : ""
              }`}
            color="foreground" href="/contact">
            Contact
          </Link>
        </NavbarItem>
      </NavbarContent><NavbarContent justify="end">
        <DarkModeSwitch />
        {
          loggedIn && (<Button onClick={handleLogout} color="danger">
            Sign Out
          </Button>)
        }
      </NavbarContent>
      <NavbarMenu className="bg-zinc-800/90 py-10">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="text-foreground w-full"
              href={item.link}
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
