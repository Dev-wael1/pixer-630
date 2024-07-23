import ContactForm from '@/components/contact-us/form';
import { CloseIcon } from '@/components/icons/close-icon';
import { HomeIconNew } from '@/components/icons/home-icon-new';
import { MapPinNew } from '@/components/icons/map-pin';
import { MobileIconNew } from '@/components/icons/mobile-icon';
import Link from '@/components/ui/link';
import { CreateContactUsInput } from '@/types';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
const JoinButton = dynamic(() => import('@/components/ui/login-button'), {
  ssr: false,
});
import { useDrawer } from '@/components/drawer-views/context';
import { useContactUs } from '@/data/contact';
import { useSettings } from '@/data/settings';
import { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import Scrollbar from '@/components/ui/scrollbar';
import ThemeSwitcher from '@/components/ui/theme-switcher';

const MoreInfo = () => {
  const { t } = useTranslation('common');
  const { closeDrawer } = useDrawer();
  let [reset, setReset] = useState<CreateContactUsInput | null>(null);
  const { mutate, isLoading, isSuccess } = useContactUs();
  const onSubmit: SubmitHandler<CreateContactUsInput> = (values) => {
    mutate(values);
  };
  const { settings } = useSettings();
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
    <>
      <div className="sticky top-0 left-0 flex w-full items-center justify-between border-b border-light-300 p-4 dark:border-dark-500">
        <div className="flex items-center gap-5 xs:gap-6 sm:gap-7">
          <JoinButton />
          <ThemeSwitcher />
        </div>
        <button
          onClick={() => closeDrawer()}
          aria-label="Close panel"
          className="-m-2 p-2 text-dark-800 outline-none transition-all hover:text-dark hover:dark:text-light-200"
        >
          <span className="sr-only">{t('text-close')}</span>
          <CloseIcon className="h-4 w-4" />
        </button>
      </div>
      <Scrollbar>
        <div className="p-5 pt-12 md:p-10">
          <div className="mb-12 text-center md:mb-24">
            {settings?.maintenance?.aboutUsTitle ? (
              <h2 className="mb-5 text-3xl font-bold">
                {settings?.maintenance?.aboutUsTitle}
              </h2>
            ) : (
              ''
            )}
            {settings?.maintenance?.aboutUsDescription ? (
              <p className="mb-6 leading-8 text-dark dark:text-light">
                {settings?.maintenance?.aboutUsDescription}
              </p>
            ) : (
              ''
            )}
          </div>

          <div className="mb-14 md:mb-32">
            {settings?.maintenance?.contactUsTitle ? (
              <h2 className="mb-5 text-center text-3xl font-bold">
                {settings?.maintenance?.contactUsTitle}
              </h2>
            ) : (
              ''
            )}
            <ContactForm
              onSubmit={onSubmit}
              reset={reset}
              isLoading={isLoading}
            />
          </div>

          <div className="grid grid-cols-3 gap-6 divide-y divide-dark text-center dark:divide-light md:gap-4 md:divide-y-0">
            <div className="col-span-full md:col-span-1">
              <div className="text-[rgb(191 187 199)] mb-4 text-3xl">
                <MapPinNew className="mx-auto" />
              </div>
              <h3 className="mb-3 text-base font-bold">{t('text-address')}</h3>
              {settings?.contactDetails?.location?.formattedAddress ? (
                <Link
                  href={`https://www.google.com/maps/place/${settings?.contactDetails?.location?.formattedAddress}`}
                  target="_blank"
                  title={settings?.contactDetails?.location?.formattedAddress}
                  className="text-[rgb(79, 81, 93)] text-sm leading-7"
                >
                  {settings?.contactDetails?.location?.formattedAddress}
                </Link>
              ) : (
                ''
              )}
            </div>
            <div className="col-span-full pt-6 md:col-span-1 md:pt-0">
              <div className="text-[rgb(191 187 199)] mb-4 text-3xl">
                <MobileIconNew className="mx-auto" />
              </div>
              <h3 className="mb-3 text-base font-bold">
                {t('contact-us-phone-title')}
              </h3>
              {settings?.contactDetails?.contact ? (
                <Link
                  href={`tel:${settings?.contactDetails?.contact}`}
                  className="text-[rgb(79, 81, 93)] text-sm leading-7"
                >
                  {settings?.contactDetails?.contact}
                </Link>
              ) : (
                ''
              )}
            </div>
            <div className="col-span-full pt-6 md:col-span-1 md:pt-0">
              <div className="text-[rgb(191 187 199)] mb-4 text-3xl">
                <HomeIconNew className="mx-auto" />
              </div>
              <h3 className="mb-3 text-base font-bold">
                {t('contact-us-site-title')}
              </h3>
              {settings?.contactDetails?.website ? (
                <Link
                  target="_blank"
                  href={settings?.contactDetails?.website}
                  className="text-[rgb(79, 81, 93)] text-sm leading-7"
                >
                  {settings?.contactDetails?.website}
                </Link>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </Scrollbar>
    </>
  );
};

export default MoreInfo;
