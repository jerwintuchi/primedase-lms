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
  '/teacher/(.*)', //for admin/teacher or student/customer pages 
]);



export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
  publicRoutes: ['/sign-in(.*)', '/teacher-sign-up(.*)','/sign-up(.*)', 
  '/landing(.*)','/about','/unauthorized','/student'],
};