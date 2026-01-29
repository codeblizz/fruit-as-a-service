"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/packages/helpers/src/utils";
import CONSTANT from "@/packages/helpers/src/constants";
import { Button } from "@/packages/ui/src/atoms/button";
import { EmailType } from "@/packages/types/src/auth.type";
import { Card } from "@/packages/ui/src/molecules/card";

export default function EmailSentPage({
  type = "VERIFICATION",
}: {
  type: EmailType;
}) {
  const router = useRouter();

  const config =
    CONSTANT.EMAIL_SENT_CONFIG[type] || CONSTANT.EMAIL_SENT_CONFIG.VERIFICATION;
  const IconComponent = config.icon;

  const handleCtaClick = () => {
    if (type === "VERIFICATION") {
      router.push("/auth/verify");
    } else {
      router.push(config.ctaLink);
    }
  };

  return (
    <div className="min-h-screen pt-14 w-full flex flex-col justify-center items-center">
      <div className="size-full bg-surface-primary backdrop-blur-sm justify-center max-w-md rounded-2xl">
        <Card
          className={cn(
            "bg-surface-primary p-8 size-full space-y-8 shadow-2xl border-0 rounded-2xl"
          )}
        >
          <div className="flex flex-col items-center space-y-6 mb-8 text-center">
            <div className="p-4 bg-apple-green rounded-full">
              <IconComponent className="w-10 h-10 text-white" />
            </div>

            <h1 className="text-3xl font-extrabold text-white tracking-tight">
              {config.title}
            </h1>

            <p className="text-base !text-white">{config.description}</p>

            <div className="w-full bg-yellow-50 border border-yellow-200 p-4 rounded-xl text-left space-y-2 text-sm text-yellow-800 font-medium">
              <p className="font-bold">What's Next:</p>
              <ul className="list-disc list-inside space-y-1">
                {config.nextSteps.map((step: string, index: number) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
            </div>
          </div>

          <Button
            onClick={handleCtaClick}
            className="w-full flex justify-center py-[1.4rem] px-4 border border-quaternary rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-tr from-apple-green via-primary to-kiwi text-sm font-medium text-ghost-apple hover:bg-quaternary/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 ease-in-out"
          >
            <span className="mr-2">{config.ctaText}</span>
            <ArrowRight className="w-5 h-5" />
          </Button>

          <div className="mt-6 text-center">
            <Button
              type="button"
              className="w-full flex justify-center py-[1.4rem] px-4 border border-quaternary rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-tr from-apple-green via-primary to-kiwi text-sm font-medium text-ghost-apple hover:bg-quaternary/20 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 ease-in-out"
              onClick={config.secondaryLinkAction}
            >
              {config.secondaryLinkText}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
