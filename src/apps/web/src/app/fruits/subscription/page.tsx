'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import Card from '@/packages/ui/src/molecules/card';
import Button from '@/packages/ui/src/atoms/button';
import { useCreateStore } from '@/packages/store/src';
import { createPaymentGateway } from '@/apps/gateway/src';
import CONSTANT from '@/packages/helpers/src/constants';

export default function SubscriptionPage() {
  const { data: session } = useSession();
  const subscriptionPlans = CONSTANT.subscriptionPlans;
  const { loader, setLoader } = useCreateStore((state) => state);

  const handleSubscribe = async (planId: string) => {
    try {
      setLoader(true);
      const plan = subscriptionPlans.find(p => p.id === planId);
      if (!plan) return;

      const gateway = await createPaymentGateway('stripe');
      const paymentIntent = await gateway.createPaymentIntent({
        intent: "CAPTURE",
        amount: plan.price,
        currency: 'usd',
        description: `${plan.name} Subscription`,
        metadata: {
          type: 'subscription',
          planId: plan.id,
          email: session?.user?.email ?? "guest"
        }
      });

      // Redirect to checkout page
      window.location.href = `/checkout?payment_intent=${paymentIntent.id}&subscription=true&plan=${planId}`;
    } catch (error) {
      console.error('Subscription error:', error);
    } finally {
      setLoader(false);
    }
  };

  if (!session) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <Card name='' className="p-8">
          <h1 className="text-2xl font-bold mb-4">Please login to subscribe</h1>
          <Button
            name="login"
            type="button"
            isPending={loader}
            text="Go to Login"
            className="w-full"
            onClick={() => window.location.href = '/'}
          />
        </Card>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <Card name='' className="w-full max-w-6xl p-8">
        <h1 className="text-3xl font-bold mb-2">Fruit Box Subscriptions</h1>
        <p className="text-gray-600 mb-8">Choose your perfect fruit delivery plan</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {subscriptionPlans.map(plan => (
            <div key={plan.id} className="border rounded-lg p-6 flex flex-col">
              <div className="text-4xl mb-4">{plan.image}</div>
              <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              <div className="text-3xl font-bold mb-6">
                ${(plan.price / 100).toFixed(2)}
                <span className="text-sm font-normal text-gray-600">/month</span>
              </div>
              <ul className="space-y-2 mb-8 flex-grow">
                {plan.features.map(feature => (
                  <li key={feature} className="flex items-center">
                    <span className="mr-2">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                name={`subscribe-${plan.id}`}
                type="button"
                isPending={loader}
                text="Subscribe Now"
                className="w-full"
                onClick={() => handleSubscribe(plan.id)}
              />
            </div>
          ))}
        </div>
      </Card>
    </main>
  );
} 