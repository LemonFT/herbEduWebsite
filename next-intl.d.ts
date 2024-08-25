// next-intl.d.ts
import { NextConfig } from 'next';

declare function createNextIntlPlugin(i18nPath?: string): (config?: NextConfig) => NextConfig;

// Currently only available via CJS
export = createNextIntlPlugin;
