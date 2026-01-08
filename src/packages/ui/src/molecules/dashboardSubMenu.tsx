"use client";

import React from "react";
import lib from "@/packages/helpers/src/libs";
import List from "@/packages/ui/src/atoms/list";
import CONSTANT from "@/packages/helpers/src/constants";

function DashBoardSubMenuAccordion({
  menu,
  isActive,
  selected,
  menuName,
}: {
  menu: string;
  isActive: boolean;
  selected: string | null;
  menuName: string | null;
}) {
  return Object.values(CONSTANT.fruitMenu.categories).map((values, idx) => {
    return values.name === menu ? (
      <List
        key={idx}
        isLink={true}
        list={values.kinds}
        selected={selected}
        path={`/dashboard/fruits/${menuName?.toLowerCase() ?? ""}`}
        className={lib.cn([
          "w-full overflow-y-auto transition-all duration-700 ease-in-out px-1",
          (menuName === null &&
            isActive &&
            selected &&
            values.kinds.includes(selected)) ||
          menuName === menu
            ? "flex flex-col -gap-y-2"
            : "hidden",
        ])}
        liClass={lib.cn([
          "text-[12px] focus:text-[14px] focus:h-6 pl-5 cursor-pointer w-full rounded-md h-5 inline-flex items-center justify-start hover:text-apple-green/70 hover:bg-apple-green/5 transition-all",
        ])}
      />
    ) : null;
  });
}

export default DashBoardSubMenuAccordion;
