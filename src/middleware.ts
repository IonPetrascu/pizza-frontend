// import createMiddleware from 'next-intl/middleware';
// import { routing } from './i18n/routing';

// export default createMiddleware(routing);

// export const config = {
//     // Match only internationalized pathnames
//     matcher: ['/', '/(ro|en)/:path*']
// };

import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Определяем, есть ли уже локаль в пути (en или ro)
  const localeMatch = pathname.match(/^\/(en|ro)(\/.*)?/);
  const currentLocale = localeMatch ? localeMatch[1] : null;

  console.log("Текущий путь:", pathname);
  console.log("Обнаруженная локаль:", currentLocale);

  // Если локаль указана и это поддерживаемая локаль, пропускаем запрос
  if (currentLocale && routing.locales.includes(currentLocale as "en" | "ro")) {
    return NextResponse.next();
  }

  // Если локали нет, перенаправляем на defaultLocale (en) с сохранением пути
  if (!currentLocale) {
    console.log("Перенаправление на defaultLocale: en");
    return NextResponse.redirect(new URL(`/en${pathname}`, req.url));
  }

  // Если путь не соответствует ожидаемому, возвращаем 404
  console.log("Несоответствующий путь:", pathname);
  return NextResponse.redirect(new URL("/en", req.url));
}

export const config = {
  matcher: ["/", "/(en|ro)/:path*"],
};
