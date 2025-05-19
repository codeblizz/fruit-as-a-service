"use client";

import React from "react";
import { useSession } from "next-auth/react";
import NextLink from "@/packages/ui/src/atoms/link";
import Card from "@/packages/ui/src/molecules/card";
import Section from "@/packages/ui/src/atoms/section";
import Paragraph from "@/packages/ui/src/atoms/paragraph";
import AuthForm from "@/packages/ui/src/molecules/authForm";

export default function Home() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <main className="flex min-h-screen w-full bg-[url('/images/fruit-platter-002.webp')] bg-no-repeat bg-cover bg-center bg-fixed flex-col items-center justify-center">
        <Card
          name=""
          className="flex flex-col justify-start text-primary-text items-center text-center gap-y-10 w-full pb-10 max-w-xl rounded-t-xl"
        >
          <Paragraph
            text="Welcome to Fruit-as-a-Service"
            className="text-2xl md:text-3xl font-bold bg-primary rounded-t-xl w-full p-4"
          />
          <Section className="flex justify-center items-center gap-8">
            {[
              { href: "/fruits/order", text: "Order Fruits" },
              { href: "/fruits/subscription", text: "Start Subscription" },
            ].map((value, index) => (
              <NextLink
                key={index}
                href={value.href}
                className="w-40 inline-flex justify-center items-center h-12 bg-tertiary px-4 rounded-lg text-nowrap text-overflow text-ellipsis"
              >
                {value.text}
              </NextLink>
            ))}
          </Section>
        </Card>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <AuthForm className="w-full max-w-md p-8 shadow-lg" />
    </main>
  );
}
