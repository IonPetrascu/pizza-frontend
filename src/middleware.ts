// import createMiddleware from 'next-intl/middleware';
// import { routing } from './i18n/routing';

// export default createMiddleware(routing);

// export const config = {
//     // Match only internationalized pathnames
//     matcher: ['/', '/(ro|en)/:path*']
// };

import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest } from "next/server";

console.log("Middleware загружен"); // Добавляем лог

const middleware = createMiddleware(routing);

export default function handler(req: NextRequest) {
  console.log("Middleware вызван для:", req.nextUrl.pathname);
  return middleware(req);
}

export const config = {
  matcher: ["/", "/(ro|en)/:path*"],
};
