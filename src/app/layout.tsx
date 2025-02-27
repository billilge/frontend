import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import ReactQueryProviders from '@/hooks/useReactQuery';
import '@/utils/service-worker';
import '@/utils/pushNotification';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: '빌릴게',
  manifest: '/manifest.json',
  description: '국민대학교 소프트웨어융합대학 복지물품 대여 서비스',
  icons: {
    icon: '/icons/manifest/favicon.ico',
  },
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProviders>{children}</ReactQueryProviders>
      </body>
    </html>
  );
}
