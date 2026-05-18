'use client';

import { useEffect } from 'react';
import { track } from '@vercel/analytics';

export default function PageViewTracker({ event }: { event: string }) {
  useEffect(() => {
    track(event);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
