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

  // Определяем локаль из URL
  const localeMatch = req.nextUrl.pathname.match(/^\/(en|ro)(\/.*)?/);
  const locale = localeMatch ? localeMatch[1] : null;
  const pathname = localeMatch ? localeMatch[2] || "/" : req.nextUrl.pathname;

  // Добавьте кастомную обработку редиректов
  if (!locale) {
    return NextResponse.redirect(new URL(`/en${pathname}`, req.url));
  }

  return res;
}

export const config = {
  matcher: ["/", "/(en|ro)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
