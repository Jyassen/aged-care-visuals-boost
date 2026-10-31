import { useEffect } from "react";

const CALENDAR_ID = "ibaQbJ1LYYto0Ohe1dLG";
const EMBED_SRC = "https://link.msgsndr.com/js/form_embed.js";

export default function GhlCalendar() {
  useEffect(() => {
    if (document.querySelector(`script[src="${EMBED_SRC}"]`)) return;
    const script = document.createElement("script");
    script.src = EMBED_SRC;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <iframe
      src={`https://api.leadconnectorhq.com/widget/booking/${CALENDAR_ID}`}
      title="Book a free consultation"
      scrolling="no"
      id={`${CALENDAR_ID}_booking`}
      className="w-full border-0 min-h-[820px]"
    />
  );
}
