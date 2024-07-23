import SubscriptionWidget from '@/components/common/subscribe-to-newsletter';
import Checkbox from '@/components/ui/forms/checkbox';
import Spinner from '@/components/ui/loader/spinner/spinner';
import Modal from '@/components/modal-views/modal';
import {
  useModalAction,
  useModalState,
} from '@/components/modal-views/context';
import { NEWSLETTER_POPUP_MODAL_KEY } from '@/lib/constants';
import classNames from 'classnames';
import Cookies from 'js-cookie';
import Image from 'next/image';
import { useCallback, useState } from 'react';

const PromoPopup = () => {
  const { closeModal } = useModalAction();
  const [notShowAgain, setNotShowAgain] = useState(false);
  const {
    isOpen,
    data: { isLoading, popupData },
  } = useModalState();

  const closeModalAction = useCallback(() => {
    if (Boolean(notShowAgain)) {
      Cookies.set(NEWSLETTER_POPUP_MODAL_KEY, 'true', {
        expires: Number(popupData?.popUpNotShow?.popUpExpiredIn),
      });
    } else {
      Cookies.set(NEWSLETTER_POPUP_MODAL_KEY, 'true', {
        expires: Number(popupData?.popUpExpiredIn),
      });
    }
    closeModal();
  }, [notShowAgain]);

  return (
    <Modal
      closeClassName="bg-light dark:bg-dark-250 h-10 w-10 rounded-full text-center [&>svg]:m-auto"
      open={isOpen}
      onClose={closeModalAction}
    >
      <div className="w-full overflow-hidden text-dark dark:text-light max-w-4xl rounded-xl bg-light dark:bg-dark-250">
        {isLoading ? (
          <div className="p-6 md:p-12">
            <Spinner className="!h-auto" />
          </div>
        ) : (
          <div className="grid grid-cols-2 items-center">
            <div className="md:col-span-1 order-2 md:order-1 col-span-full p-6 md:p-12">
              {popupData?.title ? (
                <h2 className="text-3xl font-bold mb-4">{popupData?.title}</h2>
              ) : (
                ''
              )}

              {popupData?.description ? (
                <p className="text-lg text-dark/70 dark:text-light/70 leading-[150%]">
                  {popupData?.description}
                </p>
              ) : (
                ''
              )}

              <div className="mt-10">
                <SubscriptionWidget />
              </div>

              {popupData?.isPopUpNotShow ? (
                <div className="mt-12">
                  <Checkbox
                    name="not_show_again"
                    label={popupData?.popUpNotShow?.title}
                    onChange={() => setNotShowAgain(!notShowAgain)}
                    checked={notShowAgain}
                    className="justify-normal"
                  />
                </div>
              ) : (
                ''
              )}
            </div>

            <div
              className={classNames(
                'md:col-span-1 order-1 relative md:order-2 col-span-full bg-gray-50 dark:bg-dark-250 h-72 md:h-[28.125rem]',
              )}
            >
              <Image
                src={popupData?.image?.original}
                alt={popupData?.title}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
                quality={100}
                style={{
                  objectFit: 'contain',
                }}
              />
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default PromoPopup;
