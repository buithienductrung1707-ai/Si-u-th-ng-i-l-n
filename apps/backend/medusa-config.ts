import { loadEnv, defineConfig } from "@medusajs/framework/utils";

loadEnv(process.env.NODE_ENV || "development", process.cwd());

const isProduction = process.env.NODE_ENV === "production";

const corsOrigins = (name: string, value: string | undefined) => {
  if (!value) {
    throw new Error(`${name} must be configured`);
  }

  const origins = value
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (!origins.length || origins.includes("*")) {
    throw new Error(`${name} must contain explicit origins, not *`);
  }

  for (const origin of origins) {
    let parsed: URL;

    try {
      parsed = new URL(origin);
    } catch {
      throw new Error(`${name} contains an invalid origin`);
    }

    if (!["http:", "https:"].includes(parsed.protocol)) {
      throw new Error(`${name} contains an unsupported protocol`);
    }

    if (isProduction && parsed.protocol !== "https:") {
      throw new Error(`${name} must use HTTPS in production`);
    }
  }

  return origins.join(",");
};

const requiredProductionSecret = (name: string) => {
  const value = process.env[name];

  if (isProduction && (!value || value.length < 32)) {
    throw new Error(
      `${name} must be a unique secret of at least 32 characters`,
    );
  }

  return value;
};

const storeCors = corsOrigins("STORE_CORS", process.env.STORE_CORS);
const adminCors = corsOrigins("ADMIN_CORS", process.env.ADMIN_CORS);
const authCors = corsOrigins("AUTH_CORS", process.env.AUTH_CORS);

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    http: {
      storeCors,
      adminCors,
      authCors,
      jwtSecret: requiredProductionSecret("JWT_SECRET"),
      cookieSecret: requiredProductionSecret("COOKIE_SECRET"),
    },
  },
});
