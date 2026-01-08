"use client";

import { signOut } from "next-auth/react";
import lib from "@/packages/helpers/src/libs";
import Span from "@/packages/ui/src/atoms/span";
import { useSearchParams } from "next/navigation";
import Section from "@/packages/ui/src/atoms/section";
import { useCreateStore } from "@/packages/store/src";
import React, { useState, useTransition } from "react";
import { Button } from "@/packages/ui/src/atoms/button";
import Paragraph from "@/packages/ui/src/atoms/paragraph";
import { Card } from "@/packages/ui/src/molecules/card";
import { TLeftSideDashboard } from "@/packages/types/src/fruits.type";
import DashBoardSubMenuAccordion from "@/packages/ui/src/molecules/dashboardSubMenu";
import { LogOutIcon } from "lucide-react";

function LeftSideSubFruitDashboard({
  className,
  dashboardMenu,
}: TLeftSideDashboard) {
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const selected = searchParams.get("selected");
  const isActive = searchParams.get("active") === "true";
  const { updateToast } = useCreateStore((state) => state);
  const [menuName, setMenuName] = useState<null | string>(null);

  const onSetMenuName = (menu: string) => {
    setMenuName(menuName === menu ? null : menu);
  };

  const onSignOut = () => {
    startTransition(async () => {
      await signOut({ callbackUrl: "/auth/signin" });
      updateToast(true, "User Signed Out", "text-success");
    });
  };

  return (
    <Section
      className={lib.cn([
        "flex flex-col border-2 h-full border-r-1 mt-16 border-plum justify-start items-start",
        className,
      ])}
    >
      <Card
        className={lib.cn([
          "flex flex-col justify-between items-center p-3 pt-5 size-full",
        ])}
      >
        <Section className="flex flex-col gap-y-4 h-full w-full">
          {dashboardMenu.map((menu, idx) => (
            <Span
              name=""
              key={idx}
              className="flex flex-col items-center justify-center w-full text-quaternary"
            >
              <Paragraph
                id={String(idx)}
                onClick={() => onSetMenuName(menu)}
                className={lib.cn([
                  "text-md text-center cursor-pointer w-full bg-primary rounded-xl h-8 px-3 inline-flex flex-col items-center justify-center",
                ])}
              >
                {menu}
              </Paragraph>
              <DashBoardSubMenuAccordion
                menu={menu}
                selected={selected}
                isActive={isActive}
                menuName={menuName}
              />
            </Span>
          ))}
        </Section>
        <Button
          onClick={onSignOut}
          loading={isPending}
          leftIcon={<LogOutIcon />}
          className="bg-primary inline-flex items-center justify-center w-full h-8 px-3 text-quaternary rounded-xl"
        >
          <Paragraph className="text-center text-md">Sign Out</Paragraph>
        </Button>
      </Card>
    </Section>
  );
}

export default LeftSideSubFruitDashboard;
