import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";



export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  if (url.pathname === '/vi' || url.pathname === '/en') {
    url.pathname = `${url.pathname}/register`;
    return NextResponse.redirect(url);
  }

  console.log(request.cookies.get('NEXT_LOCALE'))

  const defaultLocale = request.headers.get('x-your-custom-locale') ?? 'en';

  const handleI18nRouting = createMiddleware({
    locales: ['en', 'vi'],
    defaultLocale: 'en'
  });

  const response = handleI18nRouting(request);

  response.headers.set('x-your-custom-locale', defaultLocale);

  return response;
}

export const config = {
  matcher: ['/', '/(vi|en)/:path*']
};