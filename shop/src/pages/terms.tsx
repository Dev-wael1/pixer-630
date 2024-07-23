import TermsAndCondition from '@/components/authors/terms';
import ErrorMessage from '@/components/ui/error-message';
import PageHeading from '@/components/ui/page-heading';
import routes from '@/config/routes';
import { useTermsAndConditions } from '@/data/terms-and-conditions';
import GeneralContainer from '@/layouts/_general-container';
import GeneralLayout from '@/layouts/_general-layout';
import Seo from '@/layouts/_seo';
import type { NextPageWithLayout } from '@/types';
import dayjs from 'dayjs';
import { isArray, isEmpty } from 'lodash';
import type { GetStaticProps } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useMemo } from 'react';

const TermsPage: NextPageWithLayout = () => {
  const { t } = useTranslation('common');
  const {
    termsAndConditions,
    isLoading,
    error,
    loadMore,
    hasMore,
    isLoadingMore,
  } = useTermsAndConditions({
    type: 'global',
    issued_by: 'Super Admin',
    limit: 10,
    is_approved: true,
    orderBy: 'created_at',
    sortedBy: 'DESC',
  });

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
      <Seo
        title="Terms & Conditions"
        description="Fastest digital download template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        url={routes.terms}
      />
      <div className="mx-auto flex h-full w-full max-w-screen-xl flex-col p-4 sm:p-5">
        {!isEmpty(termsAndConditions) ? (
          <PageHeading
            title={t('text-terms-page-title')}
            subtitle={`Last updated on ${
              getLastUpdateTermsDate
                ? dayjs(new Date(getLastUpdateTermsDate as string)).format(
                    'MMMM D, YYYY'
                  )
                : ''
            }`}
          />
        ) : (
          ''
        )}
        <GeneralContainer>
          <TermsAndCondition
            hasMore={hasMore}
            isLoading={isLoading}
            isLoadingMore={isLoadingMore}
            loadMore={loadMore}
            terms={termsAndConditions}
          />
        </GeneralContainer>
      </div>
    </>
  );
};

TermsPage.getLayout = function getLayout(page) {
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

export default TermsPage;
