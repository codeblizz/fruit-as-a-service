import React from "react";
import Section from "../../atoms/section";
import NextLink from "../../atoms/link";
import { usePathname, useSearchParams } from "next/navigation";

function FruitBreadCrumb() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const selectSearchParam = searchParams.get("selected");
  const fruitCategory = pathname.replace(/\/|dashboard|fruits/g, " ").trim();
  return (
    <Section className="flex w-full flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="flex flex-1 bg-blackcurrant items-center space-x-2 px-4">
        <NextLink
          href="/dashboard"
          className="text-sm text-plum hover:underline capitalize"
        >
          Dashboard
        </NextLink>
        <span className="text-secondary-text">/</span>
        <NextLink
          href={pathname}
          className="text-sm capitalize hover:underline text-cantaloupe"
        >
          Fruits
        </NextLink>
        <span className="text-secondary-text">/</span>
        <NextLink
          href={`/dashboard/fruits/${selectSearchParam}`}
          className="text-sm font-medium text-lemon capitalize hover:underline"
        >
          {fruitCategory}
        </NextLink>
        {selectSearchParam && (
          <>
            <span className="text-secondary-text">/</span>
            <span className={`text-sm font-medium text-kiwi capitalize`}>
              {selectSearchParam}
            </span>
          </>
        )}
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <NextLink
          href="/dashboard/fruits/category/create"
          className="bg-gradient-to-tr from-apple-green via-primary to-kiwi text-ghost-apple px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
        >
          + Create Fruits Category
        </NextLink>
        <NextLink
          href="/dashboard/fruits/add"
          className="bg-gradient-to-tr from-apple-green via-primary to-kiwi text-ghost-apple px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
        >
          + Add Fruits
        </NextLink>
      </div>
    </Section>
  );
}

export default FruitBreadCrumb;
