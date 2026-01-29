"use client";

import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useCreateStore } from "@/packages/store/src";
import { Button } from "@/packages/ui/src/atoms/button";
import { Card } from "@/packages/ui/src/molecules/card";

interface Order {
  id: string;
  date: string;
  status: "pending" | "processing" | "delivered" | "cancelled";
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  total: number;
  type: "one-time" | "subscription";
  subscriptionPlan?: string;
}

export default function OrderHistory() {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const { loader, setLoader } = useCreateStore((state) => state);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!session?.user?.email) return;

      try {
        setLoader(true);
        const response = await fetch(
          `/fruits/orders?email=${session.user.email}`
        );
        const data = await response.json();
        setOrders(data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoader(false);
      }
    };

    fetchOrders();
  }, [session]);

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <Card className="w-full max-w-6xl p-8">
        <h1 className="text-3xl font-bold mb-2">Order History</h1>
        <p className="text-gray-600 mb-8">
          View your past orders and subscriptions
        </p>

        {loader ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-4">No orders yet</h2>
            <p className="text-gray-600 mb-6">
              Start shopping to see your orders here
            </p>
            <Button
              name="shop"
              type="button"
              onClick={() => (window.location.href = "/fruits/buyers")}
            >
              {"Browse Fruits"}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="border rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                    <p className="text-gray-600">
                      {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span>
                        {item.name} x{item.quantity}
                      </span>
                      <span>${(item.price / 100).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 flex justify-between items-center">
                  <div>
                    <span className="text-gray-600">
                      {order.type === "subscription"
                        ? `Subscription - ${order.subscriptionPlan}`
                        : "One-time purchase"}
                    </span>
                  </div>
                  <div className="text-xl font-bold">
                    Total: ${(order.total / 100).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </main>
  );
}
