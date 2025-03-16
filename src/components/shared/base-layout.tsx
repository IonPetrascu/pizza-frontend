
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ReactNode } from 'react';
import { Providers } from '@/components/shared/providers';
import { Montserrat } from "next/font/google"
import '@/app/globals.css';
import Head from 'next/head';

type Props = {
  children: ReactNode;
  locale: string;
};

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "700"],
  variable: "--font-montserrat",
});


export async function BaseLayout({ children, locale }: Props) {
  const messages = await getMessages();

  return (
    <html className="h-full" lang={locale}>
      <Head>
        <link data-rh="true" rel="icon" href="/logo.svg" />
      </Head>
      <body suppressHydrationWarning={true} className={`body ${montserrat.variable}`} >
        <Providers>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
