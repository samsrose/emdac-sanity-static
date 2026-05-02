"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalRouteError({ error, reset }: ErrorProps) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <main className="grid min-h-[60vh] place-items-center bg-gray-900 px-6 py-16">
      <div className="text-center text-gray-200">
        <h1 className="text-3xl font-bold">Something went wrong</h1>
        <p className="mt-4 text-gray-400">
          An unexpected error occurred. The team has been notified.
        </p>
        {error.digest && (
          <p className="mt-2 text-xs text-gray-500">Error ID: {error.digest}</p>
        )}
        <div className="mt-8 flex items-center justify-center gap-x-4">
          <button
            type="button"
            onClick={reset}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            Try again
          </button>
          <Link
            href="/"
            className="rounded-md bg-gray-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-600"
          >
            Go home
          </Link>
        </div>
      </div>
    </main>
  );
}
