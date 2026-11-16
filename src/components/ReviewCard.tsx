/**
 * The hero visual: what a 15-minute review covers. Clearly labelled as an
 * example. No savings figures or switch recommendations appear here, by
 * design (compliance). Names are illustrative.
 */
const lines: { label: string; status: string; tone: "ok" | "warn" }[] = [
  { label: "Dr. Patel, cardiology", status: "In network", tone: "ok" },
  { label: "Dr. Okafor, primary care", status: "In network", tone: "ok" },
  { label: "Eliquis · Tier 3 on current plan", status: "Tier 2 available", tone: "warn" },
  { label: "Dental & vision allowance", status: "Included", tone: "ok" },
];

const toneClass = {
  ok: "bg-[#E3F3EA] text-[#1F7A4D]",
  warn: "bg-[#FBEFD6] text-[#8A5A00]",
};

const ReviewCard = () => {
  return (
    <div className="relative bg-white rounded-[18px] p-5 sm:p-6 shadow-[0_30px_60px_-40px_rgba(14,31,58,0.45),0_1px_0_rgba(14,31,58,0.06)]">
      <span className="absolute -top-3 right-5 text-[10px] font-mono uppercase tracking-[0.08em] bg-white border border-rule text-mute px-2 py-0.5 rounded-full">
        Example review
      </span>

      <div className="flex items-center gap-3 mb-3.5">
        <img
          src="/images/medium-shot-senior-couple-with-coffee.jpg"
          alt=""
          className="w-11 h-11 rounded-full object-cover object-[50%_25%] flex-shrink-0"
          loading="eager"
          decoding="async"
          width={44}
          height={44}
        />
        <div className="min-w-0">
          <p className="font-bold text-[15px] text-ink leading-tight">Review for Harold &amp; June, Flushing</p>
          <p className="text-[13px] text-mute">Completed in 14 minutes</p>
        </div>
      </div>

      <ul className="divide-y divide-rule border-t border-rule">
        {lines.map((l) => (
          <li key={l.label} className="flex items-center justify-between gap-3 py-3 text-[15px] text-ink">
            <span className="min-w-0">{l.label}</span>
            <span className={`flex-shrink-0 whitespace-nowrap text-xs font-bold px-2.5 py-1 rounded-full ${toneClass[l.tone]}`}>
              {l.status}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-[13px] text-mute leading-snug border-t border-rule pt-3">
        Free, by phone, about 15 minutes. You keep the results whether or not you change plans.
      </p>
    </div>
  );
};

export default ReviewCard;
