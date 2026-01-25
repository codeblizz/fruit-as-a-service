import React from "react";
import { cn } from "@/packages/helpers/src/utils";
import { Button } from "@/packages/ui/src/atoms/button";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function FruitHeader({
  className = "",
  subClassName = "",
  title,
  subTitle,
  message,
}: {
  className?: string;
  subTitle?: string;
  title?: string;
  message?: string;
  subClassName?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectSearchParam =
    searchParams.get("selected") ||
    pathname.replace(/\/|dashboard|fruits/g, " ").trim();

  return (
    <header
      className={cn(
        "bg-stone-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl mb-12",
        className
      )}
    >
      <div
        className={cn(
          "relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8",
          subClassName
        )}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="bg-emerald-500 w-12 h-1 px-1 rounded-full" />
            <span className="text-xs font-black uppercase tracking-[0.3em] text-emerald-400">
              {title}
            </span>
          </div>
          <h1 className="text-4xl capitalize md:text-6xl font-serif font-medium leading-tight">
            {selectSearchParam || "Fruit"}{" "}
            <span className="italic text-emerald-400 font-normal">
              {subTitle}
            </span>
          </h1>
          <p className="text-stone-400 max-w-lg text-sm md:text-base font-light">
            {message}
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Button
            variant="primary"
            className="text-ghost-apple text-xs font-bold flex items-center gap-2 hover:text-white transition-colors group"
            onClick={() => router.push("/dashboard/fruits")}
          >
            View all inventories{" "}
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Button>
        </div>
      </div>
      <ShoppingBag className="absolute -right-20 -bottom-20 w-80 h-80 text-white/5 rotate-12 pointer-events-none" />
    </header>
  );
}

export default FruitHeader;
