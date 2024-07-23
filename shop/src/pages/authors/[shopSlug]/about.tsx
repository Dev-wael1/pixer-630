import About from '@/components/authors/about';
import Banner from '@/components/authors/banner';
import Nav from '@/components/authors/nav';
import { getStaticPaths, getStaticProps } from '@/data/ssr/common.ssr';
import Layout from '@/layouts/_layout';
import type { NextPageWithLayout } from '@/types';
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
      <>
        <Nav slug={slug} />
        <div className="h-full">
          <div className="px-4 py-6 focus:outline-none md:px-6 md:py-8 lg:py-10 lg:px-8">
            <About shop={shop} />
          </div>
        </div>
      </>
    </>
  );
};

ShopPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default ShopPage;
