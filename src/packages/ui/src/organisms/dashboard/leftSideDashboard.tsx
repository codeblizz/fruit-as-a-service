"use client";

import React, { useState } from "react";
import { signOut } from "next-auth/react";
import lib from "@/packages/helpers/src/libs";
import Link from "@/packages/ui/src/atoms/link";
import Span from "@/packages/ui/src/atoms/span";
import { useSearchParams } from "next/navigation";
import Card from "@/packages/ui/src/molecules/card";
import Section from "@/packages/ui/src/atoms/section";
import Paragraph from "@/packages/ui/src/atoms/paragraph";
import DashBoardSubMenuAccordion from "@/packages/ui/src/molecules/dashboardSubMenu";

type TLeftSideDashboard = {
  className: string;
  dashboardMenu: Array<string>;
};

function LeftSideDashboard({ className, dashboardMenu }: TLeftSideDashboard) {
  const searchParams = useSearchParams();
  const selected = searchParams.get("selected");
  const isActive = searchParams.get("active") === "true";
  const [menuName, setMenuName] = useState<null | string>(null);

  const onSetMenuName = (menu: string) => {
    setMenuName(menuName === menu ? null : menu);
  };

  const onSignOut = async () => await signOut();

  return (
    <Section
      className={lib.cn([
        "flex flex-col border-2 h-full border-r-1 mt-16 border-plum justify-start items-start",
        className,
      ])}
    >
      <Card
        name="left-side-bar"
        className={lib.cn([
          "flex flex-col justify-between items-center p-3 pt-5 size-full",
        ])}
      >
        <Section className="flex flex-col gap-y-4 h-full w-full">
          {dashboardMenu.map((menu, idx) => (
            <Span
              name=""
              key={idx}
              className="flex flex-col items-center justify-center w-full text-white"
            >
              <Paragraph
                text={menu}
                id={String(idx)}
                onClick={() => onSetMenuName(menu)}
                className={lib.cn([
                  "text-md text-center cursor-pointer bg-primary w-full rounded-xl h-8 px-3 inline-flex flex-col items-center justify-center",
                ])}
              />
              <DashBoardSubMenuAccordion
                menu={menu}
                selected={selected}
                isActive={isActive}
                menuName={menuName}
              />
            </Span>
          ))}
        </Section>
        <Link
          href="/"
          onClick={onSignOut}
          className="bg-primary inline-flex items-center justify-center w-full h-8 px-3 text-white rounded-xl"
        >
          <Paragraph text="Sign Out" className="text-center text-md" />
        </Link>
      </Card>
    </Section>
  );
}

export default LeftSideDashboard;
