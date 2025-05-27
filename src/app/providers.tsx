'use client';

import { ReactNode } from 'react';
import ThemeRegistry from '@/components/ThemeRegistry';

export function Providers({ children }: { children: ReactNode }) {
  return <ThemeRegistry>{children}</ThemeRegistry>;
} 