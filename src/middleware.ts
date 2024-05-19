import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserMeLoader } from "@/services/get-user-me-loader";
import { use } from "react";

export async function middleware(request: NextRequest) {
  const user = await getUserMeLoader();
  const currentPath = request.nextUrl.pathname;

  if (currentPath.startsWith("/sign/in") && user.ok === true) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  else if (currentPath.startsWith("/sign/up") && user.ok === true) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}