import Help from '@/components/authors/help';
import ErrorMessage from '@/components/ui/error-message';
import PageHeading from '@/components/ui/page-heading';
import routes from '@/config/routes';
import { useFAQs } from '@/data/faq';
import GeneralContainer from '@/layouts/_general-container';
import GeneralLayout from '@/layouts/_general-layout';
import Seo from '@/layouts/_seo';
import type { NextPageWithLayout } from '@/types';
import type { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const HelpPage: NextPageWithLayout = () => {
  const { t } = useTranslation('common');
  const { faqs, isLoading, error, loadMore, hasNextPage, isLoadingMore } =
    useFAQs({
      faq_type: 'global',
      issued_by: 'Super Admin',
      limit: 10,
      orderBy: 'created_at',
      sortedBy: 'DESC',
    });

  if (error) return <ErrorMessage message={error?.message} />;

  return (
    <>
      <Seo
        title="Help"
        description="Fastest digital download template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        url={routes.help}
      />
      <div className="mx-auto flex h-full w-full max-w-screen-xl flex-col p-4 sm:p-5">
        <PageHeading
          title={t('text-help-page-title')}
          subtitle={t('text-help-page-subtitle')}
        />
        <GeneralContainer>
          <Help
            faqs={faqs}
            hasMore={Boolean(hasNextPage)}
            isLoading={isLoading}
            isLoadingMore={isLoadingMore}
            loadMore={loadMore}
          />
        </GeneralContainer>
      </div>
    </>
  );
};

HelpPage.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
    revalidate: 60, // In seconds
  };
};

export default HelpPage;
