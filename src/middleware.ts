// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value

  // List of paths you want to protect
  const protectedPaths = ['/dashboard','/profile']

  const isProtected = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  )

  // If trying to access protected page without token, redirect to login
  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Otherwise, continue normally
  return NextResponse.next()
}

// Tell Next.js which paths to run middleware on
export const config = {
  matcher: ['/dashboard/:path*','/profile/:path*'], // apply middleware to /dashboard and its subpaths
}
