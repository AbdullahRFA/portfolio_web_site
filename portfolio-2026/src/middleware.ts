import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // We manually check the path inside the function instead of using the config matcher
  if (path.startsWith('/admin')) {
    const isLoginPath = path === '/admin/login';
    const isAuthenticated = request.cookies.get('admin_auth')?.value === 'true';

    // 1. If trying to access admin without a cookie -> Send to login
    if (!isLoginPath && !isAuthenticated) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // 2. If trying to access login page while already logged in -> Send to dashboard
    if (isLoginPath && isAuthenticated) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
  }

  // Allow all other routes to pass through normally
  return NextResponse.next();
}

// Notice there is NO `export const config = {...}` down here anymore!