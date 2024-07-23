import { CloseIcon } from '@/components/icons/close-icon';
import { Dialog } from '@/components/ui/dialog';
import { Transition } from '@/components/ui/transition';
import { getDirection } from '@/lib/constants';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import { Fragment, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';

const Modal = ({
  children,
  className,
  closeClassName,
  showCloseIcon = true,
  open,
  onClose,
}: {
  children: React.ReactNode;
  className?: string;
  closeClassName?: string;
  showCloseIcon?: boolean;
  open: boolean;
  onClose: () => void;
}) => {
  const router = useRouter();
  useEffect(() => {
    // close search modal when route change
    router.events.on('routeChangeStart', onClose);
    return () => {
      router.events.off('routeChangeStart', onClose);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { locale } = router;
  const dir = getDirection(locale);
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className={twMerge(
          classNames(
            'fixed inset-0 z-50 overflow-y-auto overflow-x-hidden xs:p-4',
            className,
          ),
        )}
        onClose={onClose}
        dir={dir}
      >
        <div className="min-h-screen text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 z-40 cursor-pointer bg-dark bg-opacity-60 backdrop-blur dark:bg-opacity-80" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-110"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-110"
          >
            <div className="relative z-50 inline-block min-h-screen w-full transform overflow-hidden text-start align-middle transition-all xs:min-h-[auto] xs:w-auto">
              <div className="relative flex min-h-screen items-center overflow-hidden xs:block xs:min-h-[auto] xs:rounded-md">
                {showCloseIcon ? (
                  <button
                    onClick={onClose}
                    aria-label="Close panel"
                    className={twMerge(
                      'absolute top-5 z-10 text-dark-900 outline-none transition-all hover:text-dark focus-visible:outline-none ltr:right-4 rtl:left-4 dark:text-dark-800 hover:dark:text-light-200 md:top-6 ltr:md:right-5 rtl:md:left-5 lg:top-7 ltr:lg:right-7 rtl:lg:left-7',
                      closeClassName,
                    )}
                  >
                    <CloseIcon className="h-4 w-4 focus-visible:outline-none lg:h-[18px] lg:w-[18px] 3xl:h-5 3xl:w-5" />
                  </button>
                ) : (
                  ''
                )}
                <div className="h-full w-full">{children}</div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
