import { 
  clerkMiddleware,
  createRouteMatcher
 } from "@clerk/nextjs/server";


 export default clerkMiddleware((auth, req) => {
  
  if (isProtectedRoute(req)) {
    auth().protect();
  }
});

const isProtectedRoute = createRouteMatcher([
  '/',
  '/teacher/(.*)', //make some pages for admin/teacher or student/customer
]);



export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
  publicRoutes: ['/', '/sign-in(.*)', '/sign-up(.*)'],
};