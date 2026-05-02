import * as Sentry from "@sentry/nextjs";

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;
const isProduction = process.env.NODE_ENV === "production";

/**
 * Session Replay is opt-in: it ships ~70KB of client JS. Set
 * NEXT_PUBLIC_SENTRY_REPLAY=1 to enable it.
 */
const replayEnabled = process.env.NEXT_PUBLIC_SENTRY_REPLAY === "1";

if (dsn) {
  Sentry.init({
    dsn,
    integrations: replayEnabled ? [Sentry.replayIntegration()] : [],
    tracesSampleRate: isProduction ? 0.1 : 1,
    replaysSessionSampleRate: replayEnabled && !isProduction ? 0.1 : 0,
    replaysOnErrorSampleRate: replayEnabled ? 1.0 : 0,
    enableLogs: true,
    debug: false,
  });
}

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
