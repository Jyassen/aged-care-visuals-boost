import { pad2, type Remaining } from "@/funnels/countdown";

function ClockChip({ value, label }: { value: string; label: string }) {
  return (
    <div className="min-w-[3.15rem] rounded-lg bg-slate-950 px-2 py-1 text-center">
      <div className="font-bold tabular-nums leading-none text-base text-white">{value}</div>
      <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-300">{label}</div>
    </div>
  );
}

export function DeadlineBar({
  line,
  showClock,
  remaining,
}: {
  line: string;
  showClock: boolean;
  remaining: Remaining | null;
}) {
  return (
    <div className="bg-blue-900 text-white" role="region" aria-label="Enrollment timing">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex flex-col lg:flex-row lg:items-center lg:justify-center gap-2.5 lg:gap-4">
        <p className="text-center lg:text-left text-sm sm:text-base font-semibold leading-snug text-amber-200">
          {line}
        </p>
        {showClock && remaining && (
          <div className="flex items-center justify-center gap-1.5" aria-hidden="true">
            <ClockChip value={pad2(remaining.days)} label="days" />
            <ClockChip value={pad2(remaining.hours)} label="hrs" />
            <ClockChip value={pad2(remaining.minutes)} label="min" />
            <ClockChip value={pad2(remaining.seconds)} label="sec" />
          </div>
        )}
        <a
          href="#book"
          className="inline-flex items-center justify-center self-center rounded-full bg-amber-400 px-5 py-2 text-sm font-bold text-slate-900 hover:bg-amber-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200"
        >
          Book a Review
        </a>
      </div>
    </div>
  );
}
