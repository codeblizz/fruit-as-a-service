import { NextRequest, NextResponse } from 'next/server';
import { PayPalServerSDK, PayPalCreateOrderRequest } from '@/apps/gateway/src/paypal';

/**
 * POST /api/payments/paypal/create-order
 * Creates a PayPal order with the provided details
 */
export async function POST(req: NextRequest) {
  try {
    // Validate that we're running server-side
    if (typeof window !== 'undefined') {
      return NextResponse.json(
        { message: 'This endpoint can only be called server-side' },
        { status: 500 }
      );
    }

    // Get order data from request body
    const orderData: Omit<PayPalCreateOrderRequest, 'application_context'> = await req.json();

    // Validate required fields
    if (!orderData.purchase_units || orderData.purchase_units.length === 0) {
      return NextResponse.json(
        { message: 'Purchase units are required' },
        { status: 400 }
      );
    }

    // For each purchase unit, validate amount
    for (const unit of orderData.purchase_units) {
      if (!unit.amount || !unit.amount.value || !unit.amount.currency_code) {
        return NextResponse.json(
          { message: 'Each purchase unit must have a valid amount with currency code and value' },
          { status: 400 }
        );
      }
    }

    // Create PayPal SDK instance
    const paypalSDK = new PayPalServerSDK();

    // Add application context to the order data
    const completeOrderData: PayPalCreateOrderRequest = {
      ...orderData,
      application_context: {
        brand_name: 'Fruit as a Service',
        shipping_preference: 'NO_SHIPPING',
        user_action: 'PAY_NOW',
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/fruits/success`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/fruits/checkout`
      }
    };

    // Create the order in PayPal
    const order = await paypalSDK.createOrder(completeOrderData);

    // Return the created order
    return NextResponse.json(order);
  } catch (error) {
    console.error('Error creating PayPal order:', error);
    
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Failed to create PayPal order' },
      { status: 500 }
    );
  }
}

