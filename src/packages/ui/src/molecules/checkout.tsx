"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Info, ChevronRight, CreditCard as CardIcon } from "lucide-react";

import { useRouter } from "next/navigation";
import Form from "@/packages/ui/src/atoms/form";
import Input from "@/packages/ui/src/atoms/input";
import Section from "@/packages/ui/src/atoms/section";
import { Button } from "@/packages/ui/src/atoms/button";
import { useCheckout } from "@/packages/ui/src/molecules/hooks/useCheckout";
import {
  PaymentFormData,
  PaymentSchema,
} from "@/packages/helpers/src/validations/paypal.validate";
import NextImage from "../atoms/image";

export default function Checkout() {
  const router = useRouter();
  const { data: session } = useSession();
  const {
    error,
    isPending,
    fruitImage,
    orderAmount,
    paymentMethod,
    processPayment,
    setPaymentMethod,
  } = useCheckout();

  const { control, handleSubmit } = useForm<PaymentFormData>({
    resolver: zodResolver(PaymentSchema),
    defaultValues: {
      email: session?.user?.email || "",
      type: paymentMethod,
    },
  });

  return (
    <Section className="min-h-screen mt-[3rem] -mb-7 opacity-95 backdrop-blur-xl text-black font-sans selection:bg-blue-100">
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left Side: Product Info & Summary (X-style Sidebar) */}
        <div className="bg-[#F8F9F9] p-8 md:p-16 border-r border-stone-200">
          <Button
            variant="link"
            onClick={() => router.back()}
            className="text-stone-500 pl-0 hover:text-blackcurrant hover:no-underline transition-colors mb-12 flex items-center gap-2 text-sm font-extrabold hover:font-semibold"
          >
            <ChevronRight className="rotate-180 w-4 h-4" /> Back
          </Button>

          <div className="space-y-6">
            <header className="space-y-1">
              <h2 className="text-stone-500 font-bold text-sm uppercase tracking-wider">
                Pay Fruit Market
              </h2>
              <h1 className="text-5xl font-extrabold tracking-tight text-black">
                ${orderAmount}
              </h1>
            </header>

            <div className="space-y-4 pt-8">
              <div className="flex justify-between items-center group">
                <div className="flex items-center gap-4">
                  {fruitImage || (
                    <NextImage
                      width={30}
                      height={30}
                      src={"../assets/icons/fruit-icon.png"}
                      alt="fruit-image"
                      className="w-12 h-12 bg-stone-200 rounded-lg flex items-center justify-center text-2xl"
                    />
                  )}
                  <div>
                    <p className="font-bold text-black">Premium Harvest Box</p>
                    <p className="text-stone-500 text-sm italic">
                      One-time purchase
                    </p>
                  </div>
                </div>
                <span className="font-bold">${orderAmount}</span>
              </div>
            </div>

            <div className="pt-8 space-y-3 border-t border-stone-200">
              <div className="flex justify-between text-stone-500 text-sm">
                <span>Subtotal</span>
                <span>${orderAmount}</span>
              </div>
              <div className="flex justify-between text-stone-500 text-sm">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-black font-bold text-lg pt-2">
                <span>Total due today</span>
                <span>${orderAmount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form (The Clean Stripe Input Style) */}
        <div className="p-8 md:p-16 bg-ghost-apple">
          <div className="max-w-md mx-auto space-y-10">
            <header className="space-y-6">
              <h2 className="text-xl font-bold">Payment method</h2>

              {/* Simple Provider Toggle */}
              <div className="flex gap-2">
                {["STRIPE", "PAYPAL", "PAYSTACK"].map((id) => (
                  <Button
                    key={id}
                    onClick={() => setPaymentMethod(id as any)}
                    className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                      paymentMethod === id
                        ? "bg-blackcurrant text-ghost-apple border-blackcurrant"
                        : "bg-ghost-apple text-stone-500 border-stone-200 hover:text-ghost-apple hover:border-stone-400"
                    }`}
                  >
                    {id}
                  </Button>
                ))}
              </div>
            </header>

            {paymentMethod === "STRIPE" ? (
              <Form
                onSubmit={handleSubmit(processPayment)}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-bold block mb-2">
                      Email
                    </label>
                    <Input
                      control={control}
                      name="email"
                      placeholder="email@example.com"
                      labelClassName="hidden"
                      className="w-full border-stone-200 focus:border-black focus:ring-0 rounded-md h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold block mb-2">
                      Card information
                    </label>
                    <div className="border border-stone-200 rounded-md overflow-hidden focus-within:border-black transition-colors">
                      <Input
                        control={control}
                        name="cardNumber"
                        placeholder="1234 5678 9101 1121"
                        labelClassName="hidden"
                        className="w-full border-none h-12 rounded-none"
                      />
                      <div className="flex border-t border-stone-200">
                        <Input
                          control={control}
                          name="expMonth"
                          placeholder="MM / YY"
                          labelClassName="hidden"
                          className="w-1/2 border-none border-r border-stone-200 h-12 rounded-none"
                        />
                        <Input
                          control={control}
                          name="cvc"
                          placeholder="CVC"
                          labelClassName="hidden"
                          className="w-1/2 border-none h-12 rounded-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-bold block mb-2">
                      Cardholder name
                    </label>
                    <Input
                      control={control}
                      name="name"
                      placeholder="Full name on card"
                      labelClassName="hidden"
                      className="w-full border-stone-200 focus:border-black focus:ring-0 rounded-md h-12"
                    />
                  </div>
                </div>

                {error && (
                  <p className="text-red-600 text-xs font-medium flex items-center gap-2 mt-2">
                    <Info className="w-3 h-3" /> {error}
                  </p>
                )}

                <Button
                  type="submit"
                  loading={isPending}
                  className="w-full h-12 bg-blackcurrant hover:bg-stone-800 text-white rounded-md font-bold text-md transition-all mt-4 shadow-sm"
                >
                  Pay ${orderAmount}
                </Button>

                <p className="text-[11px] text-stone-400 text-center leading-relaxed">
                  By confirming your payment, you allow Fruit Market to charge
                  your card for this and future payments in accordance with
                  their terms.
                </p>
              </Form>
            ) : (
              <div className="border-2 border-dashed border-stone-100 rounded-xl p-12 text-center">
                <p className="text-stone-400 text-sm">
                  Redirecting to {paymentMethod}...
                </p>
                <Button
                  onClick={handleSubmit(processPayment)}
                  className="mt-4 bg-stone-100 text-black border border-stone-200"
                >
                  Continue with {paymentMethod}
                </Button>
              </div>
            )}

            {/* <footer className="pt-12 flex justify-center items-center gap-4 text-stone-400">
              <div className="flex items-center gap-1 text-[10px] font-bold tracking-tighter uppercase">
                <Lock className="w-3 h-3" /> Powered by Stripe
              </div>
              <span className="w-1 h-1 bg-stone-200 rounded-full"></span>
              <div className="text-[10px] font-bold tracking-tighter uppercase">
                Terms
              </div>
              <span className="w-1 h-1 bg-stone-200 rounded-full"></span>
              <div className="text-[10px] font-bold tracking-tighter uppercase">
                Privacy
              </div>
            </footer> */}
          </div>
        </div>
      </div>
    </Section>
  );
}
