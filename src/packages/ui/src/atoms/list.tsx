import { useParams } from "next/navigation";
import lib from "@/packages/helpers/src/libs";
import Link from "@/packages/ui/src/atoms/link";
import React, { LiHTMLAttributes } from "react";

function List({
  list,
  path,
  isLink,
  liClass,
  className,
}: {
  path: string;
  isLink: boolean;
  liClass: string;
  className?: string;
  list: Array<string>;
} & LiHTMLAttributes<HTMLUListElement>) {

  const params = useParams();
  const paramsId = Array.isArray(params.id) && params.id[0];
  
  return (
    <ul className={className}>
      {list.map((li: string, index: number) => {
        const selectedSubMenuClass = paramsId === li ? "bg-mango text-tertiary-text text-extrabold" : "";
        return isLink ? (
          <Link key={index} href={`${path + li}`}>
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
