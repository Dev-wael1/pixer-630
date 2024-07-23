import type { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { SendIcon } from '@/components/icons/send-icon';
import { Form } from '@/components/ui/forms/form';
import * as yup from 'yup';
import Input from '@/components/ui/forms/input';

interface FormProps {
  onSubmit: SubmitHandler<FormValues>;
  loading?: boolean;
  success?: boolean;
}
type FormValues = {
  email: string;
};

const subscribeFormSchema = yup.object().shape({
  email: yup
    .string()
    .email('error-email-format')
    .required('error-email-required'),
});

export default function SubscriptionForm({
  onSubmit,
  loading,
  success,
}: FormProps) {
  const { t } = useTranslation('common');

  return (
    <div className="flex flex-col">
      <Form<FormValues>
        onSubmit={onSubmit}
        validationSchema={subscribeFormSchema}
      >
        {({ register, formState: { errors } }) => (
          <>
            <div className="relative w-full rounded border border-gray-200 bg-gray-50 ltr:pr-11 rtl:pl-11">
              <Input
                {...register('email')}
                type="email"
                placeholder={t('contact-us-email-field')}
                // error={t(errors.email?.message)}
                inputClassName="border-0 dark:focus:outline-none focus:outline-none focus:ring-0 ring-0"
                label=""
              />
              <button className="absolute top-1/2 -mt-2 ltr:right-3 rtl:left-3">
                {loading ? (
                  <span
                    className="text-accent flex h-5 w-5 shrink-0 animate-spin rounded-full border-[3px] border-t-[3px] border-gray-300 ltr:ml-2 rtl:mr-2"
                    style={{
                      borderTopColor: 'currentcolor',
                    }}
                  />
                ) : (
                  <SendIcon className="hover:text-accent text-gray-500 transition-colors" />
                )}
              </button>
            </div>
            {errors.email?.message && (
              <span role="alert" className="block pt-2 text-xs text-warning">
                {t(errors.email?.message)}
              </span>
            )}
            {!loading && success && (
              <div className="mt-1 text-[13px]">
                <span className="text-accent">
                  {t('text-subscribe-successfully')}
                </span>
              </div>
            )}
          </>
        )}
      </Form>
    </div>
  );
}
