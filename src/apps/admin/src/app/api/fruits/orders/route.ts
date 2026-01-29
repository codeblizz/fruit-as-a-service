import { prisma } from '@/packages/database/src';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Fetch both one-time orders and subscriptions
    const [orders, subscriptions] = await Promise.all([
      prisma.order.findMany({
        where: {
          userEmail: email,
          type: 'one-time'
        },
        include: {
          items: true
        },
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.subscription.findMany({
        where: {
          userEmail: email,
          status: {
            not: 'cancelled'
          }
        },
        include: {
          plan: true,
          orders: {
            include: {
              items: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        }
      })
    ]);

    // Transform the data to match the frontend Order interface
    const transformedOrders = [
      ...orders.map((order: any) => ({
        id: order.id,
        date: order.createdAt.toISOString(),
        status: order.status,
        items: order.items.map((item: any) => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        total: order.total,
        type: 'one-time' as const
      })),
      ...subscriptions.flatMap((subscription: any) => 
        subscription.orders.map((order: any) => ({
          id: order.id,
          date: order.createdAt.toISOString(),
          status: order.status,
          items: order.items.map((item: any) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price
          })),
          total: order.total,
          type: 'subscription' as const,
          subscriptionPlan: subscription.plan.name
        }))
      )
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return NextResponse.json({ orders: transformedOrders });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
} 