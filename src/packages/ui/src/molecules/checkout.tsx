"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import Input from "@/packages/ui/src/atoms/input";
import Card from "@/packages/ui/src/molecules/card";
import Button from "@/packages/ui/src/atoms/button";
import { useCreateStore } from "@/packages/store/src";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPaymentGateway } from "@/apps/gateway/src";
import { useSearchParams, useRouter } from "next/navigation";
import PayPalButtons from "@/packages/ui/src/molecules/paypalButton";
import PayPalScriptProvider from "@/packages/providers/src/paypal.provider";
import { PaymentFormData, PaymentSchema } from "@/packages/helpers/src/validations/paypal.validate";

// Payment method type
type PaymentMethod = 'stripe' | 'paypal' | 'paystack' | 'flutterwave';

export default function Checkout() {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string>();
  const orderAmount = searchParams.get("amount") || "0.00";
  const paymentIntentId = searchParams.get("payment_intent");
  const { loader, setLoader } = useCreateStore((state) => state);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('stripe');

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
      // Create payment method
      const gateway = await createPaymentGateway(data.type);
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

  if (session || !paymentIntentId) {
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

  // Handle PayPal success
  const handlePayPalSuccess = (orderId: string) => {
    // Redirect to success page with the order ID
    router.push(`/fruits/success?order_id=${orderId}`);
  };

  // Handle PayPal error
  const handlePayPalError = (error: Error) => {
    setError(error.message || 'PayPal payment failed');
    setLoader(false);
  };

  return (
    <main className="flex flex-col items-center p-8">
      <Card name="" className="w-full max-w-2xl p-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setPaymentMethod('stripe')}
              className={`px-4 py-2 rounded-md ${
                paymentMethod === 'stripe'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              Credit Card
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod('paypal')}
              className={`px-4 py-2 rounded-md ${
                paymentMethod === 'paypal'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              PayPal
            </button>
          </div>
        </div>
        {paymentMethod === 'stripe' ? (
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
            isPending={loader}
            text="Complete Payment"
            className="w-full"
          />
        </form>
        ) : (
          <div className="space-y-6">
            <div className="py-4">
              <h2 className="text-xl font-semibold mb-4">PayPal Checkout</h2>
              <p className="mb-4">
                Click the PayPal button below to complete your payment of ${orderAmount}.
              </p>
              <PayPalScriptProvider clientId={process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'test'}>
                <PayPalButtons
                  amount={orderAmount}
                  onError={handlePayPalError}
                  onSuccess={handlePayPalSuccess}
                />
              </PayPalScriptProvider>
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}
          </div>
        )}
      </Card>
    </main>
  );
}
