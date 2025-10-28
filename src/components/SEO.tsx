import { useEffect } from "react";

type SEOProps = {
  title: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
};

export default function SEO({ title, description, canonical, ogImage }: SEOProps) {
  useEffect(() => {
    const defaultOgImage = 'https://yourmedguy.com/og-image.jpg';
    const imageUrl = ogImage || defaultOgImage;

    if (title) {
      document.title = title;
      
      // Update OG title
      let ogTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement | null;
      if (!ogTitle) {
        ogTitle = document.createElement('meta');
        ogTitle.setAttribute('property', 'og:title');
        document.head.appendChild(ogTitle);
      }
      ogTitle.setAttribute('content', title);

      // Update Twitter title
      let twitterTitle = document.querySelector('meta[name="twitter:title"]') as HTMLMetaElement | null;
      if (!twitterTitle) {
        twitterTitle = document.createElement('meta');
        twitterTitle.setAttribute('name', 'twitter:title');
        document.head.appendChild(twitterTitle);
      }
      twitterTitle.setAttribute('content', title);
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

    // Update Twitter Image
    let twitterImage = document.querySelector('meta[name="twitter:image"]') as HTMLMetaElement | null;
    if (!twitterImage) {
      twitterImage = document.createElement('meta');
      twitterImage.setAttribute('name', 'twitter:image');
      document.head.appendChild(twitterImage);
    }
    twitterImage.setAttribute('content', imageUrl);
  }, [title, description, canonical, ogImage]);

  return null;
}


