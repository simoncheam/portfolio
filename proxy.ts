import { NextResponse } from 'next/server';

export function proxy() {
  // You can keep basic proxy functionality here if needed
  // For example, rate limiting, logging, etc.
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/sendMessage(.*)'  // Only match the API routes you need to protect
  ]
};
