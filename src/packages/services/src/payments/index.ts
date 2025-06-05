"use server";

import { createPaymentGateway } from "@/apps/gateway/src";
import {
  PaymentIntentAndMethod,
  PaymentIntentCreationParameter,
  PaymentMethodCreationParameter,
} from "@/packages/types/src/gateway.type";

const paymentService = {
  gateway: (gatewayType: string) => createPaymentGateway(gatewayType),
  createPaymentIntent: async function (
    gatewayType: string,
    data: PaymentIntentCreationParameter
  ) {
    const gateway = await this.gateway(gatewayType);
    return gateway.createPaymentIntent(data);
  },
  createPaymentMethod: async function (
    gatewayType: string,
    data: PaymentMethodCreationParameter
  ) {
    const gateway = await this.gateway(gatewayType);
    return gateway.createPaymentMethod(data);
  },
  confirmPaymentIntent: async function (
    gatewayType: string,
    data: PaymentIntentAndMethod
  ) {
    const gateway = await this.gateway(gatewayType);
    return gateway.confirmPaymentIntent(data);
  },
};

export default paymentService;
