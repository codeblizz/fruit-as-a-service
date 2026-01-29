"use client";

import React from "react";
import { Button } from "@/packages/ui/src/atoms/button";
import { Card } from "@/packages/ui/src/molecules/card";

export default function OrderSuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <Card className="w-full max-w-md p-8 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-3xl font-bold mb-4">Order Successful!</h1>
        <p className="text-gray-600 mb-8">
          Thank you for your order. Your fresh fruits will be delivered soon.
        </p>
        <div className="space-y-4">
          <Button
            name="orders"
            type="button"
            className="w-full"
            onClick={() => (window.location.href = "/orders")}
          >
            View Orders
          </Button>
          <Button
            name="home"
            type="button"
            className="w-full"
            onClick={() => (window.location.href = "/")}
          >
            Back to Home
          </Button>
        </div>
      </Card>
    </main>
  );
}
