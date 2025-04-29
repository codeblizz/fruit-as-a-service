"use client";

import lib from "@/packages/helpers/src/libs";
import Span from "@/packages/ui/src/atoms/span";
import { useCreateStore } from "@/packages/store/src/index";
import SunIcon from "@/packages/ui/src/atoms/icons/sunIcon";
import MoonIcon from "@/packages/ui/src/atoms/icons/moonIcon";
import { TBaseElement } from "@/packages/types/src/ui/base.type";
import { useTheme, ThemeProvider as NextThemeProvider } from "next-themes";

function ThemeProvider({ children }: Pick<TBaseElement, "children">) {
  return (
    <NextThemeProvider
      attribute="class"
      enableSystem={true}
      defaultTheme="light"
    >
      {" "}
      {children}
    </NextThemeProvider>
  );
}

function ThemeToggle(className: { className: string }) {
  const { theme, setTheme } = useTheme();
  const { setDarkTheme } = useCreateStore((state) => state);

  return (
    <Span
      name="theme-toggle"
      className={lib.cn(["cursor-pointer", className])}
      onClick={() => {
        setTheme((theme) => theme === "dark" ? "light" : "dark");
        // setDarkTheme(theme === "dark");
      }}
    >
      {theme === "dark" 
        ? <SunIcon className="cursor-pointer size-5 rounded-full" />
        : <MoonIcon className="cursor-pointer size-5 rounded-full" /> 
      }
    </Span>
  );
}

export { ThemeProvider, ThemeToggle };
