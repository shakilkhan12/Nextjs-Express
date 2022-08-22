import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest, response: NextResponse) {
    const res = NextResponse.next();
    console.log('res: ', request.headers);
    if(request.url === `${process.env.FRONTEND_BASE_URL}/login`) {

    }
    console.log('env: ', process.env.FRONTEND_BASE_URL)
//   return NextResponse.redirect(new URL('/about-2', request.url))
}