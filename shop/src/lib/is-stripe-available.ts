import { PaymentGateway } from '@/types';

export function isStripeAvailable(props: any) {
  const { defaultPaymentGateway, paymentGateway } = props;

  let processPaymentGatewayName = [];
  for (let i = 0; i < paymentGateway.length; i++) {
    processPaymentGatewayName.push(paymentGateway[i].name.toUpperCase());
  }

  // check if stripe exists in default payment gateway
  let isStripeDefault = false;
  if (defaultPaymentGateway?.toUpperCase() === PaymentGateway.STRIPE) {
    isStripeDefault = true;
  }

  // check if stripe exists in selected payment gateways
  let isStripeAsChosen = false;
  if (processPaymentGatewayName.includes(PaymentGateway.STRIPE)) {
    isStripeAsChosen = true;
  }

  let isStripeAvailable = false;
  if (isStripeAsChosen || isStripeDefault) {
    isStripeAvailable = true;
  }

  return isStripeAvailable;
}
