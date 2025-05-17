"use client";

import lib from "@/packages/helpers/src/libs";
import React, { LiHTMLAttributes } from "react";
import Link from "@/packages/ui/src/atoms/link";
import utils from "@/packages/helpers/src/utils";

function List({
  list,
  path,
  isLink,
  liClass,
  selected,
  className,
}: {
  path: string;
  isLink: boolean;
  liClass: string;
  className?: string;
  list: Array<string>;
  selected?: string | null;
} & LiHTMLAttributes<HTMLUListElement>) {
  return (
    <ul className={className}>
      {list.map((li: string, index: number) => {
        const active = selected === li;
        const selectedSubMenuClass = active ? "bg-mango text-tertiary-text text-extrabold" : "";
        return isLink ? (
          <Link key={index} href={`${path + utils.formatQuery({ selected: li, active: true })}`}>
            <li className={lib.cn([liClass, selectedSubMenuClass])}>{li}</li>
          </Link>
        ) : (
          <li className={lib.cn([liClass, selectedSubMenuClass])} key={index}>
            {li}
          </li>
        )
      })}
    </ul>
  );
}

export default List;
