import React from "react";
import CheckOut from "@/packages/ui/src/molecules/checkout";

export default function CheckoutPage() {

  return (
    <main className="flex min-h-screen bg-[url('/images/fruit-platter-002.webp')] bg-no-repeat bg-cover bg-center bg-fixed flex-col items-center p-8">
      <CheckOut />
    </main>
  );
}
