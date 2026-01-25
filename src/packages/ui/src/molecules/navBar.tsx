"use client";

import Headroom from "react-headroom";
import useAuth from "./hooks/useAuth";
import React, { useState } from "react";
import { Button } from "../atoms/button";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Nav from "@/packages/ui/src/atoms/nav";
import { usePathname } from "next/navigation";
import lib from "@/packages/helpers/src/libs";
import useDashboard from "./hooks/useDashboard";
import { cn } from "@/packages/helpers/src/utils";
import { useSearchParams } from "next/navigation";
import AppLogoComponent from "./appLogoComponent";
import NextLink from "@/packages/ui/src/atoms/link";
import CONSTANT from "@/packages/helpers/src/constants";
import { ThemeToggle } from "@/packages/providers/src/theme.provider";
import DefaultProfileImage from "@/packages/assets/images/defaultProfileImage.svg";
import { useClickOutside } from "@/packages/ui/src/molecules/hooks/useClickOutside";
import {
  Bell,
  Search,
  MoreVertical,
  X as XMarkIcon,
  User as UserIcon,
  Menu as Bars3Icon,
  ShoppingCart as ShoppingCartIcon,
  LogOutIcon,
  User,
} from "lucide-react";
import NextImage from "../atoms/image";

function NavBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const {
    isLoading,
    isDashboard,
    isSigninPage,
    isSignupPage,
    isAuthenticated,
  } = useAuth();
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { setMobileOpen, isMobileOpen, isSidebarCollapsed } = useDashboard();

  const isActive = (href: string) => {
    if (href === "/") return pathname === href;
    return pathname.startsWith(href);
  };
  
  const hasFruitWritePrivilege = (name: string) => {
    const hideAddFruit =
    !session?.user.permissions.includes("WRITE_FRUITS") &&
    name === "Add Fruits"
    ? "hidden"
    : "";
    return hideAddFruit === "hidden";
  };
  
  const isDashboardAccessRestricted = (name: string): boolean => {
    const hideUnauthorizedDashboardView =
    !isDashboard && !isAuthenticated && name === "Dashboard" ? "hidden" : "";
    return hideUnauthorizedDashboardView === "hidden";
  };

  const showHiddenWhenUnauthenticated = (name: string): boolean => {
    const hideWhenUnauthenticated =
    !isAuthenticated && (name === "Cart" || name === "Sell Fruits")
      ? "hidden"
      : "";
    return hideWhenUnauthenticated === "hidden";
  }
  
  const dropdownRef = useClickOutside<HTMLDivElement>(() => setIsMenuOpen(false));

  return (
    <Headroom pin className="w-full fixed z-50 transition-all duration-300">
      <Nav className="relative h-[5rem]">
        <div className="h-full bg-gradient-to-br from-peach via-quaternary to-peach/70">
          {isDashboard ? (
            <div className="w-full h-full flex items-center justify-end">
              <div className="w-full lg:w-[75%] p-4 h-full flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button
                    onClick={() => setMobileOpen(true)}
                    className="lg:hidden p-2 bg-peach/5 text-slate-600 hover:text-apple-green/70 hover:bg-apple-green/5 rounded-lg"
                  >
                    <Bars3Icon size={22} />
                  </Button>
                  <div className="relative hidden sm:block">
                    <Search
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                      size={16}
                    />
                    <input
                      type="text"
                      placeholder="Search resources..."
                      className="bg-slate-50 border-transparent focus:bg-ghost-apple focus:border-indigo-100 rounded-xl py-2 pl-10 pr-4 w-64 lg:w-96 text-sm transition-all outline-none"
                    />
                  </div>
                </div>
                <div className="block sm:hidden">
                  <AppLogoComponent
                    isMobileView={true}
                    imageClassName="size-[7rem]"
                    containerClassName=""
                  />
                </div>
                <div className="flex items-center gap-2 lg:gap-4">
                  <Button className="relative bg-ghost-apple p-2 text-slate-500 hover:text-apple-green/70 hover:bg-apple-green/5 rounded-xl transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-apple-red rounded-full ring-2 ring-white" />
                  </Button>
                  <div className="w-[1px] h-6 bg-slate-200 ml-1 -mr-1.5 hidden sm:block" />
                  <div
                    className={`flex items-center gap-1 p-2 rounded-xl mb-2 ${
                      isSidebarCollapsed ? "justify-center" : ""
                    }`}
                  >
                    <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm flex-shrink-0">
                      <NextImage className="rounded-full size-full cursor-pointer" src={session?.user.image ?? DefaultProfileImage} alt="profile_user" width={60} height={60} />  
                    </div>

                    {!isSidebarCollapsed && (
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate">
                          {session?.user.firstName}
                        </p>
                        <p className="text-xs text-slate-400 truncate">
                          {session?.user.roles[0]}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between h-full px-4">
              <AppLogoComponent imageClassName="" containerClassName="" />
              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-2">
                {CONSTANT.navigationItems.map((item) => {
                  if (hasFruitWritePrivilege(item.name)) return null;
                  if (isDashboardAccessRestricted(item.name)) return null;
                  if (showHiddenWhenUnauthenticated(item.name)) return null;
                  return (
                    <NextLink
                      key={item.name}
                      href={item.href}
                      className={lib.cn([
                        "nav-link flex items-center text-black/70 font-bold px-3 py-1 rounded-lg transition-all duration-200",
                        isActive(item.href)
                          ? "active text-apple-green"
                          : "hover:text-apple-green/70 hover:bg-apple-green/5",
                      ])}
                    >
                      {item.icon && <item.icon className="w-5 h-5 mr-1" />}
                      <span>{item.name}</span>
                    </NextLink>
                  );
                })}
              </div>
              <div className="flex items-center space-x-4 ">
                {isAuthenticated && (
                  <NextLink
                    href="/dashboard/fruits/cart"
                    className="relative p-2 text-blackcurrant hover:text-apple-green transition-colors duration-200 hover:bg-apple-green/5 rounded-lg"
                  >
                    <ShoppingCartIcon className="w-6 h-6" />
                    <span className="absolute -top-1 -right-1 bg-strawberry text-ghost-apple text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                      0
                    </span>
                  </NextLink>
                )}
                {/* Auth Section */}
                <div className="hidden lg:flex gap-2">
                  {isAuthenticated && (
                    <Button
                      leftIcon={<LogOutIcon />}
                      className="text-ghost-apple rounded-lg bg-gradient-to-br h-8 from-orange via-cherry to-lychee hover:text-apple-green py-0 font-medium transition-colors duration-200"
                      onClick={() => signOut({ callbackUrl: "/auth/signin" })}
                    >
                      Sign Out
                    </Button>
                  )}
                  {!isAuthenticated && (
                    <div className="hidden md:flex items-center space-x-3">
                      {isSignupPage && (
                        <NextLink
                          href="/auth/signin"
                          className={cn(
                            pathname === "/auth/signin" ? "hidden" : "",
                            "bg-gradient-to-tr from-apple-green via-primary to-kiwi text-ghost-apple px-4 py-1 rounded-lg hover:shadow-lg hover:scale-105 font-medium transition-colors duration-200"
                          )}
                        >
                          Sign In
                        </NextLink>
                      )}
                      {isSigninPage && (
                        <NextLink
                          href="/auth/signup"
                          className={cn(
                            pathname === "/auth/signup" ? "hidden" : "",
                            "bg-gradient-to-tr from-apple-green via-primary to-kiwi text-ghost-apple px-4 py-1 rounded-lg hover:shadow-lg transition-all duration-200 hover:scale-105 font-medium"
                          )}
                        >
                          Sign Up
                        </NextLink>
                      )}
                    </div>
                  )}
                </div>
                {/* Theme Toggle */}
                <ThemeToggle className="p-2 rounded-lg hover:bg-quaternary/30 transition-colors duration-200" />
                {/* Mobile Menu Button */}
                <Button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="lg:hidden cursor-pointer bg-peach/5 p-2 text-blackcurrant hover:text-apple-green transition-colors duration-200 hover:bg-apple-green/5 rounded-lg"
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? (
                    <XMarkIcon className="w-6 h-6" />
                  ) : (
                    <Bars3Icon className="w-6 h-6" />
                  )}
                </Button>
              </div>
            </div>
          )}
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div ref={dropdownRef} className="lg:hidden absolute top-[4rem] right-0 w-64 z-50 bg-quaternary mt-4 pb-4 border-t border-quaternary animate-[slideDown_0.3s_ease-out]">
              <div className="flex flex-col space-y-2 pt-4">
                {CONSTANT.navigationItems.map((item) => {
                  if (hasFruitWritePrivilege(item.name)) return null;
                  if (isDashboardAccessRestricted(item.name)) return null;
                  if (showHiddenWhenUnauthenticated(item.name)) return null;
                  return (
                    <NextLink
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={lib.cn([
                        "flex items-center space-x-2 border-b border-kiwi/50 px-4 py-1 rounded-lg transition-all duration-200",
                        isActive(item.href)
                          ? "bg-gradient-to-r from-apple-green/10 to-kiwi/10 text-apple-green font-semibold"
                          : "text-blackcurrant hover:text-apple-green hover:bg-apple-green/5",
                      ])}
                    >
                      {item.icon && <item.icon className="w-5 h-5" />}
                      <span>{item.name}</span>
                    </NextLink>
                  );
                })}
                {/* Mobile Auth Section */}
                {isAuthenticated ? (
                  <div className="px-4 w-full">
                    <Button
                      leftIcon={<LogOutIcon />}
                      className={cn(
                        "w-full h-8 rounded-xl text-center text-ghost-apple font-medium transition-colors duration-200",
                        isDashboard
                          ? "bg-primary"
                          : "bg-gradient-to-br from-orange via-cherry to-lychee"
                      )}
                      onClick={async () =>
                        await signOut({ callbackUrl: "/auth/signin" })
                      }
                    >
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="px-4">
                    <NextLink
                      href={
                        isSigninPage
                          ? "/auth/signup"
                          : "/auth/signin"
                      }
                      onClick={() => setIsMenuOpen(false)}
                      className={cn(
                        "hidden",
                        "block w-full text-center bg-gradient-to-tr from-apple-green via-primary to-kiwi hover:shadow-lg transition-all rounded-lg py-1 !text-ghost-apple hover:text-apple-green font-medium duration-200"
                      )}
                    >
                      {isSigninPage ? "Sign Up" : "Sign In"}
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
