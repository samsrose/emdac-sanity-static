// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://8848e688047aad8e84e79c9e8bb8a444@o1408847.ingest.us.sentry.io/4509705743630336",

  tracesSampleRate: 1,

  enableLogs: true,

  debug: false,
});
