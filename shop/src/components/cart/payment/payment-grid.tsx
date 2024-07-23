import { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import cn from 'classnames';
import { PaymentGateway } from '@/types';
import { RadioGroup } from '@/components/ui/radio-group';
import { paymentGatewayAtom } from '@/components/cart/lib/checkout';
import PaymentOnline from '@/components/cart/payment/payment-online';
import { useIsDarkMode } from '@/lib/hooks/use-is-dark-mode';
import { useSettings } from '@/data/settings';
import Alert from '@/components/ui/alert';
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
import { useAtom } from 'jotai';
import CoinbaseIcon from '@/components/icons/payment-gateways/coinbase';

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

export const PaymentGroupOption: React.FC<PaymentGroupOptionProps> = ({
  payment: { name, darkIcon, value, icon },
  theme,
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

const PaymentGrid: React.FC<{ className?: string; theme?: 'bw' }> = ({
  className,
  theme,
}) => {
  const [gateway, setGateway] = useAtom(paymentGatewayAtom);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { t } = useTranslation('common');
  const { settings, isLoading } = useSettings();

  const [defaultGateway, setDefaultGateway] = useState(
    settings?.defaultPaymentGateway?.toUpperCase() || ''
  );

  const [availableGateway, setAvailableGateway] = useState(
    settings?.paymentGateway || []
  );

  // FixME
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

  useEffect(() => {
    if (settings && availableGateway) {
      setGateway(
        settings?.defaultPaymentGateway?.toUpperCase() as PaymentGateway
      );
    }
  }, [isLoading, defaultGateway, availableGateway]);

  const PaymentMethod = AVAILABLE_PAYMENT_METHODS_MAP[gateway];
  const Component = PaymentMethod?.component ?? PaymentOnline;
  return (
    <div className={className}>
      {errorMessage ? (
        <Alert
          message={t(`common:${errorMessage}`)}
          variant="error"
          closeable={true}
          className="mt-5"
          onClose={() => setErrorMessage(null)}
        />
      ) : null}

      <RadioGroup value={gateway} onChange={setGateway}>
        <RadioGroup.Label className="mb-5 block text-13px font-medium dark:text-white">
          {t('text-choose-payment')}
        </RadioGroup.Label>

        <div className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-3">
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
          {/* {settings?.paymentGateway && (
            <PaymentGroupOption
              theme={theme}
              payment={
                AVAILABLE_PAYMENT_METHODS_MAP[
                  settings?.paymentGateway?.toUpperCase() as PaymentGateway
                ]
              }
            />
          )} */}
        </div>
      </RadioGroup>
      {/* <div className="mb-5">
        <Component />
      </div> */}
    </div>
  );
};

export default PaymentGrid;
