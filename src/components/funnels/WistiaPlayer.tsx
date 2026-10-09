import { useEffect } from "react";
import { createElement } from "react";

type WistiaPlayerProps = {
  mediaId: string;
  title: string;
};

export default function WistiaPlayer({ mediaId, title }: WistiaPlayerProps) {
  useEffect(() => {
    const addScript = (src: string, type?: string) => {
      if (document.querySelector(`script[src="${src}"]`)) return;
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      if (type) script.type = type;
      document.head.appendChild(script);
    };

    addScript("https://fast.wistia.com/player.js");
    addScript(`https://fast.wistia.com/embed/${mediaId}.js`, "module");

    const styleId = `wistia-style-${mediaId}`;
    if (!document.getElementById(styleId)) {
      const style = document.createElement("style");
      style.id = styleId;
      style.textContent = `wistia-player[media-id='${mediaId}']:not(:defined){background:center / contain no-repeat url('https://fast.wistia.com/embed/medias/${mediaId}/swatch');display:block;filter:blur(5px);padding-top:56.25%;}`;
      document.head.appendChild(style);
    }
  }, [mediaId]);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-xl aspect-video">
      {createElement("wistia-player", {
        "media-id": mediaId,
        aspect: "1.7777777777777777",
        title,
        style: { display: "block", width: "100%", height: "100%" },
      })}
    </div>
  );
}
