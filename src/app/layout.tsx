import type { Metadata } from 'next';
// import { Geist } from 'next/font/google';
import './globals.css';
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';

import { MantineProvider, mantineHtmlProps } from '@mantine/core';

//TODO: define font
// {const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin'],
// });}

export const metadata: Metadata = {
  title: 'Real estate alt text POC',
  description: 'A proof of concept for alt text in real estate listings.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fi" {...mantineHtmlProps}>
      <body>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
