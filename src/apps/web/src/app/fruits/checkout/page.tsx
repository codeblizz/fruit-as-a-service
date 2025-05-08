"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Card from "@/packages/ui/src/molecules/card";
import Button from "@/packages/ui/src/atoms/button";
import Input from "@/packages/ui/src/atoms/input";
import { useCreateStore } from "@/packages/store/src";
import { createPaymentGateway } from "@/apps/gateway/src";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const PaymentSchema = z.object({
  cardNumber: z.string().min(16).max(16),
  expMonth: z.string().min(1).max(2),
  expYear: z.string().length(4),
  cvc: z.string().length(3),
  name: z.string().min(1),
  email: z.string().email(),
  address: z.object({
    line1: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    postalCode: z.string().min(1),
    country: z.string().min(1),
  }),
});

type PaymentFormData = z.infer<typeof PaymentSchema>;

export default function CheckoutPage() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const { loader, setLoader } = useCreateStore((state) => state);
  const [error, setError] = useState<string>();
  const paymentIntentId = searchParams.get("payment_intent");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentFormData>({
    resolver: zodResolver(PaymentSchema),
    defaultValues: {
      email: session?.user?.email || "",
    },
  });

  const onSubmit = async (data: PaymentFormData) => {
    try {
      setLoader(true);
      setError(undefined);

      const gateway = createPaymentGateway("stripe");

      // Create payment method
      const paymentMethod = await gateway.createPaymentMethod({
        type: "card",
        card: {
          number: data.cardNumber,
          expMonth: parseInt(data.expMonth),
          expYear: parseInt(data.expYear),
          cvc: data.cvc,
        },
        billingDetails: {
          name: data.name,
          email: data.email,
          address: data.address,
        },
      });

      // Confirm payment
      if (paymentIntentId) {
        await gateway.confirmPaymentIntent({
          paymentIntentId,
          paymentMethodId: paymentMethod.id,
        });

        // Redirect to success page
        window.location.href = "/order/success";
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment failed");
    } finally {
      setLoader(false);
    }
  };

  if (!session || !paymentIntentId) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <Card name="" className="p-8">
          <h1 className="text-2xl font-bold mb-4">Invalid checkout session</h1>
          <Button
            name="back"
            type="button"
            text="Back to Order"
            className="w-full"
            onClick={() => (window.location.href = "/order")}
          />
        </Card>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <Card name="" className="w-full max-w-2xl p-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Payment Information</h2>
            <Input
              placeholderClassName=""
              control={control}
              name="cardNumber"
              placeholder="Card Number"
              className="w-full"
            />
            <div className="grid grid-cols-3 gap-4">
              <Input
                placeholderClassName=""
                control={control}
                name="expMonth"
                placeholder="MM"
                className="w-full"
              />
              <Input
                placeholderClassName=""
                control={control}
                name="expYear"
                placeholder="YYYY"
                className="w-full"
              />
              <Input
                placeholderClassName=""
                control={control}
                name="cvc"
                placeholder="CVC"
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Billing Information</h2>
            <Input
              placeholderClassName=""
              control={control}
              name="name"
              placeholder="Full Name"
              className="w-full"
            />
            <Input
              placeholderClassName=""
              control={control}
              name="email"
              placeholder="Email"
              className="w-full"
            />
            <Input
              placeholderClassName=""
              control={control}
              name="address.line1"
              placeholder="Address"
              className="w-full"
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholderClassName=""
                control={control}
                name="address.city"
                placeholder="City"
                className="w-full"
              />
              <Input
                placeholderClassName=""
                control={control}
                name="address.state"
                placeholder="State"
                className="w-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholderClassName=""
                control={control}
                name="address.postalCode"
                placeholder="Postal Code"
                className="w-full"
              />
              <Input
                placeholderClassName=""
                control={control}
                name="address.country"
                placeholder="Country"
                className="w-full"
              />
            </div>
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <Button
            name="pay"
            type="submit"
            loader={loader}
            text="Complete Payment"
            className="w-full"
          />
        </form>
      </Card>
    </main>
  );
}
