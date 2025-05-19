import { useEffect, useRef } from "react";
import { PayPalClient } from "@/apps/gateway/src/paypal/paypal.service";

// PayPal Buttons component
const PayPalButtons: React.FC<{
  amount: string;
  onSuccess: (orderId: string) => void;
  onError: (error: Error) => void;
}> = ({ amount, onSuccess, onError }) => {
  const paypalButtonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!paypalButtonsRef.current || !window.paypal) return;

    // Clear previous buttons
    paypalButtonsRef.current.innerHTML = "";

    // @ts-ignore - PayPal types not available
    window.paypal
      .Buttons({
        createOrder: async () => {
          try {
            // Call our API to create the order
            const orderData = await PayPalClient.createOrder({
              intent: "CAPTURE",
              purchase_units: [
                {
                  amount: {
                    currency_code: "USD",
                    value: amount,
                  },
                },
              ],
            });
            return orderData.id;
          } catch (err) {
            onError(
              err instanceof Error ? err : new Error("Failed to create order")
            );
            return null;
          }
        },
        onApprove: async (data: { orderID: string }) => {
          try {
            // Call our API to capture the order
            await PayPalClient.captureOrder(data.orderID);
            onSuccess(data.orderID);
          } catch (err) {
            onError(
              err instanceof Error ? err : new Error("Failed to capture order")
            );
          }
        },
        onError: (err: Error) => {
          onError(err);
        },
      })
      .render(paypalButtonsRef.current);
  }, [amount, onSuccess, onError]);

  return <div ref={paypalButtonsRef} />;
};

export default PayPalButtons;
