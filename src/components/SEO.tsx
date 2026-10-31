import { useEffect } from "react";

type SEOProps = {
  title: string;
  /** Link-preview title. Falls back to the browser title. */
  ogTitle?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogImageAlt?: string;
};

function setMeta(selector: string, create: () => HTMLMetaElement, content: string) {
  let meta = document.querySelector(selector) as HTMLMetaElement | null;
  if (!meta) {
    meta = create();
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
}

export default function SEO({ title, ogTitle, description, canonical, ogImage, ogImageAlt }: SEOProps) {
  useEffect(() => {
    const defaultOgImage = 'https://yourmedguy.com/og-image.jpg';
    const imageUrl = ogImage || defaultOgImage;

    if (title) {
      document.title = title;
      const previewTitle = ogTitle || title;
      setMeta('meta[property="og:title"]', () => {
        const meta = document.createElement("meta");
        meta.setAttribute("property", "og:title");
        return meta;
      }, previewTitle);
      setMeta('meta[name="twitter:title"]', () => {
        const meta = document.createElement("meta");
        meta.setAttribute("name", "twitter:title");
        return meta;
      }, previewTitle);
    }

    if (typeof description === 'string') {
      let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', description);

      // Update OG description
      let ogDesc = document.querySelector('meta[property="og:description"]') as HTMLMetaElement | null;
      if (!ogDesc) {
        ogDesc = document.createElement('meta');
        ogDesc.setAttribute('property', 'og:description');
        document.head.appendChild(ogDesc);
      }
      ogDesc.setAttribute('content', description);

      // Update Twitter description
      let twitterDesc = document.querySelector('meta[name="twitter:description"]') as HTMLMetaElement | null;
      if (!twitterDesc) {
        twitterDesc = document.createElement('meta');
        twitterDesc.setAttribute('name', 'twitter:description');
        document.head.appendChild(twitterDesc);
      }
      twitterDesc.setAttribute('content', description);
    }

    if (canonical) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonical);

      // Update OG URL
      let ogUrl = document.querySelector('meta[property="og:url"]') as HTMLMetaElement | null;
      if (!ogUrl) {
        ogUrl = document.createElement('meta');
        ogUrl.setAttribute('property', 'og:url');
        document.head.appendChild(ogUrl);
      }
      ogUrl.setAttribute('content', canonical);
    }

    // Update OG Image
    let ogImageMeta = document.querySelector('meta[property="og:image"]') as HTMLMetaElement | null;
    if (!ogImageMeta) {
      ogImageMeta = document.createElement('meta');
      ogImageMeta.setAttribute('property', 'og:image');
      document.head.appendChild(ogImageMeta);
    }
    ogImageMeta.setAttribute('content', imageUrl);

    setMeta('meta[name="twitter:image"]', () => {
      const meta = document.createElement("meta");
      meta.setAttribute("name", "twitter:image");
      return meta;
    }, imageUrl);

    if (ogImageAlt) {
      setMeta('meta[property="og:image:alt"]', () => {
        const meta = document.createElement("meta");
        meta.setAttribute("property", "og:image:alt");
        return meta;
      }, ogImageAlt);
    }
  }, [title, ogTitle, description, canonical, ogImage, ogImageAlt]);

  return null;
}


