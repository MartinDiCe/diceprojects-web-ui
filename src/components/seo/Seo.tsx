import React from 'react';
import { BRAND } from '@/src/app/config/branding.config';

type JsonLd = Record<string, unknown>;

interface SeoProps {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  image?: string;
  jsonLd?: JsonLd | JsonLd[];
}

function setMeta(selector: string, attrs: Record<string, string>) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }
  Object.entries(attrs).forEach(([key, value]) => element?.setAttribute(key, value));
}

function setLink(rel: string, href: string) {
  let element = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.rel = rel;
    document.head.appendChild(element);
  }
  element.href = href;
}

function removeManagedJsonLd() {
  document.head.querySelectorAll('script[data-managed-jsonld="true"]').forEach((node) => node.remove());
}

export function Seo({ title, description, path = '/', keywords = [], image = '/assets/images/og-dice-projects.png', jsonLd }: SeoProps) {
  React.useEffect(() => {
    const url = new URL(path, BRAND.domain).toString();
    const imageUrl = new URL(image, BRAND.domain).toString();
    const fullTitle = title.includes(BRAND.name) ? title : `${title} | ${BRAND.name}`;

    document.title = fullTitle;
    setMeta('meta[name="description"]', { name: 'description', content: description });
    setMeta('meta[name="keywords"]', { name: 'keywords', content: keywords.join(', ') });
    setMeta('meta[name="robots"]', { name: 'robots', content: 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1' });
    setLink('canonical', url);

    setMeta('meta[property="og:type"]', { property: 'og:type', content: 'website' });
    setMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: BRAND.name });
    setMeta('meta[property="og:url"]', { property: 'og:url', content: url });
    setMeta('meta[property="og:title"]', { property: 'og:title', content: fullTitle });
    setMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    setMeta('meta[property="og:image"]', { property: 'og:image', content: imageUrl });

    setMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: fullTitle });
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: description });
    setMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: imageUrl });

    removeManagedJsonLd();
    const blocks = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];
    blocks.forEach((block) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.managedJsonld = 'true';
      script.text = JSON.stringify(block);
      document.head.appendChild(script);
    });

    return removeManagedJsonLd;
  }, [description, image, jsonLd, keywords, path, title]);

  return null;
}

export function organizationJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND.name,
    url: BRAND.domain,
    logo: `${BRAND.domain}/assets/logos/dice-logo-positivo.webp`,
    email: BRAND.contact.email,
    telephone: BRAND.contact.phone,
    sameAs: [BRAND.social.linkedin],
  };
}

export function serviceJsonLd(name: string, description: string, path: string): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: BRAND.name,
      url: BRAND.domain,
    },
    areaServed: ['Argentina', 'Latinoamérica', 'Estados Unidos'],
    serviceType: name,
    url: `${BRAND.domain}${path}`,
  };
}
