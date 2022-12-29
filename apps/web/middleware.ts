import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const token = req.cookies.get("token");
  const url = req.nextUrl.pathname;

  if (url === "/"){
    if(!token){
      return NextResponse.redirect(req.nextUrl.origin + "/login");
    }
  }

  if (url === "/login"){
    if(token){
      return NextResponse.redirect(req.nextUrl.origin + "/");
    }
  }

  return NextResponse.next();
}
