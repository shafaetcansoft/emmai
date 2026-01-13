import { NextRequest, NextResponse } from 'next/server';
import { env } from './env';

export function middleware(req: NextRequest) {
  const host = req.headers.get('host');
  if (!host) return NextResponse.next();

  const hostname = host.split(':')[0];

  // Root domain → normal app
  if (hostname === env.ROOT_DOMAIN) {
    return NextResponse.next();
  }

  // Subdomain handling
  if (hostname.endsWith(`.${env.ROOT_DOMAIN}`)) {
    const subdomain = hostname.replace(`.${env.ROOT_DOMAIN}`, '');
    const url = req.nextUrl.clone();
    url.pathname = `/${subdomain}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|favicon.ico).*)'],
};
