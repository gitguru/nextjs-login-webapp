import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from "next-auth/jwt"

const publicPages = [
  // '/api/auth/signin',
  // '/api/auth/sigout',
  // '/api/auth/_log',
  // '/api/auth/session',
  // '/api/auth/providers',
  // '/api/auth/callback/credentials',
  // '/api/auth/error',
  '/api/auth/',
  '/ayuda', 
  '/contacto'
]

const checkIsPublicPage = (pathname: string) => {
  // edge case
  if (pathname === '/') {
    console.log('isPublicPage?', pathname, ' -> ', true)
    return true
  }
  const subArr = publicPages.some(str => pathname.startsWith(str))
  console.log('isPublicPage?', pathname, ' -> ', subArr)
  return subArr
}

export async function middleware(request: NextRequest) {
  console.log('---...middleware...---');
  const token = await getToken({ req: request })
  console.log("JSON Web Token", token)

  const res = NextResponse.next()
  const isPublicPath = checkIsPublicPage(request.nextUrl.pathname)
  
  if (token && isPublicPath) {
    return NextResponse.next()  
  }

  if (!token) {
    if (isPublicPath) {
      return res
    } else {
      // the user is not logged in, redirect to the sign-in page
      const signInPage = '/api/auth/signin';
      const signInUrl = new URL(signInPage, request.nextUrl.origin);
      signInUrl.searchParams.append('callbackUrl', request.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  return res
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|.*\\.png$).*)'],
}