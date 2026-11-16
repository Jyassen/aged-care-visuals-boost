import { useState } from "react";
import { X, CalendarClock } from "lucide-react";

/**
 * Slim urgency bar for the Medicare Annual Enrollment Period (Oct 15 – Dec 7).
 * Deliberately avoids a plan-year number so it never contradicts stale copy
 * elsewhere on the site. Update the window text once per season if needed.
 */
const AnnouncementBar = () => {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="bg-navy text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-center gap-2.5 py-2 pr-8 text-center">
          <CalendarClock className="hidden sm:block h-4 w-4 text-amber-light flex-shrink-0" />
          <p className="text-[13px] sm:text-sm leading-snug">
            <span className="font-semibold text-amber-light">Annual Enrollment: Oct 15 – Dec 7.</span>{" "}
            <span className="text-white/85">Book your free review before the deadline.</span>
          </p>
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss announcement"
            className="absolute right-0 p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="h-4 w-4 text-white/70" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
