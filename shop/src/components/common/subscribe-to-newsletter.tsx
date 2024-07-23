import SubscriptionForm from '@/components/maintenance/subscription-form';
import { useSubscription } from '@/data/settings';
import { useTranslation } from 'next-i18next';

type SubscribeToNewsletterProps = {
  title?: string;
  description?: string;
};
export default function SubscribeToNewsletter({
  title,
  description,
}: SubscribeToNewsletterProps) {
  const { t } = useTranslation('common');
  const {
    mutate: subscribe,
    isLoading: loading,
    isSubscribed,
  } = useSubscription();

  function onSubmit({ email }: { email: string }) {
    subscribe({ email });
  }
  return (
    <div className="flex flex-col">
      {title ? (
        <h3 className="text-heading mt-3 mb-7 text-xl font-semibold">
          {t(title)}
        </h3>
      ) : (
        ''
      )}
      {description ? (
        <p className="text-heading mb-7 text-sm">{t(description!)}</p>
      ) : (
        ''
      )}
      <SubscriptionForm
        onSubmit={onSubmit}
        loading={loading}
        success={isSubscribed}
      />
    </div>
  );
}
