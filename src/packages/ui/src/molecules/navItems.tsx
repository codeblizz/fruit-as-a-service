"use client";

import { ReactNode } from "react";
import Section from "../atoms/section";
import { cn } from "@/packages/helpers/src/utils";
import { Button } from "../atoms/button";
import { ChevronRight, LucideIcon } from "lucide-react";
import Span from "../atoms/span";

interface NavItemType {
  id: string;
  label: string;
  icon: LucideIcon;
  hasSubItems: boolean;
}

const NavItem: React.FC<{
  item: NavItemType;
  isActive: boolean;
  isCollapsed: boolean;
  onClick: () => void;
  className?: string;
  children?: ReactNode;
}> = ({ item, isActive, isCollapsed, onClick, children, className }) => {
  const Icon = item.icon;

  return (
    <Section className={cn("w-full space-y-1", className)}>
      <Button
        onClick={onClick}
        className={cn(
          "w-full flex mx-auto justify-start bg-ghost-apple cursor-pointer items-center p-2.5 rounded-xl transition-all group relative border-none",
          isActive
            ? "text-ghost-apple bg-gradient-to-tr from-apple-green via-primary to-kiwi shadow-sm shadow-slate-50"
            : "text-slate-500 hover:text-apple-green/70 hover:bg-apple-green/5",
          isCollapsed ? "justify-center px-0" : "gap-3"
        )}
      >
        <Icon
          size={20}
          className={cn(isActive ? "stroke-[2.5px]" : "stroke-[2px]")}
        />
        {!isCollapsed && (
          <Span name="" className="text-sm font-semibold whitespace-nowrap">
            {item.label}
          </Span>
        )}
        {isActive && isCollapsed && (
          <div className="absolute left-0 w-1 h-6 bg-indigo-600 rounded-r-full" />
        )}
        {item.hasSubItems && (
          <Span name="" className="w-full flex-1 flex justify-end items-center">
            <Span
              name=""
              className={cn(
                "transition-transform duration-200",
                isActive ? "rotate-90" : ""
              )}
            >
              <ChevronRight size={12} />
            </Span>
          </Span>
        )}
      </Button>
      {children}
    </Section>
  );
};

export default NavItem;
