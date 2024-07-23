import MaintenanceMode from '@/components/maintenance';
import { useModalAction } from '@/components/modal-views/context';
import ErrorMessage from '@/components/ui/error-message';
import Spinner from '@/components/ui/loader/spinner/spinner';
import {
  adminOnly,
  getAuthCredentials,
  hasAccess,
} from '@/data/client/token.utils';
import { useSettings } from '@/data/settings';
import {
  checkIsMaintenanceModeComing,
  checkIsMaintenanceModeStart,
  NEWSLETTER_POPUP_MODAL_KEY,
} from '@/lib/constants';
import { eachDayOfInterval, isTomorrow } from 'date-fns';
import { useAtom } from 'jotai';
import Cookies from 'js-cookie';
import { useCallback, useEffect, useMemo } from 'react';

type MaintenanceProps = {
  children: React.ReactNode;
};

export const isInArray = (array: Date[], value: Date) => {
  return !!array?.find((item) => {
    return item?.getDate() == value?.getDate();
  });
};

const Maintenance = ({ children }: MaintenanceProps) => {
  const { settings, isLoading: settingLoading, error } = useSettings();
  const [_, setUnderMaintenanceIsComing] = useAtom(
    checkIsMaintenanceModeComing,
  );
  const [underMaintenanceStart, setUnderMaintenanceStart] = useAtom(
    checkIsMaintenanceModeStart,
  );

  const { permissions } = getAuthCredentials();
  const AccessAdminRoles = hasAccess(adminOnly, permissions);
  const { openModal } = useModalAction();

  // Use useMemo to avoid recomputing the date interval on every render
  const dateInterVal = useMemo(() => {
    if (settings?.maintenance?.start && settings?.maintenance?.until) {
      return eachDayOfInterval({
        start: new Date(settings?.maintenance?.start),
        end: new Date(settings?.maintenance?.until),
      });
    }
    return [];
  }, [settings?.maintenance?.start, settings?.maintenance?.until]);

  // Use useCallback to avoid creating new functions on every render
  const handleMaintenanceCheck = useCallback(() => {
    if (dateInterVal.length > 0) {
      const beforeDay = isTomorrow(
        new Date(settings?.maintenance?.start as string),
      );
      const checkIsMaintenance = beforeDay && settings?.isUnderMaintenance;
      const checkIsMaintenanceStart =
        isInArray(dateInterVal, new Date()) && settings?.isUnderMaintenance;
      setUnderMaintenanceStart(checkIsMaintenanceStart);
      setUnderMaintenanceIsComing(checkIsMaintenance);
    }
  }, [
    dateInterVal,
    settings?.isUnderMaintenance,
    settings?.maintenance?.start,
  ]);

  // Use useEffect to run the maintenance check only once
  useEffect(() => {
    handleMaintenanceCheck();
  }, [handleMaintenanceCheck]);

  let seenPopup = Cookies.get(NEWSLETTER_POPUP_MODAL_KEY);

  // Use useCallback to avoid creating new functions on every render
  const handlePromoPopup = useCallback(() => {
    if (
      Boolean(settings?.isPromoPopUp) &&
      !underMaintenanceStart &&
      !AccessAdminRoles &&
      !Boolean(seenPopup)
    ) {
      let timer = setTimeout(
        () =>
          openModal('PROMO_POPUP_MODAL', {
            isLoading: settingLoading,
            popupData: settings?.promoPopup,
          }),
        Number(settings?.promoPopup?.popUpDelay),
      );
      return () => clearTimeout(timer);
    }
  }, [
    settings?.isPromoPopUp,
    settings?.promoPopup?.popUpDelay,
    underMaintenanceStart,
    AccessAdminRoles,
    settingLoading,
    seenPopup,
  ]);

  // Use useEffect to run the promo popup only once
  useEffect(() => {
    handlePromoPopup();
  }, [handlePromoPopup]);

  if (settingLoading) {
    return <Spinner />;
  }

  if (error) return <ErrorMessage message={error.message} />;

  if (underMaintenanceStart && !AccessAdminRoles) {
    return <MaintenanceMode />;
  }

  return <>{children}</>;
};

export default Maintenance;
