import * as Sentry from "@sentry/nextjs";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN ?? process.env.SENTRY_DSN;
const isProduction = process.env.NODE_ENV === "production";

if (dsn) {
  Sentry.init({
    dsn,
    tracesSampleRate: isProduction ? 0.1 : 1,
    enableLogs: true,
    debug: false,
  });
}
