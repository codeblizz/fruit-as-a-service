import React from "react";
import { createPaymentGateway } from "@/apps/gateway/src";
import CheckOut from "@/packages/ui/src/molecules/checkout";

export default function CheckoutPage() {

  const gateway = createPaymentGateway("stripe");

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <CheckOut gateway={gateway} />
    </main>
  );
}
