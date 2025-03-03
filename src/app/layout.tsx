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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* viewport metadata에 추가 했을 시, 경고가 떠서 이쪽에 적었고 head태그를 사용하려면 title도 필요하여 title도 추가하게 되었습니다. */}
        <meta
          name="viewport"
          content="initial-scale=1.0,user-scalable=no,maximum-scale=1,width=device-width"
        />
        <title>빌릴게</title>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ReactQueryProviders>{children}</ReactQueryProviders>
      </body>
    </html>
  );
}
