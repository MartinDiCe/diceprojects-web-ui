import { FormEvent, useMemo, useState } from 'react';
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
  intent?: PublicCopilotIntent;
  showLead?: boolean;
};

const MAX_QUESTIONS_PER_SESSION = 12;
const MAX_MESSAGE_LENGTH = 280;

const sessionQuestionKey = 'diceprojects.publicCopilot.questions';
const env = ((import.meta as unknown as { env?: Record<string, string | undefined> }).env || {});
const PUBLIC_BOT_ENABLED = env.VITE_PUBLIC_BOT_ENABLED !== 'false';

const getSessionQuestionCount = () => Number(window.sessionStorage.getItem(sessionQuestionKey) || '0');
const incrementSessionQuestionCount = () => {
  const next = getSessionQuestionCount() + 1;
  window.sessionStorage.setItem(sessionQuestionKey, String(next));
  return next;
};

export const PublicCopilotWidget = () => {
  const { language } = useLanguage();
  const copy = publicCopilotCopy[language];
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
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

  const answerQuestion = (rawValue: string) => {
    const value = rawValue.trim().slice(0, MAX_MESSAGE_LENGTH);
    if (!value) return;

    setInput('');
    const questionCount = incrementSessionQuestionCount();
    const userMessage: BotMessage = {
      id: crypto.randomUUID(),
      sender: 'user',
      text: value,
    };

    if (questionCount > MAX_QUESTIONS_PER_SESSION) {
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
    answerQuestion(input);
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
    <div className="fixed bottom-5 right-4 z-[70] sm:right-6">
      <div
        className={cn(
          'mb-3 w-[calc(100vw-2rem)] max-w-[380px] overflow-hidden rounded-lg border border-brand-dark/10 bg-brand-white shadow-2xl transition-all duration-200',
          isOpen ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0',
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
          <button type="button" onClick={() => setIsOpen(false)} className="rounded-lg p-2 text-brand-white/70 transition hover:bg-brand-white/10 hover:text-brand-white" aria-label="Cerrar copiloto">
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[440px] space-y-3 overflow-y-auto bg-[#F6F8FA] p-4">
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
                        onClick={() => answerQuestion(prompt)}
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
                <input name="name" required placeholder={language === 'es' ? 'Nombre' : 'Name'} className="rounded-lg border border-brand-dark/10 px-3 py-2 text-sm outline-none focus:border-brand-primary" />
                <input name="company" required placeholder={language === 'es' ? 'Empresa' : 'Company'} className="rounded-lg border border-brand-dark/10 px-3 py-2 text-sm outline-none focus:border-brand-primary" />
                <input name="email" type="email" required placeholder="Email" className="rounded-lg border border-brand-dark/10 px-3 py-2 text-sm outline-none focus:border-brand-primary" />
                <input name="phone" placeholder={language === 'es' ? 'Teléfono / WhatsApp' : 'Phone / WhatsApp'} className="rounded-lg border border-brand-dark/10 px-3 py-2 text-sm outline-none focus:border-brand-primary" />
              </div>
              <button type="submit" disabled={leadState === 'sending'} className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-primary px-4 py-3 text-xs font-bold uppercase tracking-[0.14em] text-brand-white transition hover:bg-brand-secondary disabled:opacity-50">
                {leadState === 'sending' ? (language === 'es' ? 'Registrando...' : 'Registering...') : copy.leadButton}
                <ArrowRight size={15} />
              </button>
              {leadState === 'sent' && <p className="mt-2 text-center text-xs font-bold text-emerald-600">{copy.leadSent}</p>}
              {leadState === 'error' && <p className="mt-2 text-center text-xs font-bold text-amber-600">{copy.leadError}</p>}
            </form>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2 border-t border-brand-dark/10 bg-brand-white p-3">
          <input
            value={input}
            maxLength={MAX_MESSAGE_LENGTH}
            onChange={(event) => setInput(event.target.value)}
            placeholder={copy.placeholder}
            className="min-w-0 flex-1 rounded-lg border border-brand-dark/10 px-3 py-3 text-sm outline-none transition focus:border-brand-primary"
          />
          <button type="submit" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-primary text-brand-white transition hover:bg-brand-secondary" aria-label="Enviar">
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
              metadata: { zeroLlm: true },
            });
          }
        }}
        data-mkt="public_copilot_fab"
        data-mkt-category="PUBLIC_COPILOT"
        className="ml-auto flex h-14 items-center gap-3 rounded-full bg-brand-dark px-5 text-sm font-bold text-brand-white shadow-2xl transition hover:-translate-y-0.5 hover:bg-brand-primary"
      >
        <MessageCircle size={20} />
        <span className="hidden sm:inline">{copy.launcher}</span>
      </button>
    </div>
  );
};
