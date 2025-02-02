import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

// Import db
import { db } from "@/db";
import * as schema from "@/db/schema";

// Import types
import { Env } from "@/types/common";

export function configureAuth(env: Env) {
  const providers = ["google"];

  const configuredProviders = providers.reduce<
    Record<string, { clientId: string; clientSecret: string }>
  >((acc, provider) => {
    const id = env[`${provider.toUpperCase()}_CLIENT_ID`];
    const secret = env[`${provider.toUpperCase()}_CLIENT_SECRET`];

    if (id && secret) {
      acc[provider] = { clientId: id, clientSecret: secret };
    }
    return acc;
  }, {});

  const isProduction = env.NODE_ENV === "production";
  const baseURL = isProduction ? env.BETTER_AUTH_URL : "http://localhost:8787";

  return betterAuth({
    baseURL,
    secret: env.BETTER_AUTH_SECRET,
    socialProviders: configuredProviders,
    emailAndPassword: {
      enabled: true,
      autoSignIn: true,
      minPasswordLength: 8,
    },
    user: {
      deleteUser: {
        enabled: true,
      },
    },
    trustedOrigins: [
      "http://localhost:3000",
      env.BETTER_AUTH_URL!,
    ],
    database: drizzleAdapter(db, {
      provider: "pg",
      schema: schema,
    }),
    advanced: {
      cookiePrefix: "rs_", // Optional: Prefix for all cookies
      cookies: isProduction
        ? {
            session_token: {
              name: "session_token",
              attributes: {
                sameSite: "none",
                secure: isProduction,
                httpOnly: true,
                path: "/",
              },
            },
          }
        : undefined,
      crossSubDomainCookies: isProduction
        ? {
            enabled: isProduction,
            domain: "yourdomain.com",
          }
        : undefined,
      useSecureCookies: isProduction,
    },
  });
}

// Explicitly export user and session types for use in other files
export type { User as AuthUser, Session as AuthSession } from "better-auth";
