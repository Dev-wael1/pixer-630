import { ContactInfo } from '@/components/contact-us/contact-info';
import ContactForm from '@/components/contact-us/form';
import { LocationIcon } from '@/components/icons/contact/location-icon';
import { MailIcon } from '@/components/icons/contact/mail-icon';
import { PhoneIcon } from '@/components/icons/contact/phone-icon';
import * as socialIcons from '@/components/icons/social';
import Link from '@/components/ui/link';
import { useContactUs } from '@/data/contact';
import { formatAddress } from '@/lib/format-address';
import { getIcon } from '@/lib/get-icon';
import { CreateContactUsInput, Shop } from '@/types';
import { isEmpty } from 'lodash';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';

type ContactProps = {
  shop: Shop;
};

const Contact: React.FC<ContactProps> = ({ shop }) => {
  const { t } = useTranslation('common');
  let [reset, setReset] = useState<CreateContactUsInput | null>(null);
  const { mutate, isLoading, isSuccess } = useContactUs();
  const onSubmit: SubmitHandler<CreateContactUsInput> = (values) => {
    const emailTo = shop?.owner?.email;
    // @ts-ignore
    mutate({ emailTo, ...values });
  };
  useEffect(() => {
    if (isSuccess) {
      setReset({
        name: '',
        email: '',
        subject: '',
        description: '',
      });
    }
  }, [isSuccess]);
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-md px-4 py-5 sm:px-6 sm:py-8 md:bg-light md:p-10 md:shadow-card md:dark:bg-dark-200 md:dark:shadow-none lg:flex-row lg:p-0">
      <div className="shrink-0 border-light-300 dark:border-dark-300 lg:w-[400px] lg:py-10 ltr:lg:border-r ltr:lg:pr-[72px] ltr:lg:pl-10 rtl:lg:border-l rtl:lg:pl-[72px] rtl:lg:pr-10 lg:dark:bg-dark-250 xl:w-[430px] xl:py-12 ltr:xl:pr-24 rtl:xl:pl-24">
        <h2 className="pb-2 text-lg font-medium text-dark dark:text-light md:text-xl">
          {t('contact-us-info-title')}
        </h2>
        <p className="font-medium leading-[1.8em]">
          {t('contact-us-info-subtitle')}
        </p>
        <div className="grid-cols-2 gap-x-5 gap-y-8 space-y-7 pt-9 sm:grid sm:space-y-0 md:gap-y-9 lg:block lg:space-y-9">
          <ContactInfo
            icon={<LocationIcon className="h-12 w-12" />}
            title={t('contact-us-office-title')}
            description={
              formatAddress(shop?.address) ?? t('contact-us-office-message')
            }
          />
          <ContactInfo
            icon={<PhoneIcon className="h-10 w-10" />}
            title={t('contact-us-phone-title')}
            description={
              shop?.settings?.contact ?? t('contact-us-phone-message')
            }
          />
          <ContactInfo
            icon={<MailIcon className="h-10 w-10" />}
            title={t('contact-us-site-title')}
            description={
              shop?.settings?.website ?? t('contact-us-site-message')
            }
          />
          {!isEmpty(shop?.settings?.socials) ? (
            <div className="flex items-center gap-5">
              {shop?.settings?.socials?.map(({ icon, url }, idx) => (
                <Link
                  key={idx}
                  href={url}
                  target="_blank"
                  className="group flex items-center"
                >
                  {getIcon({
                    iconList: socialIcons,
                    iconName: icon,
                    className:
                      'w-4 h-4 text-dark-800 dark:text-light-900 shrink-0',
                  })}
                </Link>
              ))}
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
      <div className="w-full flex-grow pt-12 lg:p-10 xl:p-12">
        <ContactForm onSubmit={onSubmit} reset={reset} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default Contact;
