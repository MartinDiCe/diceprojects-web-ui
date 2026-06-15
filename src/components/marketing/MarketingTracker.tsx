import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackMarketingClick, trackMarketingEvent } from '@/src/lib/marketingCapture';
import { useLanguage } from '@/src/i18n/LanguageContext';

export const MarketingTracker = () => {
  const location = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    void trackMarketingEvent({
      eventType: 'VIEW',
      actionCode: `page:${location.pathname}`,
      actionLabel: document.title,
      category: 'NAVIGATION',
      metadata: { language },
    });
  }, [language, location.pathname, location.search]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-mkt]') : null;
      if (!target) {
        return;
      }
      void trackMarketingClick({
        actionCode: target.dataset.mkt,
        actionLabel: target.dataset.mktLabel || target.textContent?.trim() || target.getAttribute('aria-label') || undefined,
        category: target.dataset.mktCategory || 'CTA',
        metadata: {
          href: target instanceof HTMLAnchorElement ? target.href : target.getAttribute('href'),
          language,
        },
      });
    };

    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, [language]);

  return null;
};
