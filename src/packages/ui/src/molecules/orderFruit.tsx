"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Card from "@/packages/ui/src/molecules/card";
import Button from "@/packages/ui/src/atoms/button";
import React, { useState, useTransition } from "react";
import CONSTANT from "@/packages/helpers/src/constants";
import AuthForm from "@/packages/ui/src/molecules/authForm";
import { PaymentIntent } from "@/apps/gateway/src/common/gateway.interface";
import utils from "@/packages/helpers/src/utils";

export default function OrderFruit({ createPaymentIntent }: any) {
  const router = useRouter();
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();
  const [cart, setCart] = useState<{ [key: string]: number }>({});

  const addToCart = (fruitId: string) => {
    setCart((prev) => ({
      ...prev,
      [fruitId]: (prev[fruitId] || 0) + 1,
    }));
  };

  const removeFromCart = (fruitId: string) => {
    setCart((prev) => {
      const newCart = { ...prev };
      if (newCart[fruitId] > 1) {
        newCart[fruitId]--;
      } else {
        delete newCart[fruitId];
      }
      return newCart;
    });
  };

  const getTotalAmount = (): number => {
    return Object.entries(cart).reduce((total, [fruitId, quantity]) => {
      const fruit = CONSTANT.fruits.find((f) => f.id === fruitId);
      return total + (fruit?.price || 0) * quantity;
    }, 0);
  };

  const handleCheckout = () => {
    try {
      let paymentIntent = {} as PaymentIntent;
      startTransition(() => {
        paymentIntent = createPaymentIntent({
          amount: getTotalAmount(),
          currency: "usd",
          description: "Fruit Order",
          metadata: {
            orderId: Date.now().toString(),
            email: session?.user?.email ?? "guest",
          },
        });
      });
      const query = utils.formatQuery({ payment_intent: paymentIntent.id })
      router.push("/checkout" + query);
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  if (session) {
    router.push("/auth/signin");
    return (
      <main className="flex flex-col w-full min-h-screen items-center justify-center">
        <AuthForm className="w-[60%] sm:w-[50%] md:w-[40%] h-[50%] min-w-max" />
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center mt-16">
      <Card name="" className="flex flex-col justify-center items-center size-full p-8">
        <h1 className="text-3xl font-bold mb-8">Order Fresh Fruits</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 size-full">
          {CONSTANT.fruits.map((fruit) => (
            <div key={fruit.id} className="border-2 flex flex-col justify-center items-center border-plum rounded-lg p-4">
              <div className="text-4xl mb-2">{fruit.image}</div>
              <h3 className="font-semibold">{fruit.name}</h3>
              <p className="text-gray-600">
                ${(fruit.price / 100).toFixed(2)} per {fruit.unit}
              </p>
              <div className="flex justify-center items-center mt-4">
                <Button
                  text="-"
                  type="button"
                  disabled={!cart[fruit.id]}
                  name={`remove-${fruit.id}`}
                  onClick={() => removeFromCart(fruit.id)}
                  className="w-10 inline-flex items-center justify-center"
                />
                <span className="mx-4">{cart[fruit.id] || 0}</span>
                <Button
                  text="+"
                  type="button"
                  name={`add-${fruit.id}`}
                  onClick={() => addToCart(fruit.id)}
                  className="w-10 inline-flex items-center justify-center"
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-between items-center w-full">
          <div className="text-sm md:text-xl font-semibold px-2 text-nowrap">
            Total: ${(getTotalAmount() / 100).toFixed(2)}
          </div>
          <Button
            type="button"
            name="checkout"
            isPending={isPending}
            onClick={handleCheckout}
            text="Proceed to Checkout"
            disabled={getTotalAmount() === 0}
            className="w-32 md:w-48 truncate inline-flex text-xs md:text-[16px] px-2 justify-center items-center"
          />
        </div>
      </Card>
    </main>
  );
}
