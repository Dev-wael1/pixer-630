import Single from '@/components/product/single';
import { getStaticPaths, getStaticProps } from '@/data/ssr/products.ssr';
import Layout from '@/layouts/_layout';
import type { NextPageWithLayout } from '@/types';
import type { InferGetStaticPropsType } from 'next';
export { getStaticPaths, getStaticProps };

const ProductPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ product }) => {
  return <Single product={product} />;
};

ProductPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default ProductPage;
