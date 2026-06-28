type MarketingMetadata = Record<string, unknown>;

type CaptureOptions = {
  actionCode?: string;
  actionLabel?: string;
  category?: string;
  eventType?: string;
  metadata?: MarketingMetadata;
};

type LeadCaptureInput = {
  fullName: string;
  email: string;
  phone?: string;
  message?: string;
  actionCode: string;
  consent: boolean;
  metadata?: MarketingMetadata;
};

const env = ((import.meta as unknown as { env?: Record<string, string | undefined> }).env || {});

const DEFAULT_API_BASE_URL = 'https://api.diceprojects.com/api';
const API_BASE_URL = (env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL).replace(/\/$/, '');
const CAMPAIGN_KEY = env.VITE_MARKETING_CAMPAIGN_KEY || 'diceprojects';
const MARKETING_ENABLED = env.VITE_MARKETING_ENABLED !== 'false';
const VISITOR_KEY = 'diceprojects.marketing.visitorId';

const safeJson = (value: MarketingMetadata = {}) => {
  try {
    return JSON.stringify(value);
  } catch {
    return '{}';
  }
};

export const getMarketingVisitorId = () => {
  if (typeof window === 'undefined') {
    return 'server';
  }
  const current = window.localStorage.getItem(VISITOR_KEY);
  if (current) {
    return current;
  }
  const next = window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  window.localStorage.setItem(VISITOR_KEY, next);
  return next;
};

const getUtmMetadata = () => {
  if (typeof window === 'undefined') {
    return {};
  }
  const params = new URLSearchParams(window.location.search);
  return ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'].reduce<MarketingMetadata>((acc, key) => {
    const value = params.get(key);
    if (value) {
      acc[key] = value;
    }
    return acc;
  }, {});
};

const baseMetadata = (extra?: MarketingMetadata): MarketingMetadata => {
  if (typeof window === 'undefined') {
    return extra || {};
  }
  return {
    site: 'diceprojects.com',
    campaignKey: CAMPAIGN_KEY,
    visitorId: getMarketingVisitorId(),
    pageTitle: document.title,
    path: window.location.pathname,
    search: window.location.search,
    language: document.documentElement.lang || navigator.language,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    ...getUtmMetadata(),
    ...(extra || {}),
  };
};

const captureUrl = (path: string) => `${API_BASE_URL}/v1/campaigns/capture/${encodeURIComponent(CAMPAIGN_KEY)}${path}`;

const postCapture = (path: string, body: unknown, keepalive = true) => {
  if (!MARKETING_ENABLED || typeof window === 'undefined') {
    return Promise.resolve();
  }
  return fetch(captureUrl(path), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    keepalive,
  }).then((response) => {
    if (!response.ok) {
      throw new Error(`Marketing capture failed: ${response.status}`);
    }
  });
};

export const trackMarketingEvent = ({
  actionCode,
  actionLabel,
  category = 'WEBSITE',
  eventType = 'VIEW',
  metadata,
}: CaptureOptions) => {
  if (typeof window === 'undefined') {
    return Promise.resolve();
  }
  return postCapture('/events', {
    eventType,
    visitorId: getMarketingVisitorId(),
    actionCode,
    actionLabel,
    category,
    channel: 'WEB',
    pageUrl: window.location.href,
    referrerUrl: document.referrer || undefined,
    metadata: safeJson(baseMetadata(metadata)),
  }).catch(() => undefined);
};

export const trackMarketingClick = (options: CaptureOptions) => {
  if (typeof window === 'undefined') {
    return Promise.resolve();
  }
  const metadata = safeJson(baseMetadata({
    actionCode: options.actionCode,
    actionLabel: options.actionLabel,
    category: options.category || 'CTA',
    ...(options.metadata || {}),
  }));

  void postCapture('/click', {
    pageUrl: window.location.href,
    referrerUrl: document.referrer || undefined,
    metadata,
  }).catch(() => undefined);

  return trackMarketingEvent({
    ...options,
    eventType: options.eventType || 'CLICK',
    category: options.category || 'CTA',
  });
};

export const submitMarketingLead = (lead: LeadCaptureInput) => postCapture('/form', {
  source: 'WEB',
  fullName: lead.fullName,
  email: lead.email,
  phone: lead.phone || undefined,
  message: lead.message || undefined,
  actionCode: lead.actionCode,
  consent: lead.consent,
  metadata: safeJson(baseMetadata(lead.metadata)),
}, false);
