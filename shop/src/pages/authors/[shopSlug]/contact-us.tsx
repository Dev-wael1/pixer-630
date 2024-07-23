import Banner from '@/components/authors/banner';
import Contact from '@/components/authors/contact-us';
import Nav from '@/components/authors/nav';
import { getStaticPaths, getStaticProps } from '@/data/ssr/common.ssr';
import Layout from '@/layouts/_layout';
import { fadeInBottom } from '@/lib/framer-motion/fade-in-bottom';
import type { NextPageWithLayout } from '@/types';
import { motion } from 'framer-motion';
import type { InferGetStaticPropsType } from 'next';
export { getStaticPaths, getStaticProps };

const ShopPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ shop }) => {
  const { name, logo, cover_image, slug } = shop;

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
        <Contact shop={shop} />
      </motion.div>
    </>
  );
};

ShopPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default ShopPage;
