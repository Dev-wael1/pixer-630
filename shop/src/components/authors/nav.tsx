import Link from 'next/link';
import { useRouter } from 'next/router';
import routes from '@/config/routes';
import cn from 'classnames';
import { useTranslation } from 'next-i18next';
import { useSettings } from '@/data/settings';

type NavProps = {
  slug: string;
};

const Nav: React.FC<NavProps> = ({ slug }) => {
  const { asPath } = useRouter();
  const { t } = useTranslation('common');
  const { settings } = useSettings();

  return (
    <div className="relative z-10 -mt-[33px] space-x-6 px-4 text-center text-13px rtl:space-x-reverse lg:space-x-8">
      <Link
        className={cn(
          'relative cursor-pointer pb-3.5 before:absolute before:left-0 before:bottom-0 before:h-0.5 before:bg-dark-400 before:transition-all before:duration-300 before:ease-in-out hover:text-dark-100 dark:before:bg-light-400 dark:hover:text-light',
          routes.shopUrl(slug) === asPath
            ? 'font-semibold text-dark-100 before:w-full dark:text-light'
            : 'text-dark-400 before:w-0 dark:text-light-800'
        )}
        href={routes.shopUrl(slug)}
      >
        {t('text-products')}
      </Link>
      <Link
        className={cn(
          'relative cursor-pointer pb-3.5 before:absolute before:left-0 before:bottom-0 before:h-0.5 before:bg-dark-400 before:transition-all before:duration-300 before:ease-in-out hover:text-dark-100 dark:before:bg-light-400 dark:hover:text-light',
          `${routes.shopUrl(slug)}/about` === asPath
            ? 'font-semibold text-dark-100 before:w-full dark:text-light'
            : 'text-dark-400 before:w-0 dark:text-light-800'
        )}
        href={`${routes.shopUrl(slug)}/about`}
      >
        {t('text-about')}
      </Link>
      <Link
        className={cn(
          'relative cursor-pointer pb-3.5 before:absolute before:left-0 before:bottom-0 before:h-0.5 before:bg-dark-400 before:transition-all before:duration-300 before:ease-in-out hover:text-dark-100 dark:before:bg-light-400 dark:hover:text-light',
          `${routes.shopUrl(slug)}/help` === asPath
            ? 'font-semibold text-dark-100 before:w-full dark:text-light'
            : 'text-dark-400 before:w-0 dark:text-light-800'
        )}
        href={`${routes.shopUrl(slug)}/help`}
      >
        {t('text-help')}
      </Link>
      <Link
        className={cn(
          'relative cursor-pointer pb-3.5 before:absolute before:left-0 before:bottom-0 before:h-0.5 before:bg-dark-400 before:transition-all before:duration-300 before:ease-in-out hover:text-dark-100 dark:before:bg-light-400 dark:hover:text-light',
          `${routes.shopUrl(slug)}/contact-us` === asPath
            ? 'font-semibold text-dark-100 before:w-full dark:text-light'
            : 'text-dark-400 before:w-0 dark:text-light-800'
        )}
        href={`${routes.shopUrl(slug)}/contact-us`}
      >
        {t('text-contact-us')}
      </Link>
      {settings?.enableTerms ? (
        <Link
          className={cn(
            'relative cursor-pointer pb-3.5 before:absolute before:left-0 before:bottom-0 before:h-0.5 before:bg-dark-400 before:transition-all before:duration-300 before:ease-in-out hover:text-dark-100 dark:before:bg-light-400 dark:hover:text-light',
            `${routes.shopUrl(slug)}/terms` === asPath
              ? 'font-semibold text-dark-100 before:w-full dark:text-light'
              : 'text-dark-400 before:w-0 dark:text-light-800'
          )}
          href={`${routes.shopUrl(slug)}/terms`}
        >
          {t('text-terms')}
        </Link>
      ) : (
        ''
      )}
    </div>
  );
};

export default Nav;
