import { NextRequest, NextResponse } from 'next/server';
// import { PayPalServerSDK } from '@/apps/gateway/src/paypal';

/**
 * POST /api/payments/paypal/capture-order
 * Captures (finalizes) a PayPal order after it has been approved by the buyer
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

    // Get the order ID from the query parameters
    const searchParams = req.nextUrl.searchParams;
    const orderId = searchParams.get('orderId');

    // Validate order ID
    if (!orderId) {
      return NextResponse.json(
        { message: 'Order ID is required' },
        { status: 400 }
      );
    }

    // Create PayPal SDK instance
    // const paypalSDK = new PayPalServerSDK();

    // Capture the order
    // const captureData = await paypalSDK.captureOrder(orderId);

    // Validate capture was successful
    // if (captureData.status !== 'COMPLETED') {
    //   return NextResponse.json(
    //     { message: `Order capture failed with status: ${captureData.status}` },
    //     { status: 400 }
    //   );
    // }

    // Return the capture data
    // return NextResponse.json(captureData);
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : 'Failed to capture PayPal order' },
      { status: 500 }
    );
  }
}

