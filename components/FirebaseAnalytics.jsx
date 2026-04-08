'use client';

import { useEffect } from 'react';
import { initFirebaseAnalytics } from '../lib/firebase';

export default function FirebaseAnalytics() {
  useEffect(() => {
    initFirebaseAnalytics();
  }, []);

  return null;
}
