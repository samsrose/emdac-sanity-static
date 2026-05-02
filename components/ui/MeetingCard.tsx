import Link from "next/link";
import type { Meeting } from "@/lib/types/sanity";
import { cn } from "@/lib/utils/cn";

interface MeetingCardProps {
  meeting: Meeting;
}

interface MeetingActionProps {
  href: string | undefined;
  label: string;
  position: "left" | "right";
}

export function MeetingCard({ meeting }: MeetingCardProps) {
  return (
    <article
      style={{ minWidth: "450px" }}
      className="rounded-lg bg-gray-800 mb-4 sm:mb-0"
    >
      <div className="sm:m-4 p-4">
        <h3 className="text-3xl font-semibold leading-6 text-gray-200">
          {meeting.title}
        </h3>
        <p className="mt-2 text-xl text-gray-100">{meeting.date}</p>
        {meeting.venue && <p className="mt-2 text-lg text-gray-300">{meeting.venue}</p>}
        {meeting.description && (
          <p className="mt-2 text-sm text-gray-400">{meeting.description}</p>
        )}
      </div>
      <footer>
        <div className="-mt-px flex divide-x divide-gray-400 border-t border-gray-700">
          <MeetingAction
            href={meeting.voucherLink}
            label="Purchase Voucher"
            position="left"
          />
          <MeetingAction href={meeting.venueLink} label="Venue Info" position="right" />
        </div>
      </footer>
    </article>
  );
}

function MeetingAction({ href, label, position }: MeetingActionProps) {
  const enabled = Boolean(href);
  const baseClasses =
    "relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 border border-transparent py-4 text-sm font-semibold transition";
  const positionClasses =
    position === "left" ? "rounded-bl-lg border-r border-gray-700" : "rounded-br-lg";
  const stateClasses = enabled
    ? "bg-gray-800 hover:bg-purple-900 text-gray-400 hover:text-gray-200"
    : "bg-gray-800 text-gray-600 cursor-not-allowed";
  const wrapperClasses = position === "left" ? "flex w-0 flex-1" : "-ml-px flex w-0 flex-1";

  if (!enabled) {
    return (
      <div className={wrapperClasses}>
        <span
          aria-disabled="true"
          className={cn(baseClasses, positionClasses, stateClasses, "-mr-px")}
        >
          {label}
        </span>
      </div>
    );
  }

  return (
    <div className={wrapperClasses}>
      <Link
        href={href ?? "#"}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(baseClasses, positionClasses, stateClasses, "-mr-px")}
      >
        {label}
      </Link>
    </div>
  );
}
