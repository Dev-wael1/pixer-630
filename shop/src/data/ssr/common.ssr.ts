import client from '@/data/client';
import { API_ENDPOINTS } from '@/data/client/endpoints';
import type {
  FaqsQueryOptions,
  ProductQueryOptions,
  SettingsQueryOptions,
  Shop,
  TermsAndConditionsQueryOptions,
} from '@/types';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { QueryClient, dehydrate } from 'react-query';
import invariant from 'tiny-invariant';

// This function gets called at build time
type ParsedQueryParams = {
  shopSlug: string;
};

export const getStaticPaths: GetStaticPaths<ParsedQueryParams> = async ({
  locales,
}) => {
  invariant(locales, 'locales is not defined');
  const { data } = await client.shops.all({ limit: 100, is_active: 1 });

  const paths = data?.flatMap((shop) =>
    locales?.map((locale) => ({ params: { shopSlug: shop.slug }, locale }))
  );
  return {
    paths,
    fallback: 'blocking',
  };
};
type PageProps = {
  shop: Shop;
};

export const getStaticProps: GetStaticProps<
  PageProps,
  ParsedQueryParams
> = async ({ params, locale }) => {
  const queryClient = new QueryClient();
  const { shopSlug } = params!;
  try {
    const shop = await client.shops.get(shopSlug);
    await Promise.all([
      queryClient.prefetchQuery(
        [API_ENDPOINTS.SETTINGS, { language: locale }],
        ({ queryKey }) =>
          client.settings.all(queryKey[1] as SettingsQueryOptions)
      ),
    ]);
    return {
      props: {
        shop,
        ...(await serverSideTranslations(locale!, ['common'])),
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      },
      revalidate: 60,
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
