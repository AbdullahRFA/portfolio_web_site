import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Define our protected routes
  const isAdminPath = path.startsWith('/admin');
  const isLoginPath = path === '/admin/login';
  
  // Check for the authentication cookie
  const isAuthenticated = request.cookies.get('admin_auth')?.value === 'true';

  // If user is trying to access ANY admin route (except login) and is NOT authenticated
  if (isAdminPath && !isLoginPath && !isAuthenticated) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // If user is already authenticated and tries to visit the login page, send them to the dashboard
  if (isLoginPath && isAuthenticated) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Bulletproof matcher: Catches the exact /admin route AND any nested /admin/... routes
  matcher: ['/admin', '/admin/:path*'],
};