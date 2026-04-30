import type { Metadata } from 'next';
// import { Geist } from 'next/font/google';
import './globals.css';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';
import Navigation from './components/navigation/navigation';
import { MantineProvider, mantineHtmlProps } from '@mantine/core';
//TODO: define font
// {const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// });}

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
        <MantineProvider>
          <Navigation />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
