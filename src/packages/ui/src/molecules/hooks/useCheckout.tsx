"use client";

import { useState, useTransition, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { PaymentFormData } from "@/packages/helpers/src/validations/paypal.validate";
import useFruit from "./useFruit";
import { FruitCategorySchema } from "@/packages/helpers/src/validations/fruits.validate";

export function useCheckout() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isVerifying, setIsVerifying] = useState(false);
  const {
    filteredFruits,
    fruitCategories,
  } = useFruit({ name: "", description: "", kinds: [""] }, FruitCategorySchema);
  const [paymentMethod, setPaymentMethod] = useState<"STRIPE" | "PAYPAL" | "PAYSTACK" | "FLUTTERWAVE">("STRIPE");

  const orderAmount = searchParams.get("amount") || "0.00";
  const fruitId = pathname.split("/").pop();
  const orderId = searchParams.get("orderId"); // UUID for your OrderEntity
  const fruitImage = filteredFruits.find((fruit) => fruit.id === fruitId)?.image[0] || "";

  // 1. Verification Step: Calls /payments/verify/{transactionId}
  const verifyPayment = useCallback(async (transactionId: string) => {
    setIsVerifying(true);
    try {
      const response = await fetch(`/api/payments/verify/${transactionId}`, {
        method: "GET",
      });
      const result = await response.json();

      if (result.status === "COMPLETED" || result.status === 200) {
        router.replace(`/order/success?ref=${transactionId}`);
      } else {
        throw new Error("Payment verification failed. Please contact support.");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsVerifying(false);
    }
  }, [router]);

  // 2. Initiation Step: Calls /payments/initiate
  const processPayment = async (data: PaymentFormData) => {
    setError(null);
    startTransition(async () => {
      try {
        const response = await fetch("/api/payments/initiate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...data,
            orderId,
            provider: paymentMethod, // Matches your Java Enum
            amount: parseFloat(orderAmount),
          }),
        });

        const result = await response.json();

        if (!response.ok) throw new Error(result.message || "Initiation failed");

        // If the provider is STRIPE or local, we might get a COMPLETED status immediately
        if (result.data.status === "COMPLETED") {
          router.replace("/order/success");
          return;
        }

        // For gateways like Paystack/Flutterwave, we get a reference to verify
        if (result.data.gatewayTransactionId) {
          await verifyPayment(result.data.gatewayTransactionId);
        }
      } catch (err: any) {
        setError(err.message);
      }
    });
  };

  return {
    error,
    fruitImage,
    isPending: isPending || isVerifying,
    isVerifying,
    orderAmount,
    paymentMethod,
    verifyPayment,
    processPayment,
    setPaymentMethod,
  };
}