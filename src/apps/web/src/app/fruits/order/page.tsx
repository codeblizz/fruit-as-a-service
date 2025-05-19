import { createPaymentGateway } from '@/apps/gateway/src';
import OrderFruit from "@/packages/ui/src/molecules/orderFruit";
import { PaymentIntentCreationParameter } from "@/apps/gateway/src/common/gateway.interface";
export default function OrderPage() {
  
  const gateway = createPaymentGateway('stripe');

  const createPaymentIntent = async (data: PaymentIntentCreationParameter) => {
    "use server";
    return (await gateway).createPaymentIntent(data);
  }

  return (
    <main className="flex min-h-screen bg-[url('/images/fruit-platter-002.webp')] bg-no-repeat bg-cover bg-center bg-fixed flex-col items-center justify-center">
      <OrderFruit gateway={gateway} createPaymentIntent={createPaymentIntent} />
    </main>
  );
}
