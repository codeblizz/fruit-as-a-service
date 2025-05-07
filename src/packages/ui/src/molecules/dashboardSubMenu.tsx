"use client";

import React from "react";
import lib from "@/packages/helpers/src/libs";
import List from "@/packages/ui/src/atoms/list";
import CONSTANT from "@/packages/helpers/src/constants";

function DashBoardSubMenuAccordion({
  menu,
  menuName,
}: {
  menu: string;
  menuName: string | null;
}) {
  return Object.values(CONSTANT.fruitMenu.categories).map((values, idx) => {
    return values.name === menu ? (
      <List
        key={idx}
        isLink={true}
        path="/fruits/"
        list={values.type}
        className={lib.cn([
          "w-[80%] overflow-y-auto transition-all duration-700 ease-in-out",
          menuName === menu ? "flex flex-col -gap-y-2" : "hidden",
        ])}
        liClass={lib.cn([
          "text-[9px] focus:text-[10px] focus:bg-primary-blue focus:h-6 text-center cursor-pointer bg-primary-black w-full rounded-md h-5 px-3 inline-flex items-center justify-center"
        ])}
      />
    ) : null
  });
}

export default DashBoardSubMenuAccordion;
