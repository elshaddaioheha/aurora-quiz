'use client';

import { useCallback, useMemo } from 'react';
import { useRouter as useNextRouter } from 'next/navigation';

export function useRouter() {
  const nextRouter = useNextRouter();

  const push = useCallback(
    (href: string) => {
      nextRouter.push(href);
    },
    [nextRouter],
  );

  const replace = useCallback(
    (href: string) => {
      nextRouter.replace(href);
    },
    [nextRouter],
  );

  const back = useCallback(() => {
    nextRouter.back();
  }, [nextRouter]);

  return useMemo(
    () => ({
      push,
      replace,
      back,
    }),
    [push, replace, back],
  );
}
