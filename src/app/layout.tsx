import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/notifications/styles.css';
import '@/app/globals.css';
import Navigation from '@/app/components/navigation/navigation';
import { MantineProvider, mantineHtmlProps, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import Footer from '@/app/components/footer/footer';
import { Suspense } from 'react';
import NavigationFallback from '@/app/components/navigation/navigation-fallback';
import navigationStyles from '@/app/components/navigation/navigation.module.css';

const urbanist = Urbanist({
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  fontFamily: urbanist.style.fontFamily,
  components: {
    Badge: {
      defaultProps: {
        color: '#666',
      },
    },
  },
});

export const metadata: Metadata = {
  title: 'Tekstivastineet myyntikuville',
  description:
    'Tällä toteutuksella testataan, miten hyvin tekoäly pystyy tuottamaan tekstivastineita myyntikuville.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fi" {...mantineHtmlProps} className={urbanist.className}>
      <body>
        <MantineProvider theme={theme}>
          <Notifications />
          <Suspense
            fallback={
              <nav className={navigationStyles.nav} aria-label="Navigaatio">
                <NavigationFallback />
              </nav>
            }
          >
            <Navigation />
          </Suspense>
          <main className="pageContent">{children}</main>
          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}
