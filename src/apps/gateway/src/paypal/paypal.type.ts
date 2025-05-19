
export interface PayPalCreateOrderRequest {
    application_context: () => void;
}
export interface PayPalOrderResponse {
    id: string;
}
export interface PayPalCaptureOrderResponse {}
export interface PayPalError {}
export interface PayPalOrderError {}
export interface PayPalCaptureError {}
export interface PayPalRefundError {}
export interface PayPalWebhookError {}
export interface PayPalClientInterface {
    captureOrder: (orderId: string) => Promise<PayPalCaptureOrderResponse>;
    createOrder: (orderData: Omit<PayPalCreateOrderRequest, "application_context">) => Promise<PayPalOrderResponse>;
}