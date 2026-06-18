import { FormEvent, useEffect, useMemo, useState } from 'react';
import { ArrowRight, Bot, CheckCircle2, MessageCircle, Send, X } from 'lucide-react';
import { publicCopilotCopy, detectPublicCopilotIntent, type PublicCopilotIntent } from './publicCopilotContent';
import { useLanguage } from '@/src/i18n/LanguageContext';
import { getMarketingVisitorId, submitMarketingLead, trackMarketingEvent } from '@/src/lib/marketingCapture';
import { cn } from '@/src/lib/utils';

type BotMessage = {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  title?: string;
  prompts?: string[];
  intent?: PublicCopilotIntent | string;
  showLead?: boolean;
};

type RemoteBotConfig = {
  welcomeMessage?: string | null;
  quickPrompts?: string[] | null;
  maxQuestionsPerSession?: number | null;
};

type RemoteBotAnswer = {
  intent?: string | null;
  title?: string | null;
  answer: string;
  quickPrompts?: string[] | null;
  leadSuggested?: boolean | null;
  llmUsed?: boolean | null;
  aiConsentRequired?: boolean | null;
  costNotice?: string | null;
};

const MAX_QUESTIONS_PER_SESSION = 12;
const MAX_MESSAGE_LENGTH = 280;

const sessionQuestionKey = 'diceprojects.publicCopilot.questions';
const sessionIdKey = 'diceprojects.publicCopilot.sessionId';
const businessMemoryKey = 'diceprojects.publicCopilot.businessContext';
const env = ((import.meta as unknown as { env?: Record<string, string | undefined> }).env || {});
const PUBLIC_BOT_ENABLED = env.VITE_PUBLIC_BOT_ENABLED !== 'false';
const API_BASE_URL = (env.VITE_API_BASE_URL || 'https://api.diceprojects.com/api').replace(/\/$/, '');
const MARKETING_CAMPAIGN_KEY = env.VITE_MARKETING_CAMPAIGN_KEY || '';
const CONFIGURED_PUBLIC_BOT_KEY = env.VITE_PUBLIC_BOT_KEY || '';
const PUBLIC_WHATSAPP_URL = env.VITE_PUBLIC_WHATSAPP_URL || 'https://wa.me/541172466605';
const PRIMARY_PUBLIC_BOT_KEY = CONFIGURED_PUBLIC_BOT_KEY || MARKETING_CAMPAIGN_KEY || 'diceprojects';
const PUBLIC_BOT_KEYS = Array.from(new Set([PRIMARY_PUBLIC_BOT_KEY, 'diceprojects'].filter(Boolean)));

const getSessionQuestionCount = () => Number(window.sessionStorage.getItem(sessionQuestionKey) || '0');
const incrementSessionQuestionCount = () => {
  const next = getSessionQuestionCount() + 1;
  window.sessionStorage.setItem(sessionQuestionKey, String(next));
  return next;
};

const getSessionId = () => {
  const current = window.sessionStorage.getItem(sessionIdKey);
  if (current) return current;
  const next = crypto.randomUUID();
  window.sessionStorage.setItem(sessionIdKey, next);
  return next;
};

const normalizeText = (value: string) => value
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '');

const isDiagnosticPrompt = (value: string) => {
  const normalized = normalizeText(value);
  return normalized.includes('diagnostico') || normalized.includes('assessment') || normalized.includes('propuesta');
};

const isWhatsappPrompt = (value: string) => {
  const normalized = normalizeText(value);
  return normalized.includes('whatsapp') || normalized.includes('hablar') || normalized.includes('falar pelo');
};

const detectBusinessContext = (value: string) => {
  const normalized = normalizeText(value);
  const vertical = [
    ['health', ['salud', 'clinica', 'turno', 'paciente', 'medico', 'medical', 'health']],
    ['commerce', ['catalogo', 'producto', 'stock', 'tienda', 'ecommerce', 'carrito', 'catalog']],
    ['services', ['servicio', 'obra', 'proyecto', 'mantenimiento', 'service', 'project']],
    ['operations', ['erp', 'crm', 'integracion', 'sistema', 'planilla', 'api', 'database', 'integration']],
  ].find(([, keywords]) => (keywords as string[]).some((keyword) => normalized.includes(keyword)))?.[0] || 'business';

  const pain = [
    ['duplicate_work', ['doble carga', 'retrabajo', 'manual', 'planilla', 'excel', 'whatsapp']],
    ['sales_followup', ['lead', 'venta', 'cotizacion', 'presupuesto', 'seguimiento']],
    ['data_visibility', ['reporte', 'dashboard', 'kpi', 'indicador', 'margen', 'rentabilidad']],
    ['integration', ['integrar', 'integracion', 'sistema', 'erp', 'crm', 'api']],
  ].find(([, keywords]) => (keywords as string[]).some((keyword) => normalized.includes(keyword)))?.[0] || 'discovery';

  return { vertical, pain, lastMessage: value, updatedAt: new Date().toISOString() };
};

const readBusinessMemory = () => {
  try {
    const raw = window.localStorage.getItem(businessMemoryKey);
    return raw ? JSON.parse(raw) as ReturnType<typeof detectBusinessContext> : null;
  } catch {
    return null;
  }
};

const saveBusinessMemory = (value: ReturnType<typeof detectBusinessContext>) => {
  try {
    window.localStorage.setItem(businessMemoryKey, JSON.stringify(value));
  } catch {
    // Storage may be unavailable in private contexts.
  }
};

const fetchRemoteBotConfig = async (): Promise<RemoteBotConfig | null> => {
  for (const publicBotKey of PUBLIC_BOT_KEYS) {
    const response = await fetch(`${API_BASE_URL}/v1/public-bots/${encodeURIComponent(publicBotKey)}/config`);
    if (response.ok) {
      return response.json() as Promise<RemoteBotConfig>;
    }
  }
  return null;
};

const askRemoteBot = async (message: string, language: string, allowAi = false): Promise<RemoteBotAnswer | null> => {
  for (const publicBotKey of PUBLIC_BOT_KEYS) {
    const response = await fetch(`${API_BASE_URL}/v1/public-bots/${encodeURIComponent(publicBotKey)}/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        visitorId: getMarketingVisitorId(),
        sessionId: getSessionId(),
        language,
        pageUrl: window.location.href,
        referrerUrl: document.referrer || undefined,
        allowAi,
      }),
    });
    if (response.ok) {
      return response.json() as Promise<RemoteBotAnswer>;
    }
  }
  return null;
};

const uiByLanguage = {
  es: {
    close: 'Cerrar copiloto',
    name: 'Nombre',
    company: 'Empresa',
    phone: 'Teléfono / WhatsApp',
    registering: 'Registrando...',
    send: 'Enviar',
    whatsappOpened: 'También te abrí WhatsApp con el contexto de la consulta para que no tengas que repetir todo.',
    diagnosticText: 'Perfecto. Para ordenar el diagnóstico conviene relevar rubro, proceso actual, sistemas que usan, volumen de operación y dónde se pierde tiempo o seguimiento.',
    contextPrefix: 'Tomo como contexto',
    webAssistantExample: 'Ejemplos concretos: una textil puede responder telas, precios y armar una solicitud; una empresa de servicios puede explicar paquetes y agendar diagnóstico; un negocio con catálogo puede capturar productos consultados y crear un lead con intención real.',
  },
  en: {
    close: 'Close copilot',
    name: 'Name',
    company: 'Company',
    phone: 'Phone / WhatsApp',
    registering: 'Registering...',
    send: 'Send',
    whatsappOpened: 'I also opened WhatsApp with the consultation context so you do not need to repeat everything.',
    diagnosticText: 'Perfect. To structure the assessment we should capture industry, current process, systems in use, operational volume and where time or follow-up is being lost.',
    contextPrefix: 'I will use this as context',
    webAssistantExample: 'Concrete examples: a textile company can answer fabric, pricing and quote questions; a service business can explain packages and book assessments; a catalog business can capture viewed products and create a lead with real intent.',
  },
  pt: {
    close: 'Fechar copiloto',
    name: 'Nome',
    company: 'Empresa',
    phone: 'Telefone / WhatsApp',
    registering: 'Registrando...',
    send: 'Enviar',
    whatsappOpened: 'Também abri o WhatsApp com o contexto da consulta para que você não precise repetir tudo.',
    diagnosticText: 'Perfeito. Para organizar o diagnóstico convém levantar segmento, processo atual, sistemas usados, volume operacional e onde se perde tempo ou acompanhamento.',
    contextPrefix: 'Vou usar como contexto',
    webAssistantExample: 'Exemplos concretos: uma têxtil pode responder sobre tecidos, preços e pedidos de cotação; uma empresa de serviços pode explicar pacotes e agendar diagnóstico; um negócio com catálogo pode capturar produtos consultados e criar um lead com intenção real.',
  },
} as const;

export const PublicCopilotWidget = () => {
  const { language } = useLanguage();
  const copy = publicCopilotCopy[language];
  const ui = uiByLanguage[language];
  const [remoteConfig, setRemoteConfig] = useState<RemoteBotConfig | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [pendingAiQuestion, setPendingAiQuestion] = useState<string | null>(null);
  const [leadState, setLeadState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [messages, setMessages] = useState<BotMessage[]>(() => [
    {
      id: 'greeting',
      sender: 'bot',
      title: copy.title,
      text: copy.greeting,
      prompts: copy.quickPrompts,
    },
  ]);

  useEffect(() => {
    setMessages((current) => {
      if (current.length !== 1 || current[0].id !== 'greeting') {
        return current;
      }
      return [{
        id: 'greeting',
        sender: 'bot',
        title: copy.title,
        text: copy.greeting,
        prompts: copy.quickPrompts,
      }];
    });
  }, [copy]);

  useEffect(() => {
    let cancelled = false;
    fetchRemoteBotConfig()
      .then((config) => {
        if (cancelled || !config) return;
        setRemoteConfig(config);
        setMessages((current) => {
          if (current.length !== 1 || current[0].id !== 'greeting') return current;
          return [{
            id: 'greeting',
            sender: 'bot',
            title: copy.title,
            text: config.welcomeMessage || copy.greeting,
            prompts: config.quickPrompts?.length ? config.quickPrompts : copy.quickPrompts,
          }];
        });
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [copy]);

  const hasLeadPrompt = useMemo(() => messages.some((message) => message.showLead), [messages]);
  const lastIntent = useMemo(() => {
    for (let index = messages.length - 1; index >= 0; index -= 1) {
      if (messages[index].intent) return messages[index].intent;
    }
    return null;
  }, [messages]);

  if (!PUBLIC_BOT_ENABLED) {
    return null;
  }

  const answerQuestion = async (rawValue: string, allowAi = false) => {
    const value = rawValue.trim().slice(0, MAX_MESSAGE_LENGTH);
    if (!value) return;

    setInput('');
    const questionCount = incrementSessionQuestionCount();
    const userMessage: BotMessage = {
      id: crypto.randomUUID(),
      sender: 'user',
      text: value,
    };

    const maxQuestions = remoteConfig?.maxQuestionsPerSession || MAX_QUESTIONS_PER_SESSION;
    if (questionCount > maxQuestions) {
      setMessages((current) => [
        ...current,
        userMessage,
        {
          id: crypto.randomUUID(),
          sender: 'bot',
          title: copy.leadTitle,
          text: copy.limitMessage,
          showLead: true,
          intent: 'pricing',
        },
      ]);
      return;
    }

    const businessContext = detectBusinessContext(value);
    saveBusinessMemory(businessContext);

    if (isWhatsappPrompt(value)) {
      const text = encodeURIComponent(`Hola Dice Projects, quiero hablar sobre ${businessContext.pain === 'integration' ? 'integraciones y automatización' : 'un diagnóstico de negocio'}. Mi consulta: ${value}`);
      window.open(`${PUBLIC_WHATSAPP_URL}?text=${text}`, '_blank', 'noopener,noreferrer');
      const contactContent = copy.intents.contact;
      setMessages((current) => [
        ...current,
        userMessage,
        {
          id: crypto.randomUUID(),
          sender: 'bot',
          title: contactContent.title,
          text: `${contactContent.answer}\n\n${ui.whatsappOpened}`,
          prompts: ['Agendar diagnóstico', 'Qué resuelve la plataforma', 'Bot para sitios web con KB'],
          intent: 'contact',
          showLead: true,
        },
      ]);
      return;
    }

    if (isDiagnosticPrompt(value)) {
      const previous = readBusinessMemory();
      setMessages((current) => [
        ...current,
        userMessage,
        {
          id: crypto.randomUUID(),
          sender: 'bot',
          title: copy.leadTitle,
          text: `${ui.diagnosticText}${previous?.lastMessage ? ` ${ui.contextPrefix}: "${previous.lastMessage}".` : ''}`,
          prompts: ['Qué datos necesitan para estimar', 'Hablar por WhatsApp', 'Integraciones empresariales'],
          intent: 'pricing',
          showLead: true,
        },
      ]);
      return;
    }

    const localIntent = detectPublicCopilotIntent(value);
    if (localIntent === 'webAssistant') {
      const content = copy.intents.webAssistant;
      setMessages((current) => [
        ...current,
        userMessage,
        {
          id: crypto.randomUUID(),
          sender: 'bot',
          title: content.title,
          text: `${content.answer}\n\n${ui.webAssistantExample}`,
          prompts: ['Agendar diagnóstico', 'Cómo captura leads', 'Hablar por WhatsApp'],
          intent: localIntent,
          showLead: true,
        },
      ]);
      return;
    }

    try {
      const remote = await askRemoteBot(value, language, allowAi);
      if (remote?.answer) {
        if (remote.aiConsentRequired) {
          setPendingAiQuestion(value);
        } else if (allowAi || remote.llmUsed) {
          setPendingAiQuestion(null);
        }
        setMessages((current) => [
          ...current,
          userMessage,
          {
            id: crypto.randomUUID(),
            sender: 'bot',
            title: remote.title || copy.title,
            text: remote.costNotice ? `${remote.answer}\n\n${remote.costNotice}` : remote.answer,
            prompts: remote.quickPrompts?.length ? remote.quickPrompts : copy.quickPrompts,
            intent: remote.intent || 'remote',
            showLead: Boolean(remote.leadSuggested),
          },
        ]);
        return;
      }
    } catch {
      // Fallback local: mantiene el sitio vendiendo aunque Marketing API no responda.
    }

    const intent = detectPublicCopilotIntent(value);
    const content = copy.intents[intent];
    const showLead = intent === 'pricing' || content.cta != null;

    void trackMarketingEvent({
      eventType: 'BOT_QUESTION',
      actionCode: `public_copilot_${intent}`,
      actionLabel: content.title,
      category: 'PUBLIC_COPILOT',
      metadata: {
        question: value,
        intent,
        zeroLlm: true,
        visitorId: getMarketingVisitorId(),
      },
    });

    void trackMarketingEvent({
      eventType: showLead ? 'BOT_LEAD_INTENT' : 'BOT_ANSWER',
      actionCode: `public_copilot_${intent}`,
      actionLabel: content.title,
      category: 'PUBLIC_COPILOT',
      metadata: {
        intent,
        answerTitle: content.title,
        zeroLlm: true,
      },
    });

    setMessages((current) => [
      ...current,
      userMessage,
      {
        id: crypto.randomUUID(),
        sender: 'bot',
        title: content.title,
        text: content.answer,
        prompts: content.prompts,
        intent,
        showLead,
      },
    ]);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void answerQuestion(input);
  };

  const submitLead = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const fullName = String(form.get('name') || '').trim();
    const email = String(form.get('email') || '').trim();
    const company = String(form.get('company') || '').trim();
    const phone = String(form.get('phone') || '').trim();
    if (!fullName || !email || !company) return;

    setLeadState('sending');
    try {
      await submitMarketingLead({
        fullName,
        email,
        phone,
        message: `Lead desde Copiloto Dice\nEmpresa: ${company}\nIdioma: ${language}\nVisitor: ${getMarketingVisitorId()}`,
        actionCode: 'public_copilot_lead',
        consent: true,
        metadata: {
          company,
          source: 'public_copilot',
          zeroLlm: true,
          recentIntent: lastIntent,
        },
      });
      void trackMarketingEvent({
        eventType: 'CONVERSION',
        actionCode: 'public_copilot_lead',
        actionLabel: 'Public copilot lead',
        category: 'PUBLIC_COPILOT',
        metadata: { company, zeroLlm: true },
      });
      setLeadState('sent');
      event.currentTarget.reset();
    } catch {
      setLeadState('error');
    }
  };

  return (
    <div className="pointer-events-none fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-4 z-[70] sm:bottom-5 sm:right-6">
      <div
        className={cn(
          'mb-3 flex w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-lg border border-brand-dark/10 bg-brand-white shadow-2xl transition-all duration-200 max-sm:max-h-[calc(100dvh-8.5rem)]',
          isOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0',
          isOpen ? 'pointer-events-auto' : '',
        )}
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between bg-brand-dark px-4 py-3 text-brand-white">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-primary">
              <Bot size={19} />
            </span>
            <div>
              <p className="text-sm font-bold leading-tight">{copy.title}</p>
              <p className="text-[11px] font-semibold text-brand-white/55">{copy.subtitle}</p>
            </div>
          </div>
          <button type="button" onClick={() => setIsOpen(false)} className="rounded-lg p-2 text-brand-white/70 transition hover:bg-brand-white/10 hover:text-brand-white" aria-label={ui.close}>
            <X size={18} />
          </button>
        </div>

        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-[#F6F8FA] p-4 sm:max-h-[min(440px,52dvh)]">
          {messages.map((message) => (
            <div key={message.id} className={cn('flex', message.sender === 'user' ? 'justify-end' : 'justify-start')}>
              <div className={cn(
                'max-w-[86%] rounded-lg px-4 py-3 text-sm leading-relaxed shadow-sm',
                message.sender === 'user' ? 'bg-brand-primary text-brand-white' : 'bg-brand-white text-brand-dark',
              )}>
                {message.title && <p className="mb-1 font-bold">{message.title}</p>}
                <p>{message.text}</p>
                {message.prompts && message.sender === 'bot' && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {message.prompts.map((prompt) => (
                      <button
                        key={prompt}
                        type="button"
                        onClick={() => {
                          const usesAi = prompt.toLowerCase().includes('usar ia') && Boolean(pendingAiQuestion);
                          void answerQuestion(usesAi ? pendingAiQuestion || prompt : prompt, usesAi);
                        }}
                        className="rounded-full border border-brand-primary/20 bg-brand-primary/5 px-3 py-1 text-[11px] font-bold text-brand-primary transition hover:bg-brand-primary hover:text-brand-white"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {hasLeadPrompt && (
            <form onSubmit={submitLead} className="rounded-lg border border-brand-primary/15 bg-brand-white p-4 shadow-sm">
              <div className="mb-3 flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 shrink-0 text-brand-primary" size={18} />
                <div>
                  <p className="text-sm font-bold text-brand-dark">{copy.leadTitle}</p>
                  <p className="text-xs font-semibold leading-relaxed text-brand-dark/55">{copy.leadIntro}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-2">
                <input name="name" required placeholder={ui.name} className="rounded-lg border border-brand-dark/10 px-3 py-2 text-sm outline-none focus:border-brand-primary" />
                <input name="company" required placeholder={ui.company} className="rounded-lg border border-brand-dark/10 px-3 py-2 text-sm outline-none focus:border-brand-primary" />
                <input name="email" type="email" required placeholder="Email" className="rounded-lg border border-brand-dark/10 px-3 py-2 text-sm outline-none focus:border-brand-primary" />
                <input name="phone" placeholder={ui.phone} className="rounded-lg border border-brand-dark/10 px-3 py-2 text-sm outline-none focus:border-brand-primary" />
              </div>
              <button type="submit" disabled={leadState === 'sending'} className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-primary px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-brand-white transition hover:bg-brand-secondary disabled:opacity-50">
                {leadState === 'sending' ? ui.registering : copy.leadButton}
                <ArrowRight size={15} />
              </button>
              {leadState === 'sent' && <p className="mt-2 text-center text-xs font-bold text-emerald-600">{copy.leadSent}</p>}
              {leadState === 'error' && <p className="mt-2 text-center text-xs font-bold text-amber-600">{copy.leadError}</p>}
            </form>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex shrink-0 items-center gap-2 border-t border-brand-dark/10 bg-brand-white p-3">
          <input
            value={input}
            maxLength={MAX_MESSAGE_LENGTH}
            onChange={(event) => setInput(event.target.value)}
            placeholder={copy.placeholder}
            className="min-w-0 flex-1 rounded-lg border border-brand-dark/10 px-3 py-3 text-sm outline-none transition focus:border-brand-primary"
          />
          <button type="submit" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-primary text-brand-white transition hover:bg-brand-secondary" aria-label={ui.send}>
            <Send size={17} />
          </button>
        </form>
      </div>

      <button
        type="button"
        onClick={() => {
          setIsOpen((current) => !current);
          if (!isOpen) {
            void trackMarketingEvent({
              eventType: 'CLICK',
              actionCode: 'public_copilot_open',
              actionLabel: 'Open public copilot',
              category: 'PUBLIC_COPILOT',
              metadata: { zeroLlm: true, language },
            });
          }
        }}
        data-mkt="public_copilot_fab"
        data-mkt-category="PUBLIC_COPILOT"
        className={cn(
          'pointer-events-auto ml-auto h-14 items-center gap-3 rounded-full bg-brand-dark px-5 text-sm font-bold text-brand-white shadow-2xl transition hover:-translate-y-0.5 hover:bg-brand-primary',
          isOpen ? 'hidden sm:flex' : 'flex',
        )}
      >
        <MessageCircle size={20} />
        <span className="hidden sm:inline">{copy.launcher}</span>
      </button>
    </div>
  );
};
