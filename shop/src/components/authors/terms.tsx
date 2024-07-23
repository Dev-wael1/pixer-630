import ItemNotFound from '@/components/ui/item-not-found';
import { PageLoader } from '@/components/ui/loader/spinner/spinner';
import { TermsAndConditions } from '@/types';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
import Button from '@/components/ui/button';
import { useSanitizeContent } from '@/lib/sanitize-content';

type TermsAndConditionProps = {
  isLoading: boolean;
  hasMore: boolean;
  isLoadingMore: boolean;
  terms: TermsAndConditions[];
  loadMore: () => void;
};

const TermsAndCondition: React.FC<TermsAndConditionProps> = ({
  isLoading,
  hasMore,
  isLoadingMore,
  terms,
  loadMore,
}) => {
  const { t } = useTranslation();
  return (
    <>
      {isLoading ? (
        <div className="py-32">
          <PageLoader showText={false} />
        </div>
      ) : isEmpty(terms) ? (
        <div className="py-32">
          <ItemNotFound title="No terms and conditions found 😔" message="" />
        </div>
      ) : (
        <>
          {terms?.map((item) => <TermsItem key={item?.id} term={item} />)}

          {hasMore && (
            <div className="mt-8 grid place-content-center md:mt-10">
              <Button
                onClick={loadMore}
                disabled={isLoadingMore}
                isLoading={isLoadingMore}
              >
                {t('text-loadmore')}
              </Button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export const TermsItem = ({ term }: { term: TermsAndConditions }) => {
  const { t } = useTranslation();
  const content = useSanitizeContent({ description: term?.description });
  return (
    <div className="order-list-enable mb-8 last:mb-0 lg:mb-10">
      <h3 className="mb-4 text-sm font-medium text-dark dark:text-light lg:mb-5">
        {t(term?.title)}
      </h3>
      {content ? (
        <div
          className="space-y-5 leading-6 react-editor-description"
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default TermsAndCondition;
