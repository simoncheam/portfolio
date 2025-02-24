import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // You can keep basic middleware functionality here if needed
  // For example, rate limiting, logging, etc.
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/sendMessage(.*)'  // Only match the API routes you need to protect
  ]
};
