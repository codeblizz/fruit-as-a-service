"use client";

import React from "react";
import { useSession } from "next-auth/react";
import Card from "@/packages/ui/src/molecules/card";
import Button from "@/packages/ui/src/atoms/button";
import { useCreateStore } from "@/packages/store/src";
import AuthForm from "@/packages/ui/src/molecules/authForm";

export default function Home() {
  const { data: session } = useSession();
  const { loader } = useCreateStore((state) => state);

  // if (session) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Card name="" className="w-[60%] max-w-xl p-8">
          <h1 className="text-3xl font-bold mb-8">
            Welcome to Fruit-as-a-Service
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section>
              <h2 className="text-xl font-semibold mb-4">Quick Order</h2>
              <Button
                name="order"
                type="button"
                loader={loader}
                text="Order Fresh Fruits"
                className="w-full"
                onClick={() => (window.location.href = "/order")}
              />
            </section>
            <section>
              <h2 className="text-xl font-semibold mb-4">Subscription</h2>
              <Button
                type="button"
                loader={loader}
                name="subscribe"
                className="w-full"
                text="Start Subscription"
                onClick={() => (window.location.href = "/subscription")}
              />
            </section>
          </div>
        </Card>
      </main>
    );
  // }

  // return (
  //   <main className="flex min-h-screen flex-col items-center justify-center p-24">
  //     <AuthForm className="w-full max-w-md p-8 shadow-lg" />
  //   </main>
  // );
}
