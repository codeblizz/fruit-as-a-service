"use client";

import React from "react";
import { Fade } from "react-awesome-reveal";
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
        <Fade duration={1000} direction="left">
          <Card
            name=""
            className="flex flex-col justify-start text-primary-text items-center text-center gap-y-10 w-full pb-10 max-w-xl rounded-t-xl"
          >
            <Paragraph className="text-2xl md:text-3xl font-bold bg-primary rounded-t-xl w-full p-4">
              {"Welcome to Fruit-as-a-Service"}
            </Paragraph>
            <Section className="flex justify-center items-center gap-8">
              {[
                { href: "/fruits/buyer", text: "I Want To Buy" },
                { href: "/fruits/seller", text: "I Want To Sell" },
              ].map((value, index) => (
                <NextLink
                  key={index}
                  href={value.href}
                  isPending={false}
                  className="w-40 inline-flex justify-center items-center h-12 bg-tertiary px-4 rounded-lg text-nowrap text-overflow text-ellipsis"
                >
                  {value.text}
                </NextLink>
              ))}
            </Section>
          </Card>
        </Fade>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <AuthForm className="w-full max-w-md p-8 shadow-lg" />
    </main>
  );
}
