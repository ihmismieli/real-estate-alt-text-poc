import type { Metadata } from 'next';
import { Urbanist } from 'next/font/google';
import './globals.css';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/notifications/styles.css';
import Navigation from './components/navigation/navigation';
import { MantineProvider, mantineHtmlProps, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import Footer from './components/footer/footer';

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
          <Navigation />
          {children}
          <Footer />
        </MantineProvider>
      </body>
    </html>
  );
}
