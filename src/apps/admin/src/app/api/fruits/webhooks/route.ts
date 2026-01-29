// import { headers } from 'next/headers';
// import { prisma } from '@/packages/database/src';
// import { NextRequest, NextResponse } from 'next/server';
// import { createPaymentGateway } from '@/apps/gateway/src';

// export async function POST(request: NextRequest) {
//   try {
//     const headersList = await headers();
//     const signature = headersList.get('stripe-signature');
    
//     if (!signature) {
//       return NextResponse.json(
//         { error: 'No signature provided' },
//         { status: 400 }
//       );
//     }

//     const gateway = createPaymentGateway('stripe');
//     const event = await gateway.constructWebhookEvent(
//       await request.text(),
//       signature
//     );

//     switch (event.type) {
//       case 'customer.subscription.created':
//         await handleSubscriptionCreated(event.data.object);
//         break;

//       case 'customer.subscription.updated':
//         await handleSubscriptionUpdated(event.data.object);
//         break;

//       case 'customer.subscription.deleted':
//         await handleSubscriptionCancelled(event.data.object);
//         break;

//       case 'invoice.payment_succeeded':
//         await handleInvoicePaid(event.data.object);
//         break;

//       case 'invoice.payment_failed':
//         await handleInvoiceFailed(event.data.object);
//         break;
//     }

//     return NextResponse.json({ received: true });
//   } catch (error) {
//     console.error('Error processing webhook:', error);
//     return NextResponse.json(
//       { error: 'Webhook processing failed' },
//       { status: 500 }
//     );
//   }
// }

// async function handleSubscriptionCreated(subscription: any) {
//   const { customer, status, metadata, current_period_end, id } = subscription;
  
//   if (!metadata?.userEmail) {
//     console.error('No user email in subscription metadata');
//     return;
//   }

//   const existingSubscription = await prisma.subscription.findFirst({
//     where: { gatewaySubscriptionId: id }
//   });

//   if (existingSubscription) {
//     await prisma.subscription.update({
//       where: { id: existingSubscription.id },
//       data: {
//         status: status,
//         nextBillingDate: new Date(current_period_end * 1000)
//       }
//     });
//   }
// }

// async function handleSubscriptionUpdated(subscription: any) {
//   const existingSubscription = await prisma.subscription.findFirst({
//     where: { gatewaySubscriptionId: subscription.id }
//   });

//   if (existingSubscription) {
//     await prisma.subscription.update({
//       where: { id: existingSubscription.id },
//       data: {
//         status: subscription.status,
//         nextBillingDate: new Date(subscription.current_period_end * 1000)
//       }
//     });
//   }
// }

// async function handleSubscriptionCancelled(subscription: any) {
//   const existingSubscription = await prisma.subscription.findFirst({
//     where: { gatewaySubscriptionId: subscription.id }
//   });

//   if (existingSubscription) {
//     await prisma.subscription.update({
//       where: { id: existingSubscription.id },
//       data: {
//         status: 'cancelled'
//       }
//     });
//   }
// }

// async function handleInvoicePaid(invoice: any) {
//   const subscription = await prisma.subscription.findFirst({
//     where: {
//       gatewaySubscriptionId: invoice.subscription
//     },
//     include: {
//       plan: true
//     }
//   });

//   if (!subscription) {
//     console.error('Subscription not found for invoice:', invoice.id);
//     return;
//   }

//   // Create an order for the successful payment
//   await prisma.order.create({
//     data: {
//       userEmail: subscription.userEmail,
//       status: 'processing',
//       type: 'subscription',
//       total: invoice.total,
//       subscriptionId: subscription.id,
//       items: {
//         create: [{
//           name: subscription.plan.name,
//           quantity: 1,
//           price: subscription.plan.price
//         }]
//       }
//     }
//   });
// }

// async function handleInvoiceFailed(invoice: any) {
//   const subscription = await prisma.subscription.findFirst({
//     where: {
//       gatewaySubscriptionId: invoice.subscription
//     }
//   });

//   if (!subscription) {
//     console.error('Subscription not found for invoice:', invoice.id);
//     return;
//   }

//   // Update subscription status to reflect payment failure
//   await prisma.subscription.update({
//     where: {
//       id: subscription.id
//     },
//     data: {
//       status: 'past_due'
//     }
//   });
// } 