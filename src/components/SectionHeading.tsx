type SectionHeadingProps = {
  kicker: string;
  title: string;
  lede?: string;
  /** Center the block (default left). */
  center?: boolean;
  /** Render on the dark ink ground. */
  onDark?: boolean;
};

/** Shared section heading so every band on the page shares one rhythm. */
const SectionHeading = ({ kicker, title, lede, center = false, onDark = false }: SectionHeadingProps) => (
  <div className={`max-w-[640px] ${center ? "mx-auto text-center" : ""} mb-8 sm:mb-10`}>
    <span className={`block text-[13px] font-bold uppercase tracking-[0.04em] mb-2.5 ${onDark ? "text-amber-light" : "text-brandblue"}`}>
      {kicker}
    </span>
    <h2 className={`text-[1.75rem] sm:text-[2.125rem] font-extrabold leading-[1.08] tracking-[-0.03em] ${onDark ? "text-white" : "text-ink"}`}>
      {title}
    </h2>
    {lede && (
      <p className={`mt-3 text-base sm:text-[17px] leading-relaxed ${onDark ? "text-[#B9C4D6]" : "text-mute"}`}>
        {lede}
      </p>
    )}
  </div>
);

export default SectionHeading;
