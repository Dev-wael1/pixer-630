import { CreateContactUsInput } from '@/types';
import Input from '@/components/ui/forms/input';
import Textarea from '@/components/ui/forms/textarea';
import Button from '@/components/ui/button';
import { contactUsFormSchema } from '@/components/contact-us/schema';
import { Form } from '@/components/ui/forms/form';
import { useTranslation } from 'next-i18next';
import type { SubmitHandler } from 'react-hook-form';

type ContactFormProps = {
  onSubmit: SubmitHandler<CreateContactUsInput>;
  reset: CreateContactUsInput | null;
  isLoading: boolean;
};

const ContactForm: React.FC<ContactFormProps> = ({
  onSubmit,
  reset,
  isLoading,
}) => {
  const { t } = useTranslation('common');
  return (
    <Form<CreateContactUsInput>
      onSubmit={onSubmit}
      validationSchema={contactUsFormSchema}
      resetFields={reset}
    >
      {({ register, formState: { errors } }) => (
        <>
          <fieldset className="mb-6 grid gap-5 sm:grid-cols-2">
            <Input
              label={t('contact-us-name-field')}
              {...register('name')}
              error={errors.name?.message}
            />
            <Input
              label={t('contact-us-email-field')}
              type="email"
              {...register('email')}
              error={errors.email?.message}
            />
            <Input
              label={t('contact-us-subject-field')}
              {...register('subject')}
              error={errors.subject?.message}
              className="sm:col-span-2"
            />
            <Textarea
              label={t('contact-us-message-field')}
              {...register('description')}
              error={errors.description?.message}
              className="sm:col-span-2"
            />
          </fieldset>
          <Button
            type="submit"
            className="mb-1 w-full flex-1 sm:flex-none md:w-auto"
            isLoading={isLoading}
            disabled={isLoading}
          >
            {t('contact-us-submit-button')}
          </Button>
        </>
      )}
    </Form>
  );
};

export default ContactForm;
