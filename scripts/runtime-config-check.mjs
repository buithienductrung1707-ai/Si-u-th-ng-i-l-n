const isProduction =
  process.env.RUNTIME_CONFIG_ENV === "production" ||
  process.env.NODE_ENV === "production";

if (!isProduction) {
  console.log(
    "Runtime production config check skipped (non-production environment).",
  );
  process.exit(0);
}

const errors = [];

for (const name of ["STORE_CORS", "ADMIN_CORS", "AUTH_CORS"]) {
  const origins = (process.env[name] || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (!origins.length || origins.includes("*")) {
    errors.push(`${name} must contain explicit origins`);
    continue;
  }

  for (const origin of origins) {
    try {
      if (new URL(origin).protocol !== "https:") {
        errors.push(`${name} must use HTTPS in production`);
      }
    } catch {
      errors.push(`${name} contains an invalid origin`);
    }
  }
}

for (const name of ["JWT_SECRET", "COOKIE_SECRET"]) {
  if (!process.env[name] || process.env[name].length < 32) {
    errors.push(`${name} must be at least 32 characters`);
  }
}

if (process.env.VNPAY_ENABLED === "true") {
  errors.push(
    "VNPAY_ENABLED must remain false until merchant onboarding and sandbox approval are complete",
  );
}

if (process.env.SEPAY_ENABLED === "true") {
  for (const name of [
    "SEPAY_WEBHOOK_SECRET",
    "SEPAY_BANK_ACCOUNT",
    "SEPAY_BANK_NAME",
    "SEPAY_ACCOUNT_NAME",
    "SEPAY_QR_URL_TEMPLATE",
  ]) {
    if (!process.env[name]) {
      errors.push(`${name} is required when SePay is enabled`);
    }
  }
}

if (errors.length) {
  console.error(
    `Runtime production config check failed (${errors.length} issue(s)).`,
  );
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  "Runtime production config check passed without exposing secret values.",
);
