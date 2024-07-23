import { IOrderPaymentSummery, Order, PaymentStatus } from '@/types';

export const getOrderPaymentSummery = (order: Order): IOrderPaymentSummery => {
  const { total, wallet_point } = order;
  const used_wallet_amount = wallet_point?.amount! ?? 0;
  const gateway_payment = total - used_wallet_amount;
  const is_payment_gateway_use = Boolean(gateway_payment);
  const is_full_paid = order.payment_status === PaymentStatus.SUCCESS;
  const amount_due = is_full_paid ? 0 : gateway_payment;
  return {
    used_wallet_amount: used_wallet_amount,
    is_payment_gateway_use: is_payment_gateway_use,
    gateway_payment: gateway_payment,
    amount_due: amount_due,
    is_full_paid: is_full_paid,
  };
};
