import { useState } from "react";
import { Phone, X, CalendarClock } from "lucide-react";

/**
 * Slim urgency bar for the Medicare Annual Enrollment Period (Oct 15 – Dec 7).
 * Deliberately avoids a plan-year number so it never contradicts stale copy
 * elsewhere on the site. Update the window text once per season if needed.
 */
const AnnouncementBar = () => {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-center gap-3 py-2 text-center">
          <CalendarClock className="hidden sm:block h-5 w-5 text-amber-300 flex-shrink-0" />
          <p className="text-sm sm:text-base leading-snug">
            <span className="font-semibold text-amber-300">Annual Enrollment: Oct 15 – Dec 7.</span>{" "}
            <span className="text-blue-100">Book your free review before the deadline —</span>{" "}
            <a
              href="tel:888-355-1085"
              className="font-semibold underline decoration-amber-300/60 underline-offset-2 hover:text-amber-200 inline-flex items-center"
            >
              <Phone className="h-4 w-4 mr-1" />
              888-355-1085
            </a>
          </p>
          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss announcement"
            className="absolute right-0 p-1 rounded hover:bg-white/10 transition-colors"
          >
            <X className="h-4 w-4 text-blue-200" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
