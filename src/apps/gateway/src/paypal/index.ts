import axios from 'axios';

const PAYPAL_BASE_URL = process.env.PAYPAL_API_URL || 'https://api-m.sandbox.paypal.com';
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID || 'test';
const PAYPAL_SECRET = process.env.PAYPAL_SECRET || 'test';

// Types
export interface PayPalCreateOrderRequest {
  intent?: string;
  purchase_units: Array<{
    amount: {
      currency_code: string;
      value: string;
    };
    description?: string;
    reference_id?: string;
  }>;
  application_context?: {
    brand_name?: string;
    shipping_preference?: 'GET_FROM_FILE' | 'NO_SHIPPING' | 'SET_PROVIDED_ADDRESS';
    user_action?: 'CONTINUE' | 'PAY_NOW';
    return_url?: string;
    cancel_url?: string;
  };
}

interface PayPalTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface PayPalOrderResponse {
  id: string;
  status: string;
  links: Array<{
    href: string;
    rel: string;
    method: string;
  }>;
}

export class PayPalServerSDK {
  private accessToken: string | null = null;
  private tokenExpiration: number = 0;

  constructor() {}

  private async getAccessToken(): Promise<string> {
    // Check if token is still valid
    if (this.accessToken && Date.now() < this.tokenExpiration) {
      return this.accessToken;
    }

    try {
      const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString('base64');
      
      const response = await axios.post<PayPalTokenResponse>(
        `${PAYPAL_BASE_URL}/v1/oauth2/token`,
        'grant_type=client_credentials',
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${auth}`
          }
        }
      );

      this.accessToken = response.data.access_token;
      // Set expiration 5 minutes before actual expiry to be safe
      this.tokenExpiration = Date.now() + (response.data.expires_in - 300) * 1000;
      
      return this.accessToken;
    } catch (error) {
      console.error('Error getting PayPal access token:', error);
      throw new Error('Failed to authenticate with PayPal');
    }
  }

  public async createOrder(orderData: PayPalCreateOrderRequest): Promise<PayPalOrderResponse> {
    try {
      const token = await this.getAccessToken();
      
      const response = await axios.post<PayPalOrderResponse>(
        `${PAYPAL_BASE_URL}/v2/checkout/orders`,
        {
          intent: orderData.intent || 'CAPTURE',
          purchase_units: orderData.purchase_units,
          application_context: orderData.application_context || {
            brand_name: 'Fruit as a Service',
            shipping_preference: 'NO_SHIPPING',
            user_action: 'PAY_NOW'
          }
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      return response.data;
    } catch (error: any) {
      console.error('Error creating PayPal order:', error.response?.data || error);
      throw new Error(error.response?.data?.message || 'Failed to create PayPal order');
    }
  }

  public async captureOrder(orderId: string): Promise<any> {
    try {
      const token = await this.getAccessToken();
      
      const response = await axios.post(
        `${PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}/capture`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      return response.data;
    } catch (error: any) {
      console.error('Error capturing PayPal order:', error.response?.data || error);
      throw new Error(error.response?.data?.message || 'Failed to capture PayPal order');
    }
  }

  public async getOrderDetails(orderId: string): Promise<any> {
    try {
      const token = await this.getAccessToken();
      
      const response = await axios.get(
        `${PAYPAL_BASE_URL}/v2/checkout/orders/${orderId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      return response.data;
    } catch (error: any) {
      console.error('Error getting PayPal order details:', error.response?.data || error);
      throw new Error(error.response?.data?.message || 'Failed to get PayPal order details');
    }
  }
}

// Export for backward compatibility
export function PayPalGateway() {
  const sdk = new PayPalServerSDK();
  
  return {
    createPaymentSession: async (data: any) => {
      const order = await sdk.createOrder({
        purchase_units: [{
          amount: {
            currency_code: data.currency || 'USD',
            value: (data.amount / 100).toFixed(2)
          },
          description: data.description || 'Fruit-as-a-Service order'
        }]
      });
      
      // Find the approve URL
      const approveUrl = order.links.find(link => link.rel === 'approve')?.href;
      
      return {
        id: order.id,
        url: approveUrl || '',
        status: order.status
      };
    },
    
    getPaymentStatus: async (orderId: string) => {
      const orderDetails = await sdk.getOrderDetails(orderId);
      
      return {
        status: orderDetails.status,
        details: orderDetails
      };
    }
  };
}


export * from './paypal.type';

export { PayPalGateway } from './paypal.service';
