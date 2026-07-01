import createMiddleware from "next-intl/middleware";
import {routing} from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match pages, but skip API/internal/static files like `/tr/resume.pdf`.
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
