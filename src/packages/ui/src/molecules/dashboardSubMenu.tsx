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
        list={values.type}
        selected={selected}
        path={`/dashboard/fruits/${menuName?.toLowerCase() ?? ""}`}
        className={lib.cn([
          "w-[80%] overflow-y-auto transition-all duration-700 ease-in-out px-1 border-2 border-plum",
          menuName === null && isActive && selected && values.type.includes(selected) || menuName === menu
            ? "flex flex-col -gap-y-2"
            : "hidden",
        ])}
        liClass={lib.cn([
          "text-[12px] focus:text-[14px] focus:h-6 text-center cursor-pointer bg-mulberry w-full rounded-md h-5 px-3 inline-flex items-center justify-center",
        ])}
      />
    ) : null;
  });
}

export default DashBoardSubMenuAccordion;
