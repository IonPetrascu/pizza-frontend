
import { Nunito_Sans } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ReactNode } from 'react';


const nunitoSans = Nunito_Sans({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '600', '700'],
});

type Props = {
  children: ReactNode;
  locale: string;
};

export default async function BaseLayout({ children, locale }: Props) {
  const messages = await getMessages();

  return (
    <html className="h-full" lang={locale}>
      <body suppressHydrationWarning={true} >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
