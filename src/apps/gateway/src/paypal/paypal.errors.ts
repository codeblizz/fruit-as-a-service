export class PayPalError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PayPalError';
  }
}

export class PayPalOrderError extends PayPalError {
  constructor(message: string) {
    super(message);
    this.name = 'PayPalOrderError';
  }
}

export class PayPalCaptureError extends PayPalError {
  constructor(message: string) {
    super(message);
    this.name = 'PayPalCaptureError';
  }
}

export class PayPalRefundError extends PayPalError {
  constructor(message: string) {
    super(message);
    this.name = 'PayPalRefundError';
  }
}

export class PayPalWebhookError extends PayPalError {
  constructor(message: string) {
    super(message);
    this.name = 'PayPalWebhookError';
  }
} 