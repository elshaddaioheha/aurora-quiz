'use client';

import { useEffect, useState } from 'react';
import { useRouter } from '@/lib/router';

const CAL_BOOKING_SUCCESS_KEY = 'aurora-recovery-cal-booking-success';
const THANK_YOU_PATH = '/quiz/thank-you';

export function useCalBookingHandoff(namespace: string) {
  const router = useRouter();
  const [successRedirectUrl] = useState(() =>
    typeof window === 'undefined' ? '' : `${window.location.origin}/quiz/cal-booking-success`
  );

  useEffect(() => {
    const handleClose = () => {
      if (window.localStorage.getItem(CAL_BOOKING_SUCCESS_KEY) !== '1') {
        return;
      }

      window.localStorage.removeItem(CAL_BOOKING_SUCCESS_KEY);
      router.replace(THANK_YOU_PATH);
    };

    window.addEventListener(`CAL:${namespace}:__closeIframe`, handleClose as EventListener);

    return () => {
      window.removeEventListener(`CAL:${namespace}:__closeIframe`, handleClose as EventListener);
    };
  }, [namespace, router]);

  return successRedirectUrl;
}
