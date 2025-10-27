// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const {pathname} = req.nextUrl;
  const isPublicPath = pathname.startsWith('/login') || pathname.startsWith('/signup') || pathname.startsWith('/');


  if ( !isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', req.url))
  }
  if ( isPublicPath && token) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return NextResponse.next()
}

// Tell Nextjs which paths to run middleware on
export const config = {  
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|login|signup).*)'
  ],
}
