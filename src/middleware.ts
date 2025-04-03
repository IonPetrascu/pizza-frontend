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
    console.log("Локаль поддерживается, продолжаем обработку.");
    return NextResponse.next();
  }

  // Если локали нет, также просто продолжаем выполнение
  if (!currentLocale) {
    console.log("Локаль отсутствует, но мы не перенаправляем.");
    return NextResponse.next();
  }

  // Для всех остальных случаев, также просто продолжаем выполнение
  console.log("Продолжаем выполнение запроса без перенаправления.");
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/(en|ro)/:path*"],
};
