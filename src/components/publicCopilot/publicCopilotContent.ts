import type { Language } from '@/src/i18n/LanguageContext';

export type PublicCopilotIntent =
  | 'pricing'
  | 'modules'
  | 'integrations'
  | 'ai'
  | 'projects'
  | 'inventory'
  | 'marketing'
  | 'implementation'
  | 'security'
  | 'contact'
  | 'company'
  | 'industries'
  | 'reports'
  | 'fallback';

type IntentContent = {
  title: string;
  answer: string;
  prompts: string[];
  cta?: string;
};

const normalize = (value: string) => value
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '');

const hasAny = (message: string, keywords: string[]) => keywords.some((keyword) => message.includes(keyword));
const looksLikeContact = (message: string) => hasAny(message, [
  'contact',
  'contacto',
  'contactar',
  'telefono',
  'whatsapp',
  'mail',
  'email',
  'correo',
  'ubicacion',
  'ubicados',
  'queda',
  'donde estan',
  'donde queda',
  'location',
  'phone',
  'where are',
]);

export const detectPublicCopilotIntent = (input: string): PublicCopilotIntent => {
  const message = normalize(input);
  if (looksLikeContact(message)) {
    return 'contact';
  }
  if (hasAny(message, ['precio', 'costo', 'cotizacion', 'presupuesto', 'demo', 'diagnostico', 'llamada', 'contratar', 'quote', 'pricing', 'cost', 'book'])) {
    return 'pricing';
  }
  if (hasAny(message, ['empresa', 'organizacion', 'multiempresa', 'sucursal', 'vendedor', 'equipo', 'company', 'organization', 'branch', 'seller', 'team'])) {
    return 'company';
  }
  if (hasAny(message, ['rubro', 'rubro', 'industria', 'servicio', 'comercio', 'automotor', 'constructor', 'industries', 'industry', 'business type'])) {
    return 'industries';
  }
  if (hasAny(message, ['reporte', 'dashboard', 'indicador', 'kpi', 'rentabilidad', 'margen', 'metric', 'report', 'analytics', 'indicator'])) {
    return 'reports';
  }
  if (hasAny(message, ['modulo', 'modulos', 'backoffice', 'plataforma', 'crm', 'ventas', 'compras', 'producto', 'catalogo', 'module', 'platform', 'sales', 'procurement'])) {
    return 'modules';
  }
  if (hasAny(message, ['integracion', 'integrar', 'sistema', 'erp', 'crm', 'drive', 'sharepoint', 'base', 'datos', 'integration', 'system', 'database'])) {
    return 'integrations';
  }
  if (hasAny(message, ['ai', 'ia', 'copiloto', 'asistente', 'agente', 'documento', 'chat', 'bot', 'assistant', 'agent'])) {
    return 'ai';
  }
  if (hasAny(message, ['obra', 'proyecto', 'servicio integral', 'mantenimiento', 'project', 'construction'])) {
    return 'projects';
  }
  if (hasAny(message, ['stock', 'inventario', 'producto', 'tienda', 'canal', 'mercaderia', 'proveedor', 'inventory', 'product stock', 'store stock', 'supplier'])) {
    return 'inventory';
  }
  if (hasAny(message, ['lead', 'campana', 'marketing', 'evento', 'web', 'embudo', 'cliente', 'funnel', 'campaign'])) {
    return 'marketing';
  }
  if (hasAny(message, ['implementar', 'tiempo', 'metodo', 'roadmap', 'adopcion', 'implement', 'timeline', 'method'])) {
    return 'implementation';
  }
  if (hasAny(message, ['seguridad', 'permiso', 'rol', 'auditoria', 'privacidad', 'security', 'permission', 'privacy', 'audit'])) {
    return 'security';
  }
  return 'fallback';
};

export const publicCopilotCopy: Record<Language, {
  launcher: string;
  title: string;
  subtitle: string;
  greeting: string;
  placeholder: string;
  quickPrompts: string[];
  leadTitle: string;
  leadIntro: string;
  leadButton: string;
  leadSent: string;
  leadError: string;
  limitMessage: string;
  intents: Record<PublicCopilotIntent, IntentContent>;
}> = {
  es: {
    launcher: 'Copiloto Dice',
    title: 'Copiloto Dice',
    subtitle: 'Responde con información curada del sitio. Sin consumo de IA.',
    greeting: 'Hola, soy el copiloto del sitio. Puedo orientarte sobre la plataforma, módulos, integraciones y diagnóstico comercial.',
    placeholder: 'Preguntá sobre módulos, procesos o diagnóstico...',
    quickPrompts: [
      'Qué resuelve la plataforma',
      'Cómo funciona el copiloto empresarial',
      'Quiero agendar diagnóstico',
    ],
    leadTitle: 'Agendar diagnóstico',
    leadIntro: 'Dejanos tus datos y lo registramos para seguimiento comercial.',
    leadButton: 'Registrar solicitud',
    leadSent: 'Solicitud registrada. Te contactamos para coordinar.',
    leadError: 'No pudimos registrar la solicitud. Probá desde Contacto.',
    limitMessage: 'Para cuidar el sitio, pausamos nuevas preguntas por esta sesión. Podés agendar un diagnóstico y seguimos por ahí.',
    intents: {
      pricing: {
        title: 'Diagnóstico antes que precio genérico',
        answer: 'La propuesta depende de módulos, volumen operativo, integraciones y nivel de acompañamiento. Lo más eficiente es un diagnóstico corto para detectar quick wins y armar alcance.',
        prompts: ['Qué módulos suelen activar primero', 'Qué datos necesitan para estimar', 'Agendar diagnóstico'],
        cta: 'Agendar diagnóstico',
      },
      contact: {
        title: 'Contacto y ubicación',
        answer: 'Dice Projects trabaja desde Buenos Aires, Argentina, con atención remota para empresas de distintos rubros. Podés escribir a mdice@diceprojects.com o llamar/WhatsApp al +54 11 7246 6605. Si querés, también puedo registrar una solicitud de diagnóstico desde acá.',
        prompts: ['Agendar diagnóstico', 'Qué datos necesitan para estimar', 'Qué resuelve la plataforma'],
        cta: 'Agendar diagnóstico',
      },
      company: {
        title: 'Dónde queda “la empresa” en la plataforma',
        answer: 'En Dice Projects cada empresa u organización es un espacio de trabajo separado: allí viven sus usuarios, permisos, vendedores, clientes, proveedores, productos, campañas, proyectos, stock, reportes y conocimiento del copiloto. Esto permite operar varias empresas sin mezclar datos.',
        prompts: ['Cómo se cuidan permisos', 'Qué módulos usa una empresa', 'Cómo separa empresas'],
      },
      industries: {
        title: 'Rubros donde aplica',
        answer: 'La solución no está pensada sólo para obras. Aplica a servicios integrales, comercio, distribución, productos con catálogo, empresas con stock, compras, proveedores, automotores, mantenimiento, operaciones comerciales y negocios que necesitan ordenar procesos.',
        prompts: ['Ver módulos principales', 'Proyectos y servicios', 'Stock y compras'],
      },
      reports: {
        title: 'Indicadores y tableros',
        answer: 'La plataforma busca que cada área deje datos medibles: leads, cotizaciones, compras, stock, avances, costos, desvíos, campañas y productividad. Con eso se arman tableros por empresa, área, proyecto o vendedor.',
        prompts: ['Marketing conectado a ventas', 'Proyecto a rentabilidad', 'Agendar diagnóstico'],
      },
      modules: {
        title: 'Plataforma modular para operar empresas',
        answer: 'Dice Projects conecta ventas, cotizaciones, compras, proveedores, productos, stock, proyectos, marketing, reportes y copiloto empresarial en una misma operación.',
        prompts: ['Ver integraciones', 'Qué pasa con stock y compras', 'Cómo se capturan leads'],
      },
      integrations: {
        title: 'Sistemas y datos conectados',
        answer: 'Integramos fuentes existentes como documentos, Drive, SharePoint, bases de datos, ERPs, CRMs y sistemas internos para reducir doble carga y alimentar procesos.',
        prompts: ['Cómo se cuidan permisos', 'Puede leer documentos', 'Agendar diagnóstico'],
      },
      ai: {
        title: 'Copiloto empresarial con control',
        answer: 'El copiloto puede responder sobre procesos, documentos, indicadores y datos autorizados. Para ahorrar costos, primero usa conocimiento curado y sólo escala a IA cuando hace falta.',
        prompts: ['Cómo evita gastar tokens', 'Qué documentos puede usar', 'Agendar diagnóstico'],
      },
      projects: {
        title: 'Obras, servicios y proyectos integrales',
        answer: 'La plataforma permite seguir avances, recursos, costos, presupuestos, compras, hitos, desvíos y reportes para obras o servicios integrales.',
        prompts: ['Cómo se miden costos', 'Qué reportes genera', 'Ver módulos'],
      },
      inventory: {
        title: 'Stock, compras y proveedores',
        answer: 'Podés controlar stock de productos por tienda, canal o punto de venta, con movimientos simples, disponibilidad y reposición. Cuando falta mercadería, se puede solicitar presupuesto a proveedores y comparar respuestas.',
        prompts: ['Cómo adjudicar proveedores', 'Cómo conecta con ventas', 'Agendar diagnóstico'],
      },
      marketing: {
        title: 'Marketing conectado a ventas',
        answer: 'La web puede capturar eventos, formularios, productos vistos, campañas y señales de interés. Esos datos quedan asociados a prospectos para seguimiento comercial.',
        prompts: ['Cómo se ven los leads', 'Cómo se mide una campaña', 'Agendar diagnóstico'],
      },
      implementation: {
        title: 'Implementación por etapas',
        answer: 'El camino recomendado es diagnóstico, diseño operativo, configuración de módulos, integraciones prioritarias, adopción de usuarios y mejora continua con indicadores.',
        prompts: ['Cuánto tarda un inicio', 'Qué módulo conviene primero', 'Agendar diagnóstico'],
      },
      security: {
        title: 'Permisos, privacidad y trazabilidad',
        answer: 'La información se organiza por empresa, usuario, roles y permisos. Las acciones relevantes pueden auditarse para saber quién hizo qué y con qué alcance.',
        prompts: ['Cómo funciona el copiloto', 'Cómo separa empresas', 'Agendar diagnóstico'],
      },
      fallback: {
        title: 'Te puedo guiar mejor si me das una pista',
        answer: 'Puedo responder sobre contacto, empresas dentro de la plataforma, módulos, integraciones, copiloto empresarial, marketing, stock, compras, proyectos, reportes o diagnóstico comercial.',
        prompts: ['Dónde queda la empresa', 'Cómo contacto', 'Qué resuelve la plataforma'],
      },
    },
  },
  en: {
    launcher: 'Dice Copilot',
    title: 'Dice Copilot',
    subtitle: 'Answers with curated website content. No AI spend.',
    greeting: 'Hi, I am the site copilot. I can guide you through the platform, modules, integrations and commercial assessment.',
    placeholder: 'Ask about modules, processes or assessment...',
    quickPrompts: [
      'What does the platform solve?',
      'How does the enterprise copilot work?',
      'I want to book an assessment',
    ],
    leadTitle: 'Book assessment',
    leadIntro: 'Share your details and we will register it for commercial follow-up.',
    leadButton: 'Register request',
    leadSent: 'Request registered. We will contact you to schedule.',
    leadError: 'We could not register the request. Please try from Contact.',
    limitMessage: 'To protect the site, new questions are paused for this session. You can book an assessment and continue from there.',
    intents: {
      pricing: {
        title: 'Assessment before generic pricing',
        answer: 'The proposal depends on modules, operational volume, integrations and support level. A short assessment is the best way to identify quick wins and scope.',
        prompts: ['Which modules start first?', 'What data is needed to estimate?', 'Book assessment'],
        cta: 'Book assessment',
      },
      contact: {
        title: 'Contact and location',
        answer: 'Dice Projects operates from Buenos Aires, Argentina, and supports companies remotely. You can email mdice@diceprojects.com or call/WhatsApp +54 11 7246 6605. I can also register an assessment request here.',
        prompts: ['Book assessment', 'What data is needed to estimate?', 'What does the platform solve?'],
        cta: 'Book assessment',
      },
      company: {
        title: 'Where “company” lives in the platform',
        answer: 'In Dice Projects each company or organization is a separate workspace: users, permissions, sellers, customers, suppliers, products, campaigns, projects, inventory, reports and copilot knowledge live there. This keeps data separated across companies.',
        prompts: ['How permissions work', 'Which modules a company uses', 'How companies are separated'],
      },
      industries: {
        title: 'Industries where it applies',
        answer: 'The solution is not only for construction. It fits integrated services, commerce, distribution, product catalogs, inventory operations, procurement, suppliers, automotive, maintenance, commercial teams and businesses that need process control.',
        prompts: ['See main modules', 'Projects and services', 'Inventory and procurement'],
      },
      reports: {
        title: 'Indicators and dashboards',
        answer: 'The platform turns daily work into measurable data: leads, quotes, procurement, inventory, progress, costs, deviations, campaigns and productivity. Dashboards can be viewed by company, area, project or seller.',
        prompts: ['Marketing connected to sales', 'Project profitability', 'Book assessment'],
      },
      modules: {
        title: 'Modular platform for business operations',
        answer: 'Dice Projects connects sales, quotes, procurement, suppliers, products, inventory, projects, marketing, reporting and enterprise copilot in one operating flow.',
        prompts: ['See integrations', 'Inventory and procurement', 'How leads are captured'],
      },
      integrations: {
        title: 'Connected systems and data',
        answer: 'We connect existing sources such as documents, Drive, SharePoint, databases, ERPs, CRMs and internal systems to reduce duplicate work and feed processes.',
        prompts: ['How permissions work', 'Can it read documents?', 'Book assessment'],
      },
      ai: {
        title: 'Enterprise copilot with control',
        answer: 'The copilot can answer about processes, documents, indicators and authorized data. To control costs, it uses curated knowledge first and only escalates to AI when needed.',
        prompts: ['How does it avoid token spend?', 'Which documents can it use?', 'Book assessment'],
      },
      projects: {
        title: 'Works, services and integrated projects',
        answer: 'The platform tracks progress, resources, costs, budgets, procurement, milestones, deviations and reports for works or integrated services.',
        prompts: ['How costs are measured', 'Which reports are available?', 'See modules'],
      },
      inventory: {
        title: 'Inventory, procurement and suppliers',
        answer: 'You can control product inventory by store, channel or sales point, with simple movements, availability and replenishment. When product stock is missing, request quotes from suppliers and compare responses.',
        prompts: ['How suppliers are awarded', 'How it connects to sales', 'Book assessment'],
      },
      marketing: {
        title: 'Marketing connected to sales',
        answer: 'The website can capture events, forms, viewed products, campaigns and interest signals. Those signals become prospects for commercial follow-up.',
        prompts: ['How leads are viewed', 'How campaigns are measured', 'Book assessment'],
      },
      implementation: {
        title: 'Implementation by stages',
        answer: 'The recommended path is assessment, operating design, module setup, priority integrations, user adoption and continuous improvement with indicators.',
        prompts: ['How long to start?', 'Which module comes first?', 'Book assessment'],
      },
      security: {
        title: 'Permissions, privacy and traceability',
        answer: 'Information is organized by company, user, roles and permissions. Relevant actions can be audited to understand who did what and under which scope.',
        prompts: ['How the copilot works', 'How companies are separated', 'Book assessment'],
      },
      fallback: {
        title: 'I can guide you better with a bit more context',
        answer: 'I can answer about contact, companies inside the platform, modules, integrations, enterprise copilot, marketing, inventory, procurement, projects, reports or commercial assessment.',
        prompts: ['Where does the company live?', 'How do I contact you?', 'What does the platform solve?'],
      },
    },
  },
};
