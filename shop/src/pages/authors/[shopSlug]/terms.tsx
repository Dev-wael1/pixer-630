import Banner from '@/components/authors/banner';
import Nav from '@/components/authors/nav';
import TermsAndCondition from '@/components/authors/terms';
import ErrorMessage from '@/components/ui/error-message';
import routes from '@/config/routes';
import { useSettings } from '@/data/settings';
import { getStaticPaths, getStaticProps } from '@/data/ssr/terms.ssr';
import { useTermsAndConditions } from '@/data/terms-and-conditions';
import Layout from '@/layouts/_layout';
import type { NextPageWithLayout } from '@/types';
import dayjs from 'dayjs';
import { isArray, isEmpty } from 'lodash';
import type { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
export { getStaticPaths, getStaticProps };
import { motion } from 'framer-motion';
import { fadeInBottom } from '@/lib/framer-motion/fade-in-bottom';

const ShopPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ shop }) => {
  const { name, logo, cover_image, slug } = shop;
  const router = useRouter();
  const {
    termsAndConditions,
    isLoading,
    loadMore,
    isLoadingMore,
    hasMore,
    error,
  } = useTermsAndConditions({
    shop_id: shop.id,
    issued_by: shop.name,
    is_approved: true,
    limit: 10,
    orderBy: 'created_at',
    sortedBy: 'DESC',
  });
  const { settings, isLoading: settingsLoading } = useSettings();
  const isEnableTermsRoute = settings?.enableTerms;

  useEffect(() => {
    if (!isEnableTermsRoute) {
      router.replace(routes.shopUrl(slug));
    }
  }, [settings, slug, settingsLoading]);

  const getLastUpdateTermsDate = useMemo(() => {
    return (
      !isEmpty(termsAndConditions) &&
      isArray(termsAndConditions) &&
      termsAndConditions[0]?.created_at
    );
  }, [termsAndConditions]);

  if (error) return <ErrorMessage message={error?.message} />;

  return (
    <>
      <Banner
        coverImage={cover_image?.original}
        logo={logo?.original}
        name={name}
        shopId={shop?.id}
      />
      <Nav slug={slug} />
      {isEnableTermsRoute ? (
        <motion.div
          variants={fadeInBottom()}
          className="mx-auto flex h-full w-full max-w-screen-xl flex-col py-6 focus:outline-none md:py-8 lg:py-10"
        >
          {!isEmpty(termsAndConditions) ? (
            <p className="pb-20 text-center font-medium">{`Last updated on ${
              getLastUpdateTermsDate
                ? dayjs(new Date(getLastUpdateTermsDate as string)).format(
                    'MMMM D, YYYY'
                  )
                : ''
            }`}</p>
          ) : (
            ''
          )}
          <TermsAndCondition
            hasMore={hasMore}
            isLoading={isLoading || settingsLoading}
            isLoadingMore={isLoadingMore}
            loadMore={loadMore}
            terms={termsAndConditions}
          />
        </motion.div>
      ) : (
        ''
      )}
    </>
  );
};

ShopPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default ShopPage;
