'use client';

import { Suspense } from 'react'
import { SessionProvider } from 'next-auth/react';

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider><Suspense>{children}</Suspense></SessionProvider>;
}
