import { prisma } from '@/packages/database/src';
import { NextRequest, NextResponse } from 'next/server';
// import { createPaymentGateway } from '@/apps/gateway/src';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { planId, email, paymentMethodId } = body;

    if (!planId || !email || !paymentMethodId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get the subscription plan
    const plan = await prisma.subscriptionPlan.findUnique({
      where: { id: planId }
    });

    if (!plan) {
      return NextResponse.json(
        { error: 'Invalid subscription plan' },
        { status: 400 }
      );
    }

    // Create subscription in payment gateway
    // const gateway = createPaymentGateway('stripe');
    // const subscription = await gateway.createSubscription({
    //   customerId: email,
    //   planId: plan.id,
    //   paymentMethodId,
    //   metadata: {
    //     planName: plan.name,
    //     userEmail: email
    //   }
    // });

    // Create subscription in database
    const dbSubscription = await prisma.subscription.create({
      data: {
        // id: subscription.id,
        userEmail: email,
        planId: plan.id,
        status: 'active',
        // gatewaySubscriptionId: subscription.id,
        // nextBillingDate: new Date(subscription.current_period_end * 1000),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    });

    return NextResponse.json({ subscription: dbSubscription });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create subscription' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { subscriptionId, action } = body;

    if (!subscriptionId || !action) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const subscription = await prisma.subscription.findUnique({
      where: { id: subscriptionId }
    });

    if (!subscription) {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 }
      );
    }

    // const gateway = createPaymentGateway('stripe');

    switch (action) {
      case 'cancel':
        // await gateway.cancelSubscription(subscription.gatewaySubscriptionId);
        await prisma.subscription.update({
          where: { id: subscriptionId },
          data: {
            status: 'cancelled',
            updatedAt: new Date()
          }
        });
        break;

      case 'pause':
        // await gateway.pauseSubscription(subscription.gatewaySubscriptionId);
        await prisma.subscription.update({
          where: { id: subscriptionId },
          data: {
            status: 'paused',
            updatedAt: new Date()
          }
        });
        break;

      case 'resume':
        // await gateway.resumeSubscription(subscription.gatewaySubscriptionId);
        await prisma.subscription.update({
          where: { id: subscriptionId },
          data: {
            status: 'active',
            updatedAt: new Date()
          }
        });
        break;

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update subscription' },
      { status: 500 }
    );
  }
}

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

    const subscriptions = await prisma.subscription.findMany({
      where: {
        userEmail: email
      },
      include: {
        plan: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json({ subscriptions });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch subscriptions' },
      { status: 500 }
    );
  }
} 