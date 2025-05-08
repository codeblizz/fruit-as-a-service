'use client';

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import Card from '@/packages/ui/src/molecules/card';
import Button from '@/packages/ui/src/atoms/button';
import { useCreateStore } from '@/packages/store/src';
import { createPaymentGateway } from '@/apps/gateway/src';

interface FruitItem {
  id: string;
  name: string;
  price: number;
  image: string;
  unit: string;
}

const fruits: FruitItem[] = [
  { id: '1', name: 'Apple', price: 100, image: '🍎', unit: 'kg' },
  { id: '2', name: 'Banana', price: 80, image: '🍌', unit: 'dozen' },
  { id: '3', name: 'Orange', price: 120, image: '🍊', unit: 'kg' },
  { id: '4', name: 'Mango', price: 150, image: '🥭', unit: 'kg' },
];

export default function OrderPage() {
  const { data: session } = useSession();
  const { loader, setLoader } = useCreateStore((state) => state);
  const [cart, setCart] = useState<{ [key: string]: number }>({});

  const addToCart = (fruitId: string) => {
    setCart(prev => ({
      ...prev,
      [fruitId]: (prev[fruitId] || 0) + 1
    }));
  };

  const removeFromCart = (fruitId: string) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[fruitId] > 1) {
        newCart[fruitId]--;
      } else {
        delete newCart[fruitId];
      }
      return newCart;
    });
  };

  const getTotalAmount = () => {
    return Object.entries(cart).reduce((total, [fruitId, quantity]) => {
      const fruit = fruits.find(f => f.id === fruitId);
      return total + (fruit?.price || 0) * quantity;
    }, 0);
  };

  const handleCheckout = async () => {
    try {
      setLoader(true);
      const gateway = createPaymentGateway('stripe');
      const paymentIntent = await gateway.createPaymentIntent({
        amount: getTotalAmount(),
        currency: 'usd',
        description: 'Fruit Order',
        metadata: {
          orderId: Date.now().toString(),
          email: session?.user?.email ?? 'guest'
        }
      });

      // Redirect to checkout page with payment intent
      window.location.href = `/checkout?payment_intent=${paymentIntent.id}`;
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setLoader(false);
    }
  };

  if (!session) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <Card name='w-[40%]' className="p-8">
          <h1 className="text-2xl font-bold mb-4">Please login to order</h1>
          <Button
            name="login"
            type="button"
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
      <Card name='' className="w-[60%] max-w-4xl p-8">
        <h1 className="text-3xl font-bold mb-8">Order Fresh Fruits</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {fruits.map(fruit => (
            <div key={fruit.id} className="border rounded-lg p-4">
              <div className="text-4xl mb-2">{fruit.image}</div>
              <h3 className="font-semibold">{fruit.name}</h3>
              <p className="text-gray-600">${(fruit.price / 100).toFixed(2)} per {fruit.unit}</p>
              <div className="flex items-center mt-4">
                <Button
                  name={`remove-${fruit.id}`}
                  type="button"
                  text="-"
                  className="w-10"
                  onClick={() => removeFromCart(fruit.id)}
                  disabled={!cart[fruit.id]}
                />
                <span className="mx-4">{cart[fruit.id] || 0}</span>
                <Button
                  name={`add-${fruit.id}`}
                  type="button"
                  text="+"
                  className="w-10"
                  onClick={() => addToCart(fruit.id)}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-between items-center">
          <div className="text-xl font-semibold">
            Total: ${(getTotalAmount() / 100).toFixed(2)}
          </div>
          <Button
            type="button"
            name="checkout"
            loader={loader}
            className="w-48"
            onClick={handleCheckout}
            text="Proceed to Checkout"
            disabled={getTotalAmount() === 0}
          />
        </div>
      </Card>
    </main>
  );
}