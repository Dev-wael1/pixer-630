import { useEffect } from 'react';
import throttle from 'lodash/throttle';
import { checkIsScrollingStart } from '@/lib/constants';
import { useAtom } from 'jotai';

export function useSwapBodyClassOnScrollDirection(offset = 80) {
  const scrollUp = 'scroll-up';
  const scrollDown = 'scroll-down';
  const [_, setUnderMaintenanceStart] = useAtom(checkIsScrollingStart);
  useEffect(() => {
    const body = document.body;
    let lastScroll = offset;
    const handleScroll = () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll <= offset) {
        body.classList.remove(scrollUp);
        setUnderMaintenanceStart(false);
        return;
      }
      if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) {
        // down
        body.classList.remove(scrollUp);
        body.classList.add(scrollDown);
        setUnderMaintenanceStart(true);
      } else if (
        currentScroll < lastScroll &&
        body.classList.contains(scrollDown)
      ) {
        // up
        body.classList.remove(scrollDown);
        body.classList.add(scrollUp);
        setUnderMaintenanceStart(true);
      }
      lastScroll = currentScroll;
    };
    document.addEventListener('scroll', throttle(handleScroll, 100));
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);
  useEffect(() => {
    function initFunction() {
      const body = document.body;
      if (body.classList.contains(scrollDown)) {
        body.classList.remove(scrollDown);
      }
    }
    initFunction();
  }, []);
}
