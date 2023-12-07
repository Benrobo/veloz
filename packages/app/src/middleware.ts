import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import env from "./pages/api/config/env";

export default authMiddleware({
  publicRoutes: ["/api/(.*)", "/", "/auth", "/api/webhook/(.*)"],
  afterAuth: (auth, req, evt) => {
    // handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api)(.*)"],
};
