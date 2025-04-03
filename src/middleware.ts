// import createMiddleware from 'next-intl/middleware';
// import { routing } from './i18n/routing';

// export default createMiddleware(routing);

// export const config = {
//     // Match only internationalized pathnames
//     matcher: ['/', '/(ro|en)/:path*']
// };

import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export async function middleware(req: NextRequest) {
  const res = intlMiddleware(req);

  // Проверяем текущий путь
  const { pathname } = req.nextUrl;
  const localeMatch = pathname.match(/^\/(en|ro)(\/.*)?/);
  const currentLocale = localeMatch ? localeMatch[1] : null;

  // Если локаль уже указана, редирект не требуется
  if (currentLocale && routing.locales.includes(currentLocale as "en" | "ro")) {
    console.log("Локаль уже указана:", currentLocale);
    return res;
  }

  // Перенаправление на defaultLocale (en), если локаль отсутствует
  return NextResponse.redirect(new URL(`/en${pathname}`, req.url));
}

export const config = {
  matcher: ["/", "/(ro|en)/:path*"],
};
