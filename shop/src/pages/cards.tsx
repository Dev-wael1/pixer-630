import Seo from '@/layouts/_seo';
import MyCards from '@/components/card/my-cards';
import { useSettings } from '@/data/settings';
import { NextPageWithLayout, PaymentGateway } from '@/types';
import { fadeInBottom } from '@/lib/framer-motion/fade-in-bottom';
import { motion } from 'framer-motion';
import type { GetStaticProps } from 'next';
import DashboardLayout from '@/layouts/_dashboard';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { isStripeAvailable } from '@/lib/is-stripe-available';

const FeatureNotAvailable = () => {
  return (
    <div className="payment-modal relative h-full w-screen max-w-md overflow-hidden rounded-[10px] bg-light md:h-auto md:min-h-0 lg:max-w-[46rem]">
      <div className="p-6 lg:p-12">
        <span className="mb-2 block text-sm font-semibold text-black">
          Sorry this feature is not available!
        </span>
      </div>
    </div>
  );
};

const MyCardsPage: NextPageWithLayout = () => {
  const { settings } = useSettings();

  // Make it dynamic
  const isStripeGatewayAvailable = isStripeAvailable(settings);
  const isPaymentEnable = settings?.useEnableGateway ?? true;

  if (!isStripeGatewayAvailable || !isPaymentEnable) {
    return <FeatureNotAvailable />;
  }

  return (
    <>
      <Seo
        title="My cards"
        description="All my card related information."
        url="/cards"
      />
      <motion.div
        variants={fadeInBottom()}
        className="flex min-h-full flex-grow flex-col"
      >
        <MyCards />
      </motion.div>
    </>
  );
};

MyCardsPage.authorization = true;
MyCardsPage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
    revalidate: 60, // In seconds
  };
};

export default MyCardsPage;
