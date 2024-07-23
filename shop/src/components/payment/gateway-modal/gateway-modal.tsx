import { StripeIcon } from '@/components/icons/payment-gateways/stripe';
import { PayPalIcon } from '@/components/icons/payment-gateways/paypal';
import { RazorPayIcon } from '@/components/icons/payment-gateways/razorpay';
import { MollieIcon } from '@/components/icons/payment-gateways/mollie';
import { PayStack } from '@/components/icons/payment-gateways/paystack';
import BitpayIcon from '@/components/icons/payment-gateways/bitpay';
import { PayPalDarkIcon } from '@/components/icons/payment-gateways/paypal-dark';
import BitpayDarkIcon from '@/components/icons/payment-gateways/bitpay-dark';
import { MollieDarkIcon } from '@/components/icons/payment-gateways/mollie-dark';
import { PayStackDark } from '@/components/icons/payment-gateways/paystack-dark';
import { RazorPayDarkIcon } from '@/components/icons/payment-gateways/razorpay-dark';
import { useModalState } from '@/components/modal-views/context';
import Button from '@/components/ui/button';
import { useGetPaymentIntent } from '@/data/order';
import { useSettings } from '@/data/settings';
import { Order, PaymentGateway } from '@/types';
import { RadioGroup } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';
import PaymentOnline from '@/components/cart/payment/payment-online';
import cn from 'classnames';
import CoinbaseIcon from '@/components/icons/payment-gateways/coinbase';
import { useIsDarkMode } from '@/lib/hooks/use-is-dark-mode';
import { useAtom } from 'jotai';
import { paymentGatewayAtom } from '@/components/cart/lib/checkout';

interface IProps {
  theme?: string;
  settings: any;
  order: Order;
  isLoading: boolean;
}

interface PaymentMethodInformation {
  name: string;
  value: PaymentGateway;
  icon: any;
  darkIcon?: any;
  component: React.FunctionComponent;
  width: number;
  height: number;
}

interface PaymentGroupOptionProps {
  payment: PaymentMethodInformation;
  theme?: string;
}

const PaymentGroupOption: React.FC<PaymentGroupOptionProps> = ({
  payment: { name, darkIcon, value, icon },
}) => {
  const { isDarkMode } = useIsDarkMode();
  return (
    <RadioGroup.Option value={value} key={value}>
      {({ checked }) => (
        <div
          className={cn(
            'relative flex h-[5.625rem] w-full cursor-pointer items-center justify-center rounded border bg-light-300 py-3 text-center dark:border-[#3A3A3A] dark:bg-[#303030]',
            checked && 'border-brand dark:border-brand-dark'
            // {
            //   'shadow-600 !border-gray-800 bg-light': theme === 'bw' && checked,
            // }
          )}
        >
          {icon || darkIcon ? (
            isDarkMode ? (
              darkIcon
            ) : (
              icon
            )
          ) : (
            <span className="text-heading text-xs font-semibold">{name}</span>
          )}
        </div>
      )}
    </RadioGroup.Option>
  );
};

const PaymentGateways: React.FC<IProps> = ({
  theme,
  settings,
  order,
  isLoading,
}) => {
  // @ts-ignore
  const AVAILABLE_PAYMENT_METHODS_MAP: Record<
    PaymentGateway,
    PaymentMethodInformation
  > = {
    STRIPE: {
      name: 'Stripe',
      value: PaymentGateway.STRIPE,
      icon: <StripeIcon />,
      darkIcon: <StripeIcon />,
      component: PaymentOnline,
      width: 40,
      height: 28,
    },
    PAYPAL: {
      name: 'Paypal',
      value: PaymentGateway.PAYPAL,
      icon: <PayPalIcon />,
      darkIcon: <PayPalDarkIcon />,
      component: PaymentOnline,
      width: 82,
      height: 21,
    },
    RAZORPAY: {
      name: 'RazorPay',
      value: PaymentGateway.RAZORPAY,
      icon: <RazorPayIcon />,
      darkIcon: <RazorPayDarkIcon />,
      component: PaymentOnline,
      width: 82,
      height: 40,
    },
    MOLLIE: {
      name: 'Mollie',
      value: PaymentGateway.MOLLIE,
      icon: <MollieIcon />,
      darkIcon: <MollieDarkIcon />,
      component: PaymentOnline,
      width: 100,
      height: 52,
    },
    PAYSTACK: {
      name: 'Paystack',
      value: PaymentGateway.PAYSTACK,
      icon: <PayStack />,
      darkIcon: <PayStackDark />,
      component: PaymentOnline,
      width: 100,
      height: 52,
    },
    BITPAY: {
      name: 'Bitpay',
      value: PaymentGateway.BITPAY,
      icon: <BitpayIcon />,
      darkIcon: <BitpayDarkIcon />,
      component: PaymentOnline,
      width: 100,
      height: 52,
    },
    COINBASE: {
      name: 'Coinbase',
      value: PaymentGateway.COINBASE,
      icon: <CoinbaseIcon className="w-32" />,
      darkIcon: <CoinbaseIcon className="w-32" />,
      component: PaymentOnline,
      width: 100,
      height: 52,
    },
  };
  const [gateway, setGateway] = useAtom(paymentGatewayAtom);
  const [defaultGateway, setDefaultGateway] = useState(
    settings?.defaultPaymentGateway?.toUpperCase() || ''
  );

  const [availableGateway, setAvailableGateway] = useState(
    settings?.paymentGateway || []
  );

  useEffect(() => {
    if (settings && availableGateway) {
      setGateway(
        settings?.defaultPaymentGateway?.toUpperCase() as PaymentGateway
      );
    }
  }, [isLoading, defaultGateway, availableGateway]);

  return (
    <>
      {settings?.useEnableGateway &&
        availableGateway &&
        availableGateway.map((gateway: any, index: any) => {
          return (
            <Fragment key={index}>
              <PaymentGroupOption
                theme={theme}
                payment={
                  AVAILABLE_PAYMENT_METHODS_MAP[
                    gateway?.name.toUpperCase() as PaymentGateway
                  ]
                }
              />
            </Fragment>
          );
        })}
    </>
  );
};

const GatewayModal = () => {
  const {
    data: { order },
  } = useModalState();
  const [gateway, setGateway] = useAtom(paymentGatewayAtom);
  const { settings } = useSettings();
  const { isLoading, getPaymentIntentQuery } = useGetPaymentIntent({
    tracking_number: order?.tracking_number as string,
    payment_gateway: gateway,
    recall_gateway: false as boolean,
    form_change_gateway: true,
  });

  const handleSubmit = async () => {
    await getPaymentIntentQuery();
  };

  // check and set disabled already chosen gateway
  let disabledSelection = false;
  if (!gateway) {
    disabledSelection = true;
  }
  disabledSelection = gateway === order?.payment_gateway;

  return (
    <Fragment>
      <div className="payment-modal relative h-full w-screen max-w-md overflow-hidden rounded-[10px] bg-light dark:bg-dark-250 md:h-auto md:min-h-0 lg:max-w-[46rem]">
        <div className="p-6 lg:p-12">
          <RadioGroup value={gateway} onChange={setGateway}>
            <RadioGroup.Label className="text-heading mb-5 block text-lg font-semibold">
              Choose Another Payment Gateway
            </RadioGroup.Label>
            <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3">
              <PaymentGateways
                theme="bw"
                settings={settings}
                order={order}
                isLoading={!!isLoading}
              />
            </div>
          </RadioGroup>

          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={disabledSelection || !!isLoading}
          >
            Submit Payment
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default GatewayModal;
