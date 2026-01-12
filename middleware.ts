import { NextRequest, NextResponse } from 'next/server';
import { env } from '@/env';

export function middleware(req: NextRequest) {
  const host = req.headers.get('host') ?? '';
  const hostname = host.split(':')[0];
  const url = req.nextUrl;

  if (hostname === env.ROOT_DOMAIN) {
    return NextResponse.next();
  }

  if (hostname.endsWith(`.${env.ROOT_DOMAIN}`)) {
    const subdomain = hostname.replace(`.${env.ROOT_DOMAIN}`, '');
    url.pathname = `/${subdomain}${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico).*)'],
};
