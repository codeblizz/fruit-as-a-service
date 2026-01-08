"use client";

import Button from "../atoms/button";
import Headroom from "react-headroom";
import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Nav from "@/packages/ui/src/atoms/nav";
import { usePathname } from "next/navigation";
import lib from "@/packages/helpers/src/libs";
import { useSearchParams } from "next/navigation";
import NextLink from "@/packages/ui/src/atoms/link";
import NextImage from "@/packages/ui/src/atoms/image";
import { ThemeToggle } from "@/packages/providers/src/theme.provider";
import {
  X as XMarkIcon,
  User as UserIcon,
  Menu as Bars3Icon,
  ShoppingCart as ShoppingCartIcon,
} from "lucide-react";
import { cn } from "@/packages/helpers/src/utils";

function NavBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { name: "Home", href: "/", icon: null },
    { name: "Shop Fruits", href: "/dashboard/fruits/buyer", icon: ShoppingCartIcon },
    { name: "Sell Fruits", href: "/dashboard/fruits/seller", icon: null },
    { name: "About", href: "/about", icon: null },
    { name: "Contact", href: "/contact", icon: null },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <Headroom pin className="w-full fixed z-50 transition-all duration-300">
      <Nav className="relative bg-quaternary">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <NextLink href="/" className="flex items-center">
              <NextImage
                width={50}
                height={50}
                alt="faas-logo"
                priority={true}
                src="/images/faas-logo-512.png"
                // style={{ objectFit: "contain" }}
                className="size-28 mt-3 rounded-full"
              />
              {/* <div className="flex flex-col">
                <span className="text-xl font-bold text-gradient">Fruit as a Service</span>
                <span className="text-xs text-secondary-text hidden sm:block">Fresh • Fast • Reliable</span>
              </div> */}
            </NextLink>
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <NextLink
                  key={item.name}
                  href={item.href}
                  className={lib.cn([
                    "nav-link flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200",
                    isActive(item.href)
                      ? "active bg-gradient-to-r from-apple-green/10 to-kiwi/10 text-apple-green font-semibold"
                      : "text-foreground hover:text-apple-green hover:bg-apple-green/5",
                  ])}
                >
                  {item.icon && <item.icon className="w-5 h-5" />}
                  <span>{item.name}</span>
                </NextLink>
              ))}
            </div>
            {/* Dashboard Breadcrumb */}
            {pathname.includes("/dashboard/fruits") && (
              <div className="flex items-center space-x-2 bg-quaternary/30 px-4 py-2 rounded-full">
                <span className="text-sm text-secondary-text">Dashboard</span>
                <span className="text-secondary-text">/</span>
                <span className="text-sm font-medium text-foreground capitalize">
                  {pathname.replace(/\/|dashboard/g, " ").trim()}
                </span>
                {searchParams.get("selected") && (
                  <>
                    <span className="text-secondary-text">/</span>
                    <span className="text-sm font-medium text-apple-green">
                      {searchParams.get("selected")}
                    </span>
                  </>
                )}
              </div>
            )}
            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Cart Icon (if user is logged in) */}
              {session && (
                <NextLink
                  href="/cart"
                  className="relative p-2 text-foreground hover:text-apple-green transition-colors duration-200 hover:bg-apple-green/5 rounded-lg"
                >
                  <ShoppingCartIcon className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 bg-strawberry text-primary-text text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                    0
                  </span>
                </NextLink>
              )}
              {/* Auth Section */}
              <div className="hidden lg:flex">
                {session ? (
                  <div className="flex items-center space-x-3">
                    <NextLink
                      href="/dashboard"
                      className="flex items-center space-x-2 bg-gradient-to-r from-apple-green to-kiwi text-primary-text px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105"
                    >
                      <UserIcon className="w-5 h-5" />
                      <span className="hidden sm:block font-medium">
                        Dashboard
                      </span>
                    </NextLink>
                    <Button className="" onClick={() => signOut()}>
                      <NextLink
                        href="/"
                        className="text-foreground hover:text-apple-green font-medium transition-colors duration-200"
                      >
                        Sign Out
                      </NextLink>
                    </Button>
                  </div>
                ) : (
                  <div className="hidden md:flex items-center space-x-3">
                    <NextLink
                      href="/"
                      className={cn(pathname === "/" ? "hidden" : "", "text-foreground hover:text-apple-green font-medium transition-colors duration-200")}
                    >
                      Sign In
                    </NextLink>
                    <NextLink
                      href="/auth/signup"
                      className={cn(pathname === "/auth/signup" ? "hidden" : "", "bg-gradient-to-tr from-apple-green via-primary to-kiwi text-primary-text px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105 font-medium")}
                    >
                      Sign Up
                    </NextLink>
                  </div>
                )}
              </div>
              {/* Theme Toggle */}
              <ThemeToggle className="p-2 rounded-lg hover:bg-quaternary/30 transition-colors duration-200" />
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden cursor-pointer p-2 text-foreground hover:text-apple-green transition-colors duration-200 hover:bg-apple-green/5 rounded-lg"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <Bars3Icon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden absolute top-14 right-0 w-64 z-50 bg-quaternary mt-4 pb-4 border-t border-quaternary animate-[slideDown_0.3s_ease-out]">
              <div className="flex flex-col space-y-2 pt-4">
                {navigationItems.map((item) => (
                  <NextLink
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={lib.cn([
                      "flex items-center space-x-2 border-b border-kiwi/50 px-4 py-1 rounded-lg transition-all duration-200",
                      isActive(item.href)
                        ? "bg-gradient-to-r from-apple-green/10 to-kiwi/10 text-apple-green font-semibold"
                        : "text-foreground hover:text-apple-green hover:bg-apple-green/5",
                    ])}
                  >
                    {item.icon && <item.icon className="w-5 h-5" />}
                    <span>{item.name}</span>
                  </NextLink>
                ))}
                {/* Mobile Auth Section */}
                {session ? (
                  <div className="px-4 w-full">
                    <Button className="w-full bg-gradient-to-br from-cherry via-orange to-lychee" onClick={() => signOut()}>
                      <NextLink
                        href="/auth/signin"
                        className="block text-foreground hover:text-quaternary font-medium transition-colors duration-200"
                      >
                        Sign Out
                      </NextLink>
                    </Button>
                  </div>
                ) : (
                  <div className="px-4">
                    <NextLink
                      href="/"
                      onClick={() => setIsMenuOpen(false)}
                      className={cn(pathname === "/" ? "hidden" : "", "block w-full text-center rounded-lg py-3 text-foreground hover:text-apple-green font-medium transition-colors duration-200")}
                    >
                      Sign In
                    </NextLink>
                    <NextLink
                      href="/auth/signup"
                      onClick={() => setIsMenuOpen(false)}
                      className={cn(pathname === "/auth/signup" ? "hidden" : "","block w-full text-center bg-gradient-to-tr from-apple-green via-primary to-kiwi text-primary-text py-3 rounded-lg hover:shadow-lg transition-all duration-200 font-medium")}
                    >
                      Sign Up
                    </NextLink>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </Nav>
    </Headroom>
  );
}

export default NavBar;
