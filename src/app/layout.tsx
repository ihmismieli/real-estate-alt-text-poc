import type { Metadata } from 'next';
// import { Geist } from 'next/font/google';
import './globals.css';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/notifications/styles.css';
import Navigation from './components/navigation/navigation';
import { MantineProvider, mantineHtmlProps, createTheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';

//TODO: define font
// {const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// });}

const theme = createTheme({
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
    <html lang="fi" {...mantineHtmlProps}>
      <body>
        <MantineProvider theme={theme}>
          <Notifications />
          <Navigation />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
