import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Redirect to the home page
  return NextResponse.redirect(new URL('/home', request.nextUrl))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/middle',
}