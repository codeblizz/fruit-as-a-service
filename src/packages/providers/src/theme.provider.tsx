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
  let isDark = theme === "dark";

  return (
    <Span
      role="toggle"
      name="theme-toggle"
      aria-label={theme}
      className={lib.cn(["cursor-pointer", className])}
      aria-controls={isDark ? "light-icon" : "dark-icon"}
      onClick={() => {
        setTheme(isDark ? "light" : "dark");
        // setDarkTheme(isDark);
      }}
    >
      {isDark ? (
        <SunIcon className="cursor-pointer size-5 rounded-full" />
      ) : (
        <MoonIcon className="cursor-pointer size-5 rounded-full" />
      )}
    </Span>
  );
}

export { ThemeProvider, ThemeToggle };
