import { auth } from "@/app/lib/auth";
import { matchRoutes } from "@/app/lib/util";
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  apiCronPrefix,
  authRoutes,
  publicRoutes,
} from "@/routes";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const hasCronAuth =
    req.headers.get("Authorization") === `Bearer ${process.env.CRON_SECRET}`;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isApiCronRoute = nextUrl.pathname.startsWith(apiCronPrefix);
  const isPublicRoute = matchRoutes(nextUrl.pathname, publicRoutes);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) return;

  if (isApiCronRoute) {
    if (hasCronAuth) {
      return;
    } else {
      return new Response("Unauthorized", {
        status: 401,
      });
    }
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    } else {
      return;
    }
  }

  if (!isLoggedIn && !isPublicRoute) {
    const redirectTarget = new URL("/login", nextUrl);
    redirectTarget.searchParams.append("callbackUrl", nextUrl.href);
    return NextResponse.redirect(redirectTarget);
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api)(.*)"],
};
