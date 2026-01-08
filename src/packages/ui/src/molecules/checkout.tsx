"use client";

import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import Form from "@/packages/ui/src/atoms/form";
import Input from "@/packages/ui/src/atoms/input";
import Section from "@/packages/ui/src/atoms/section";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useTransition } from "react";
import Fragment from "@/packages/ui/src/atoms/fragment";
import { Button } from "@/packages/ui/src/atoms/button";
import Paragraph from "@/packages/ui/src/atoms/paragraph";
import { useSearchParams, useRouter } from "next/navigation";
import PaymentService from "@/packages/services/src/payments";
import { Card } from "@/packages/ui/src/molecules/card";
import PayPalButtons from "@/packages/ui/src/molecules/paypalButton";
import PayPalScriptProvider from "@/packages/providers/src/paypal.provider";
import {
  PaymentMethod,
  PaymentMethodCreation,
} from "@/packages/types/src/gateway.type";
import {
  PaymentFormData,
  PaymentSchema,
} from "@/packages/helpers/src/validations/paypal.validate";

export default function Checkout() {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();
  const orderAmount = searchParams.get("amount") || "0.00";
  const paymentIntentId = searchParams.get("payment_intent");
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod["type"]>("stripe");

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
      let paymentMethod = {} as PaymentMethodCreation;
      setError(undefined);
      // Create payment method
      startTransition(async () => {
        paymentMethod = await PaymentService.createPaymentMethod(data.type, {
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
      });
      // Confirm payment
      if (paymentIntentId) {
        await PaymentService.confirmPaymentIntent(data.type, {
          paymentIntentId,
          paymentMethodId: paymentMethod.id,
        });
      }
      // Redirect to success page
      router.replace("/order/success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment failed");
    }
  };

  if (session || !paymentIntentId) {
    return (
      <Fragment className="flex min-h-screen items-center justify-center">
        <Card className="p-8">
          <Paragraph className="text-2xl font-bold mb-4">
            {"Invalid checkout session"}
          </Paragraph>
          <Button
            name="back"
            type="button"
            className="w-full"
            onClick={() => router.push("/order")}
          >
            {"Back to Order"}
          </Button>
        </Card>
      </Fragment>
    );
  }

  // Handle PayPal success
  const handlePayPalSuccess = (orderId: string) => {
    // Redirect to success page with the order ID
    router.push(`/fruits/success?order_id=${orderId}`);
  };

  // Handle PayPal error
  const handlePayPalError = (error: Error) => {
    setError(error.message || "PayPal payment failed");
  };

  return (
    <Fragment className="flex flex-col items-center p-8">
      <Card className="w-full max-w-2xl p-8">
        <Paragraph className="text-3xl font-bold mb-8">{"Checkout"}</Paragraph>
        <Section className="mb-6">
          <Paragraph className="text-xl font-semibold mb-4">
            {"Payment Method"}
          </Paragraph>
          <Section className="flex space-x-4">
            <Button
              type="button"
              onClick={() => setPaymentMethod("stripe")}
              className={`px-4 py-2 rounded-md ${
                paymentMethod === "stripe"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {"Credit Card"}
            </Button>
            <Button
              type="button"
              onClick={() => setPaymentMethod("paypal")}
              className={`px-4 py-2 rounded-md ${
                paymentMethod === "paypal"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {"PayPal"}
            </Button>
          </Section>
        </Section>
        {paymentMethod === "stripe" ? (
          <Form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Section className="space-y-4">
              <Paragraph className="text-xl font-semibold">
                {"Payment Information"}
              </Paragraph>
              <Input
                labelClassName=""
                control={control}
                name="cardNumber"
                placeholder="Card Number"
                className="w-full"
              />
              <Section className="grid grid-cols-3 gap-4">
                <Input
                  labelClassName=""
                  control={control}
                  name="expMonth"
                  placeholder="MM"
                  className="w-full"
                />
                <Input
                  labelClassName=""
                  control={control}
                  name="expYear"
                  placeholder="YYYY"
                  className="w-full"
                />
                <Input
                  labelClassName=""
                  control={control}
                  name="cvc"
                  placeholder="CVC"
                  className="w-full"
                />
              </Section>
            </Section>
            <Section className="space-y-4">
              <Paragraph className="text-xl font-semibold">
                {"Billing Information"}
              </Paragraph>
              <Input
                labelClassName=""
                control={control}
                name="name"
                placeholder="Full Name"
                className="w-full"
              />
              <Input
                labelClassName=""
                control={control}
                name="email"
                placeholder="Email"
                className="w-full"
              />
              <Input
                labelClassName=""
                control={control}
                name="address.line1"
                placeholder="Address"
                className="w-full"
              />
              <Section className="grid grid-cols-2 gap-4">
                <Input
                  labelClassName=""
                  control={control}
                  name="address.city"
                  placeholder="City"
                  className="w-full"
                />
                <Input
                  labelClassName=""
                  control={control}
                  name="address.state"
                  placeholder="State"
                  className="w-full"
                />
              </Section>
              <Section className="grid grid-cols-2 gap-4">
                <Input
                  labelClassName=""
                  control={control}
                  name="address.postalCode"
                  placeholder="Postal Code"
                  className="w-full"
                />
                <Input
                  labelClassName=""
                  control={control}
                  name="address.country"
                  placeholder="Country"
                  className="w-full"
                />
              </Section>
            </Section>
            {error && <i className="text-red-500 text-sm">{error}</i>}
            <Button
              name="pay"
              type="submit"
              loading={isPending}
              className="w-full"
            >
              {"Complete Payment"}
            </Button>
          </Form>
        ) : (
          <Fragment className="space-y-6">
            <Section className="py-4">
              <Paragraph className="text-xl font-semibold mb-4">
                {"PayPal Checkout"}
              </Paragraph>
              <Paragraph className="mb-4">
                {"Click the PayPal button below to complete your payment of $"}
                {orderAmount}.
              </Paragraph>
              <PayPalScriptProvider
                clientId={process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test"}
              >
                <PayPalButtons
                  amount={orderAmount}
                  onError={handlePayPalError}
                  onSuccess={handlePayPalSuccess}
                />
              </PayPalScriptProvider>
            </Section>
            {error && <i className="text-red-500 text-sm">{error}</i>}
          </Fragment>
        )}
      </Card>
    </Fragment>
  );
}
