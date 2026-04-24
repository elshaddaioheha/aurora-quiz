'use client';

import { useEffect } from 'react';

const CAL_BOOKING_SUCCESS_KEY = 'aurora-recovery-cal-booking-success';

export default function CalBookingSuccessPage() {
  useEffect(() => {
    window.localStorage.setItem(CAL_BOOKING_SUCCESS_KEY, '1');
  }, []);

  return <main className="min-h-screen bg-background" aria-hidden="true" />;
}
