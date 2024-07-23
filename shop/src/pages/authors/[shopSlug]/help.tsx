import Banner from '@/components/authors/banner';
import Help from '@/components/authors/help';
import Nav from '@/components/authors/nav';
import ErrorMessage from '@/components/ui/error-message';
import { useFAQs } from '@/data/faq';
import { getStaticPaths, getStaticProps } from '@/data/ssr/help.ssr';
import Layout from '@/layouts/_layout';
import type { NextPageWithLayout } from '@/types';
import type { InferGetStaticPropsType } from 'next';
export { getStaticPaths, getStaticProps };
import { motion } from 'framer-motion';
import { fadeInBottom } from '@/lib/framer-motion/fade-in-bottom';

const ShopPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ shop }) => {
  const { name, logo, cover_image, slug } = shop;
  const { faqs, isLoading, error, loadMore, hasNextPage, isLoadingMore } =
    useFAQs({
      faq_type: 'shop',
      issued_by: name,
      shop_id: shop?.id,
      limit: 10,
      orderBy: 'created_at',
      sortedBy: 'DESC',
    });

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
      <motion.div
        variants={fadeInBottom()}
        className="mx-auto h-full w-full max-w-screen-xl px-4 py-6 focus:outline-none md:px-6 md:py-8 lg:py-10 lg:px-8"
      >
        <Help
          faqs={faqs}
          hasMore={Boolean(hasNextPage)}
          isLoading={isLoading}
          isLoadingMore={isLoadingMore}
          loadMore={loadMore}
        />
      </motion.div>
    </>
  );
};

ShopPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default ShopPage;
