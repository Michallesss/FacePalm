import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getUserMeLoader } from "@/services/get-user-me-loader";

export async function middleware(request: NextRequest) {
  const user = await getUserMeLoader();
  const currentPath = request.nextUrl.pathname;

  // console.log("User: ",user); // testing
  // TODO: Automate this (with list of path and type of protection: only for logged in, only for not logged in, etc.)
  if (currentPath.startsWith("/sign") && user.ok) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  if (currentPath.startsWith("/post/create") && !user.ok) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}