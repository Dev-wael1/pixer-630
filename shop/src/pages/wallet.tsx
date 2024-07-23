import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import type { GetStaticProps } from 'next';
import type { NextPageWithLayout } from '@/types';
import { motion } from 'framer-motion';
import DashboardLayout from '@/layouts/_dashboard';
import { fadeInBottom } from '@/lib/framer-motion/fade-in-bottom';
import { useMe } from '@/data/user';
import { useBreakpoint } from '@/lib/hooks/use-breakpoint';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import { useTranslation } from 'next-i18next';
import routes from '@/config/routes';
import AnchorLink from '@/components/ui/links/anchor-link';
import { UserIconAlt } from '@/components/icons/user-icon-alt';
import usePrice from '@/lib/hooks/use-price';
import ItemNotFound from '@/components/ui/item-not-found';

const ProfilePage: NextPageWithLayout = () => {
  const { me } = useMe();
  const { t } = useTranslation('common');
  const breakpoint = useBreakpoint();
  const isMounted = useIsMounted();
  const { price: currentWalletCurrency } = usePrice({
    amount: Number(me?.wallet?.available_points_to_currency),
  });
  if (isMounted && ['xs', 'sm', 'md'].indexOf(breakpoint) === -1) {
    return (
      <div className="flex min-h-full flex-grow flex-col">
        <div className="m-auto text-center">
          <h1 className="mb-5 text-15px font-medium text-dark dark:text-light sm:mb-6">
            Wallet
          </h1>
          <AnchorLink
            href={routes?.profile}
            className="group mx-auto mt-7 inline-flex items-center gap-2 rounded border border-light-400 px-6 py-3.5 font-semibold text-dark transition-all hover:bg-light-400 hover:text-brand-dark dark:border-dark-400 dark:text-light dark:hover:bg-dark-400 dark:focus:bg-dark-400 md:mt-9"
          >
            <UserIconAlt className="h-[18px] w-[18px] text-dark/40 group-hover:text-brand dark:text-light/60" />
            Go Back To {t('text-auth-profile')}
          </AnchorLink>
        </div>
      </div>
    );
  }
  return (
    <motion.div
      variants={fadeInBottom()}
      className="flex min-h-full flex-grow flex-col lg:hidden"
    >
      {me?.wallet ? (
        <>
          <h1 className="mb-5 text-15px font-medium text-dark dark:text-light sm:mb-6">
            Wallet
          </h1>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            <div className="w-full space-y-2 rounded-md border border-solid p-8 text-center text-2xl font-medium text-dark-100 dark:border-dark-600 dark:text-light-400">
              <p className="mb-0">{me?.wallet?.total_points}</p>
              <p className="mb-0 opacity-50">{t('text-total')}</p>
            </div>
            <div className="w-full space-y-2 rounded-md border border-solid p-8 text-center text-2xl font-medium text-dark-100 dark:border-dark-600 dark:text-light-400">
              <p className="mb-0">{me?.wallet?.points_used}</p>
              <p className="mb-0 opacity-50">{t('text-used')}</p>
            </div>
            <div className="w-full space-y-2 rounded-md border border-solid p-8 text-center text-2xl font-medium text-dark-100 dark:border-dark-600 dark:text-light-400">
              <p className="mb-0">{me?.wallet?.available_points}</p>
              <p className="mb-0 opacity-50">{t('text-available')}</p>
            </div>
            <div className="w-full space-y-2 rounded-md border border-solid p-8 text-center text-2xl font-medium text-dark-100 dark:border-dark-600 dark:text-light-400">
              <p className="mb-0">{currentWalletCurrency}</p>
              <p className="mb-0 opacity-50">{t('text-balance')}</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <ItemNotFound
            title="No wallet found."
            message="Sorry, we don't found any wallet point."
            className="px-4 pt-5 pb-10 md:px-6 md:pt-6 lg:px-7 lg:pb-12 3xl:px-8"
          />
          <AnchorLink
            href={routes?.profile}
            className="group mx-auto mt-7 inline-flex items-center gap-2 rounded border border-light-400 px-6 py-3.5 font-semibold text-dark transition-all hover:bg-light-400 hover:text-brand-dark dark:border-dark-400 dark:text-light dark:hover:bg-dark-400 dark:focus:bg-dark-400 md:mt-9"
          >
            <UserIconAlt className="h-[18px] w-[18px] text-dark/40 group-hover:text-brand dark:text-light/60" />
            Go Back To {t('text-auth-profile')}
          </AnchorLink>
        </>
      )}
    </motion.div>
  );
};

ProfilePage.authorization = true;
ProfilePage.getLayout = function getLayout(page) {
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

export default ProfilePage;
