import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

// Runs on every matched request to refresh the Supabase auth session.
//
// Without this, the admin access token (a ~1 hour JWT) expires and is never
// refreshed on the server, so the admin gets bounced back to the login page
// roughly every hour. Refreshing the token here and writing the rotated cookies
// back onto the response keeps the session alive across navigations.
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Touching getUser() is what triggers the token refresh + cookie rotation.
  // Do not run other logic between creating the client and this call.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Belt-and-suspenders: keep unauthenticated visitors out of /admin (the login
  // page itself stays public). Pages also check this, but doing it here avoids
  // a flash of the admin shell before the redirect.
  if (
    !user &&
    request.nextUrl.pathname.startsWith('/admin') &&
    request.nextUrl.pathname !== '/admin/login'
  ) {
    const url = request.nextUrl.clone();
    url.pathname = '/admin/login';
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except static assets and image files, so the
     * session cookie is refreshed on normal page navigations.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf)$).*)',
  ],
};
