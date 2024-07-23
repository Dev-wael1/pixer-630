import AccessDeniedPage from '@/components/common/access-denied';
import Single from '@/components/product/single';
import {
  adminOwnerAndStaffOnly,
  getAuthCredentials,
  hasAccess,
} from '@/data/client/token.utils';
import { getStaticPaths, getStaticProps } from '@/data/ssr/products.ssr';
import Layout from '@/layouts/_layout';
import type { NextPageWithLayout } from '@/types';
import type { InferGetStaticPropsType } from 'next';
export { getStaticPaths, getStaticProps };

const ProductPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ product }) => {
  const { permissions } = getAuthCredentials();
  const AccessAdminRoles = hasAccess(adminOwnerAndStaffOnly, permissions);
  return AccessAdminRoles ? <Single product={product} /> : <AccessDeniedPage />;
};

ProductPage.authorization = true;
ProductPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default ProductPage;
