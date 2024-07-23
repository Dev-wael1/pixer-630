import { isEmpty } from 'lodash';
import ItemNotFound from '@/components/ui/item-not-found';
import { PageLoader } from '@/components/ui/loader/spinner/spinner';
import Accordion from '@/components/ui/accordion';
import Button from '@/components/ui/button';
import { FAQS } from '@/types';
import { useTranslation } from 'react-i18next';

type HelpProps = {
  isLoading: boolean;
  faqs: FAQS[];
  loadMore: () => void;
  hasMore: boolean;
  isLoadingMore: boolean;
};

const Help: React.FC<HelpProps> = ({
  isLoading,
  faqs,
  loadMore,
  hasMore,
  isLoadingMore,
}) => {
  const { t } = useTranslation();
  return (
    <>
      {isLoading ? (
        <div className="py-32">
          <PageLoader showText={false} />
        </div>
      ) : isEmpty(faqs) ? (
        <div className="py-32">
          <ItemNotFound title="No help found 😔" message="" />
        </div>
      ) : (
        <>
          {faqs?.map((item) => (
            <Accordion key={`${item?.faq_title}-${item.id}`} item={item} />
          ))}

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

export default Help;
