import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) return supabaseResponse

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        // Write updated cookies onto the request so downstream
        // server components see the refreshed session immediately.
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        )
        // Reconstruct the response so it carries the same request
        // object with the freshly-written cookies.
        supabaseResponse = NextResponse.next({ request })
        // Copy every refreshed cookie onto the outgoing response
        // so the browser receives the updated token.
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        )
      },
    },
  })

  // IMPORTANT: do not add any logic between createServerClient and
  // supabase.auth.getUser(). A subtle bug can cause session tokens
  // to be refreshed in the wrong order, leading to random sign-outs.
  const { data: { user } } = await supabase.auth.getUser()

  // Redirect authenticated users away from the marketing homepage
  // to their app home. Done here in middleware so it fires before
  // any rendering, eliminating the flash that occurs when the redirect
  // happens inside a server component after the Suspense fallback paints.
  if (user && request.nextUrl.pathname === '/') {
    const learnUrl = request.nextUrl.clone()
    learnUrl.pathname = '/learn'
    return NextResponse.redirect(learnUrl)
  }

  // IMPORTANT: return supabaseResponse, not NextResponse.next(),
  // so the updated Set-Cookie headers are forwarded to the browser.
  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static files and images.
     * The session refresh must run on every navigable route.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
