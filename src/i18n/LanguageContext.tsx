import React from 'react';

export type Language = 'es' | 'en' | 'pt';

const STORAGE_KEY = 'diceprojects-language';

type LanguageContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
};

const LanguageContext = React.createContext<LanguageContextValue | undefined>(undefined);

const SPANISH_REGIONS = new Set([
  'AR',
  'BO',
  'CL',
  'CO',
  'CR',
  'CU',
  'DO',
  'EC',
  'ES',
  'GT',
  'HN',
  'MX',
  'NI',
  'PA',
  'PE',
  'PR',
  'PY',
  'SV',
  'UY',
  'VE',
]);

function resolveLanguageFromLocale(locale: string): Language | null {
  const normalized = locale.trim().toLowerCase();
  if (!normalized) return null;
  const [languageCode, regionCode] = normalized.split(/[-_]/);
  if (languageCode === 'en') return 'en';
  if (languageCode === 'es') return 'es';
  if (languageCode === 'pt') return 'pt';
  if (regionCode && SPANISH_REGIONS.has(regionCode.toUpperCase())) return 'es';
  return null;
}

function detectBrowserLanguage(): Language {
  if (typeof window === 'undefined') return 'es';

  const locales = [
    ...(navigator.languages ?? []),
    navigator.language,
  ].filter(Boolean);

  for (const locale of locales) {
    const detected = resolveLanguageFromLocale(locale);
    if (detected) return detected;
  }

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (timezone?.startsWith('America/')) {
    return timezone === 'America/New_York'
      || timezone === 'America/Chicago'
      || timezone === 'America/Denver'
      || timezone === 'America/Los_Angeles'
      || timezone === 'America/Phoenix'
      || timezone === 'America/Anchorage'
      || timezone === 'Pacific/Honolulu'
      ? 'en'
      : 'es';
  }

  return 'en';
}

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'es';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'en' || stored === 'es' || stored === 'pt') return stored;
  return detectBrowserLanguage();
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = React.useState<Language>(getInitialLanguage);

  const setLanguage = React.useCallback((nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem(STORAGE_KEY, nextLanguage);
    document.documentElement.lang = nextLanguage;
  }, []);

  React.useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = React.useMemo(
    () => ({
      language,
      setLanguage,
      toggleLanguage: () => setLanguage(language === 'es' ? 'en' : language === 'en' ? 'pt' : 'es'),
    }),
    [language, setLanguage],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = React.useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

export const copy = {
  es: {
    nav: {
      home: 'Inicio',
      solution: 'Plataforma',
      method: 'Servicios',
      insights: 'Casos',
      about: 'Nosotros',
      contact: 'Contacto',
      cta: 'Agendar diagnóstico',
      menu: 'Menú',
      switch: 'English',
    },
    footer: {
      statement: 'Partner tecnológico para diseñar, implementar y evolucionar operaciones digitales.',
      legal: 'Legal y transparencia',
      solutions: 'Soluciones',
      contact: 'Contacto',
      diagnostic: 'Diagnóstico',
      rights: 'Todos los derechos reservados.',
      line: 'Consultoría • Plataforma • Evolución continua',
      links: [
        'DiceProjects Platform',
        'Automatización de procesos',
        'Gestión comercial',
        'Productos y catálogo',
        'Stock de productos',
        'Gestión inmobiliaria',
        'Proyectos inmobiliarios y obra',
        'Marketing y leads',
        'Sitios conectados',
        'Presupuestos y cotizaciones',
        'Proyectos y servicios',
        'Integraciones empresariales',
        'Copiloto AI empresarial',
      ],
    },
    home: {
      seoTitle: 'Partner tecnológico para evolución digital, procesos, plataformas e IA',
      seoDescription: 'DiceProjects diseña procesos, implementa plataformas, conecta sistemas e incorpora inteligencia artificial para evolucionar la operación digital de empresas.',
      eyebrow: 'Partner tecnológico estratégico',
      h1: 'Más que software. Evolucionamos la operación digital de tu empresa.',
      intro: 'Diseñamos procesos, implementamos plataformas, conectamos sistemas e incorporamos inteligencia artificial para que tu operación crezca junto con tu negocio.',
      primary: 'Agendar diagnóstico',
      secondary: 'Ver cómo trabajamos',
      proof: ['Consultoría operativa', 'Core tecnológico propio', 'Evolución continua'],
      catalogTitle: 'Primero entendemos la operación. Después diseñamos tecnología.',
      catalogIntro: 'No comenzamos escribiendo código ni vendiendo módulos. Mapeamos procesos, personas, información, problemas y oportunidades para construir una operación digital que tenga sentido para el negocio.',
      catalog: [
        ['Procesos', 'Entendemos cómo trabaja la empresa, dónde se pierde tiempo y qué decisiones necesitan mejores datos.'],
        ['Tecnología', 'Implementamos una plataforma modular sobre un Core común, sin obligar al negocio a adaptarse a sistemas rígidos.'],
        ['Datos', 'Conectamos clientes, proveedores, productos, documentos, expedientes, proyectos, campañas e indicadores.'],
        ['Automatización', 'Reducimos tareas manuales, doble carga, aprobaciones informales y operaciones que dependen de memoria humana.'],
        ['Inteligencia artificial', 'Incorporamos copilotos con contexto, permisos, conocimiento del negocio y control de costos.'],
        ['Resultados', 'Medimos adopción, tiempos, trazabilidad, margen, oportunidades comerciales y nuevos procesos a evolucionar.'],
        ['Integraciones', 'Conectamos ERPs, CRMs, APIs, bases, Drive, SharePoint, Excel, documentos y servicios externos.'],
        ['Evolución continua', 'La plataforma crece con nuevos módulos, automatizaciones, integraciones e inteligencia aplicada.'],
      ],
      workflowsTitle: 'DiceProjects Platform: un Core común para construir soluciones específicas.',
      workflows: [
        ['Usuarios, roles y permisos', 'Multiempresa, seguridad, auditoría y alcance por usuario para operar sin mezclar información.'],
        ['Workflow y expedientes', 'Procesos, casos, documentos, aprobaciones, historial y trazabilidad en un mismo ecosistema.'],
        ['Dashboards y marketing', 'Indicadores, campañas, eventos web, leads y oportunidades conectadas con la operación real.'],
        ['APIs y copiloto IA', 'Integraciones abiertas y asistentes empresariales que trabajan con contexto, permisos y conocimiento propio.'],
      ],
      aiTitle: 'Soluciones verticales sobre el mismo Core.',
      aiCopy: 'No vendemos productos aislados. Construimos BackOffices especializados para cada industria reutilizando una base común, reduciendo tiempos de implementación y manteniendo una experiencia consistente.',
      aiBullets: ['DiceCommerce para comercio, distribución y catálogos', 'InmoPub para inmobiliarias', 'UrbanPub para constructoras y desarrolladoras', 'DiceServices para servicios y operaciones'],
      impactTitle: 'No implementamos software. Implementamos procesos.',
      impact: ['Consultoría y diagnóstico', 'Implementación de plataforma', 'Integraciones con sistemas existentes', 'Automatización operativa', 'Evolución continua con IA'],
    },
    services: {
      seoTitle: 'Consultoría, plataforma, integraciones, automatización e IA',
      seoDescription: 'DiceProjects combina consultoría, plataforma propia, integraciones, automatización, copilotos IA y evolución continua para transformar operaciones empresariales.',
      eyebrow: 'Consultoría + plataforma + evolución',
      h1: 'Somos el partner tecnológico que diseña, implementa y evoluciona tu operación digital.',
      intro: 'La plataforma es la herramienta. El producto real es una operación más clara, conectada, medible y preparada para crecer.',
      cta: 'Quiero una propuesta',
      offersTitle: 'Lo que hacemos como partner tecnológico.',
      offers: [
        ['Consultoría', 'Analizamos procesos, personas, información, problemas, oportunidades y objetivos antes de definir tecnología.'],
        ['Implementación', 'Configuramos DiceProjects Platform, roles, módulos, datos, dashboards, documentos y flujos operativos.'],
        ['Integraciones', 'Conectamos sistemas existentes, APIs, bases, SharePoint, Drive, Excel, documentación y servicios externos.'],
        ['Evolución continua', 'Sumamos automatizaciones, IA, nuevos módulos, mejoras de procesos e indicadores a medida que el negocio cambia.'],
      ],
      examplesTitle: 'Soluciones que construimos sobre el Core.',
      examples: [
        ['Producto con carrito consultivo', 'Catálogo, solicitud, vendedor asignado y link de aprobación.'],
        ['Sitios asociados a productos', 'Landing, catálogo o portal conectado al backoffice, con leads, stock, campañas y cotizaciones.'],
        ['Integración entre sistemas', 'ERP, CRM, logística, administración, salud, seguros o sistemas propios que necesitan dejar de vivir aislados.'],
        ['Stock de productos y compras', 'Disponibilidad, reposición simple, proveedores, comparativas y adjudicación.'],
        ['Gestión comercial inmobiliaria', 'Mini portal inmobiliario con propiedades, consultas, visitas, documentos comerciales, seguimiento comercial y asesor web para captar oportunidades.'],
        ['Gestión de proyectos inmobiliarios y obra', 'Backoffice para constructoras y estudios de arquitectura con proyectos, partidas, recursos, costos vs precios, markup, margen, desvíos, KPIs, unidades vendibles y documentación comercial.'],
        ['Proyectos integrales', 'Servicios, automotores, instalaciones, mantenimiento y posventa.'],
        ['Asistente web con KB', 'Un chat público que conoce tu negocio, responde consultas, califica oportunidades y deriva a formulario, WhatsApp o backoffice.'],
        ['Copiloto de negocio', 'Agentes para documentos, datos, indicadores, ventas, compras y proyectos.'],
      ],
      implementationTitle: 'Implementación clara.',
      steps: [
        ['01', 'Diagnóstico', 'Entendemos operación, sistemas, dolores y oportunidades.'],
        ['02', 'Diseño', 'Definimos módulos, datos, permisos, automatizaciones e indicadores.'],
        ['03', 'Ejecución', 'Configuramos plataforma, integramos fuentes y entrenamos usuarios.'],
        ['04', 'Evolución', 'Medimos uso, ROI, costos AI y nuevos flujos.'],
      ],
      finalCta: 'Si tu empresa vive en planillas, mensajes y memoria humana, podemos validarlo con una prueba de 3 meses y luego escalar por suscripción.',
    },
    contact: {
      seoTitle: 'Diagnóstico de automatización y mejora de procesos',
      seoDescription: 'Solicitá un diagnóstico comercial para detectar oportunidades de automatización, integraciones, software operativo, suscripción modular y copiloto AI empresarial.',
      eyebrow: 'Diagnóstico ejecutivo',
      h1: 'Hablemos de dónde tu operación pierde tiempo, margen y control.',
      intro: 'Dejanos contexto. Te respondemos con quick wins, alcance, módulos, integraciones posibles y una prueba de 3 meses si hay un problema claro para validar.',
      directTitle: 'Una conversación bien hecha define mejor la suscripción que diez demos genéricas.',
      confidentiality: 'Confidencialidad desde el primer contacto',
      confidentialityCopy: 'Podemos hablar de procesos, sistemas, costos y problemas operativos con criterio profesional.',
      brief: 'Brief útil para venta',
      briefCopy: 'El formulario ordena el lead por necesidad, rubro, prioridad, módulos e impacto buscado.',
      formTitle: 'Agendar diagnóstico y prueba',
      formIntro: 'Completá el contexto mínimo y generamos un brief comercial accionable para definir suscripción, alcance y prueba de 3 meses si aplica.',
      labels: {
        name: 'Nombre',
        company: 'Empresa',
        email: 'Email corporativo',
        phone: 'Teléfono / WhatsApp',
        industry: 'Rubro',
        size: 'Tamaño aproximado',
        priority: 'Prioridad',
        interests: 'Qué querés resolver',
        pain: 'Principal dolor operativo',
        submit: 'Generar lead y enviar solicitud',
        note: 'La solicitud queda registrada para seguimiento comercial, diagnóstico y evaluación de prueba de 3 meses.',
      },
    },
  },
  en: {
    nav: {
      home: 'Home',
      solution: 'Platform',
      method: 'Services',
      insights: 'Cases',
      about: 'About us',
      contact: 'Contact',
      cta: 'Book assessment',
      menu: 'Menu',
      switch: 'Español',
    },
    footer: {
      statement: 'Technology partner to design, implement and evolve digital operations.',
      legal: 'Legal and transparency',
      solutions: 'Solutions',
      contact: 'Contact',
      diagnostic: 'Assessment',
      rights: 'All rights reserved.',
      line: 'Consulting • Platform • Continuous evolution',
      links: [
        'DiceProjects Platform',
        'Process automation',
        'Commercial operations',
        'Products and catalog',
        'Product inventory',
        'Real estate management',
        'Real estate development projects',
        'Marketing and leads',
        'Connected websites',
        'Quotes and procurement',
        'Projects and services',
        'Enterprise integrations',
        'Enterprise AI copilot',
      ],
    },
    home: {
      seoTitle: 'Technology partner for digital evolution, processes, platforms and AI',
      seoDescription: 'DiceProjects designs processes, implements platforms, connects systems and incorporates artificial intelligence to evolve digital business operations.',
      eyebrow: 'Strategic technology partner',
      h1: 'More than software. We evolve your company’s digital operation.',
      intro: 'We design processes, implement platforms, connect systems and incorporate artificial intelligence so your operation grows with your business.',
      primary: 'Book assessment',
      secondary: 'How we work',
      proof: ['Operational consulting', 'Own technology Core', 'Continuous evolution'],
      catalogTitle: 'First we understand the operation. Then we design technology.',
      catalogIntro: 'We do not start by writing code or selling modules. We map processes, people, information, problems and opportunities to build a digital operation that makes business sense.',
      catalog: [
        ['Processes', 'We understand how the company works, where time is lost and which decisions need better data.'],
        ['Technology', 'We implement a modular platform over a shared Core, without forcing the business into rigid systems.'],
        ['Data', 'We connect customers, suppliers, products, documents, case files, projects, campaigns and indicators.'],
        ['Automation', 'We reduce manual tasks, duplicate entry, informal approvals and operations that depend on human memory.'],
        ['Artificial intelligence', 'We incorporate copilots with context, permissions, business knowledge and cost control.'],
        ['Results', 'We measure adoption, time saved, traceability, margin, commercial opportunities and new processes to evolve.'],
        ['Integrations', 'We connect ERPs, CRMs, APIs, databases, Drive, SharePoint, Excel, documents and external services.'],
        ['Continuous evolution', 'The platform grows with new modules, automations, integrations and applied intelligence.'],
      ],
      workflowsTitle: 'DiceProjects Platform: one shared Core for specific solutions.',
      workflows: [
        ['Users, roles and permissions', 'Multi-company security, auditability and user scope to operate without mixing information.'],
        ['Workflow and case files', 'Processes, cases, documents, approvals, history and traceability in one ecosystem.'],
        ['Dashboards and marketing', 'Indicators, campaigns, web events, leads and opportunities connected to real operations.'],
        ['APIs and AI copilot', 'Open integrations and business assistants that work with context, permissions and owned knowledge.'],
      ],
      aiTitle: 'Vertical solutions over the same Core.',
      aiCopy: 'We do not sell isolated products. We build specialized BackOffices for each industry while reusing a common base, reducing implementation time and keeping a consistent experience.',
      aiBullets: ['DiceCommerce for commerce, distribution and catalogs', 'InmoPub for real estate teams', 'UrbanPub for builders and developers', 'DiceServices for services and operations'],
      impactTitle: 'We do not implement software. We implement processes.',
      impact: ['Consulting and assessment', 'Platform implementation', 'Integrations with existing systems', 'Operational automation', 'Continuous evolution with AI'],
    },
    services: {
      seoTitle: 'Consulting, platform, integrations, automation and AI',
      seoDescription: 'DiceProjects combines consulting, its own platform, integrations, automation, AI copilots and continuous evolution to transform business operations.',
      eyebrow: 'Consulting + platform + evolution',
      h1: 'We are the technology partner that designs, implements and evolves your digital operation.',
      intro: 'The platform is the tool. The real product is a clearer, connected, measurable operation ready to grow.',
      cta: 'Request proposal',
      offersTitle: 'What we do as a technology partner.',
      offers: [
        ['Consulting', 'We analyze processes, people, information, problems, opportunities and goals before defining technology.'],
        ['Implementation', 'We configure DiceProjects Platform, roles, modules, data, dashboards, documents and operational flows.'],
        ['Integrations', 'We connect existing systems, APIs, databases, SharePoint, Drive, Excel, documents and external services.'],
        ['Continuous evolution', 'We add automations, AI, new modules, process improvements and indicators as the business changes.'],
      ],
      examplesTitle: 'Solutions we build over the Core.',
      examples: [
        ['Consultative product cart', 'Catalog, request, assigned seller and approval link.'],
        ['Product-connected websites', 'Landing page, catalog or portal connected to the backoffice, with leads, inventory, campaigns and quotes.'],
        ['System-to-system integration', 'ERP, CRM, logistics, administration, healthcare, insurance or custom systems that need to stop living in isolation.'],
        ['Inventory and procurement', 'Replenishment, suppliers, comparisons and awards.'],
        ['Commercial real estate management', 'A real estate mini-portal with properties, inquiries, visits, commercial documents, sales follow-up and a website advisor to capture opportunities.'],
        ['Real estate development and construction project management', 'Backoffice for builders and architecture studios with projects, cost codes, resources, cost vs price, markup, margin, deviations, KPIs, sellable units and commercial documents.'],
        ['Integrated projects', 'Services, automotive, installations, maintenance and after-sales.'],
        ['Website assistant with KB', 'A public chat that knows your business, answers questions, qualifies opportunities and routes them to a form, WhatsApp or backoffice.'],
        ['Business copilot', 'Agents for documents, data, indicators, sales, procurement and projects.'],
      ],
      implementationTitle: 'Clear implementation.',
      steps: [
        ['01', 'Assessment', 'We understand operations, systems, pain points and opportunities.'],
        ['02', 'Design', 'We define modules, data, permissions, automation and indicators.'],
        ['03', 'Execution', 'We configure the platform, integrate sources and train users.'],
        ['04', 'Evolution', 'We measure adoption, ROI, AI costs and new workflows.'],
      ],
      finalCta: 'If your company runs on spreadsheets, messages and human memory, we can validate the value with a 3-month proof and then scale by subscription.',
    },
    contact: {
      seoTitle: 'Automation and process improvement assessment',
      seoDescription: 'Request a commercial assessment to identify automation, integrations, operating software and enterprise AI copilot opportunities.',
      eyebrow: 'Executive assessment',
      h1: 'Let’s find where your operation loses time, margin and control.',
      intro: 'Share context. We will respond with quick wins, scope, modules, possible integrations and a 3-month proof if there is a clear problem to validate.',
      directTitle: 'One sharp conversation defines the subscription better than ten generic demos.',
      confidentiality: 'Confidential from the first conversation',
      confidentialityCopy: 'We can discuss processes, systems, costs and operational issues with professional care.',
      brief: 'Sales-ready brief',
      briefCopy: 'The form structures the lead by need, industry, priority, modules and expected impact.',
      formTitle: 'Book assessment and proof',
      formIntro: 'Complete the minimum context and we generate an actionable commercial brief to define subscription, scope and a 3-month proof when it applies.',
      labels: {
        name: 'Name',
        company: 'Company',
        email: 'Business email',
        phone: 'Phone / WhatsApp',
        industry: 'Industry',
        size: 'Approximate size',
        priority: 'Priority',
        interests: 'What do you want to solve?',
        pain: 'Main operational pain',
        submit: 'Generate lead and send request',
        note: 'Your request is registered for commercial follow-up, assessment and 3-month proof evaluation.',
      },
    },
  },
  pt: {
    nav: {
      home: 'Início',
      solution: 'Plataforma',
      method: 'Serviços',
      insights: 'Casos',
      about: 'Nós',
      contact: 'Contato',
      cta: 'Agendar diagnóstico',
      menu: 'Menu',
      switch: 'Español',
    },
    footer: {
      statement: 'Partner tecnológico para desenhar, implementar e evoluir operações digitais.',
      legal: 'Legal e transparência',
      solutions: 'Soluções',
      contact: 'Contato',
      diagnostic: 'Diagnóstico',
      rights: 'Todos os direitos reservados.',
      line: 'Consultoria • Plataforma • Evolução contínua',
      links: [
        'DiceProjects Platform',
        'Automação de processos',
        'Gestão comercial',
        'Produtos e catálogo',
        'Estoque de produtos',
        'Gestão imobiliária',
        'Projetos imobiliários e obra',
        'Marketing e leads',
        'Sites conectados',
        'Orçamentos e cotações',
        'Projetos e serviços',
        'Integrações empresariais',
        'Copiloto AI empresarial',
      ],
    },
    home: {
      seoTitle: 'Partner tecnológico para evolução digital, processos, plataformas e IA',
      seoDescription: 'DiceProjects desenha processos, implementa plataformas, conecta sistemas e incorpora inteligência artificial para evoluir a operação digital de empresas.',
      eyebrow: 'Partner tecnológico estratégico',
      h1: 'Mais que software. Evoluímos a operação digital da sua empresa.',
      intro: 'Desenhamos processos, implementamos plataformas, conectamos sistemas e incorporamos inteligência artificial para que sua operação cresça junto com seu negócio.',
      primary: 'Agendar diagnóstico',
      secondary: 'Ver como trabalhamos',
      proof: ['Consultoria operacional', 'Core tecnológico próprio', 'Evolução contínua'],
      catalogTitle: 'Primeiro entendemos a operação. Depois desenhamos tecnologia.',
      catalogIntro: 'Não começamos escrevendo código nem vendendo módulos. Mapeamos processos, pessoas, informação, problemas e oportunidades para construir uma operação digital com sentido para o negócio.',
      catalog: [
        ['Processos', 'Entendemos como a empresa trabalha, onde perde tempo e quais decisões precisam de melhores dados.'],
        ['Tecnologia', 'Implementamos uma plataforma modular sobre um Core comum, sem forçar o negócio a sistemas rígidos.'],
        ['Dados', 'Conectamos clientes, fornecedores, produtos, documentos, expedientes, projetos, campanhas e indicadores.'],
        ['Automação', 'Reduzimos tarefas manuais, dupla digitação, aprovações informais e operações que dependem de memória humana.'],
        ['Inteligência artificial', 'Incorporamos copilotos com contexto, permissões, conhecimento do negócio e controle de custos.'],
        ['Resultados', 'Medimos adoção, tempos, rastreabilidade, margem, oportunidades comerciais e novos processos para evoluir.'],
        ['Integrações', 'Conectamos ERPs, CRMs, APIs, bancos, Drive, SharePoint, Excel, documentos e serviços externos.'],
        ['Evolução contínua', 'A plataforma cresce com novos módulos, automações, integrações e inteligência aplicada.'],
      ],
      workflowsTitle: 'DiceProjects Platform: um Core comum para construir soluções específicas.',
      workflows: [
        ['Usuários, papéis e permissões', 'Multiempresa, segurança, auditoria e alcance por usuário para operar sem misturar informação.'],
        ['Workflow e expedientes', 'Processos, casos, documentos, aprovações, histórico e rastreabilidade em um mesmo ecossistema.'],
        ['Dashboards e marketing', 'Indicadores, campanhas, eventos web, leads e oportunidades conectadas à operação real.'],
        ['APIs e copiloto IA', 'Integrações abertas e assistentes empresariais que trabalham com contexto, permissões e conhecimento próprio.'],
      ],
      aiTitle: 'Soluções verticais sobre o mesmo Core.',
      aiCopy: 'Não vendemos produtos isolados. Construímos BackOffices especializados para cada indústria reutilizando uma base comum, reduzindo tempos de implementação e mantendo uma experiência consistente.',
      aiBullets: ['DiceCommerce para comércio, distribuição e catálogos', 'InmoPub para imobiliárias', 'UrbanPub para construtoras e incorporadoras', 'DiceServices para serviços e operações'],
      impactTitle: 'Não implementamos software. Implementamos processos.',
      impact: ['Consultoria e diagnóstico', 'Implementação da plataforma', 'Integrações com sistemas existentes', 'Automação operacional', 'Evolução contínua com IA'],
    },
    services: {
      seoTitle: 'Consultoria, plataforma, integrações, automação e IA',
      seoDescription: 'DiceProjects combina consultoria, plataforma própria, integrações, automação, copilotos IA e evolução contínua para transformar operações empresariais.',
      eyebrow: 'Consultoria + plataforma + evolução',
      h1: 'Somos o partner tecnológico que desenha, implementa e evolui sua operação digital.',
      intro: 'A plataforma é a ferramenta. O produto real é uma operação mais clara, conectada, mensurável e preparada para crescer.',
      cta: 'Quero uma proposta',
      offersTitle: 'O que fazemos como partner tecnológico.',
      offers: [
        ['Consultoria', 'Analisamos processos, pessoas, informação, problemas, oportunidades e objetivos antes de definir tecnologia.'],
        ['Implementação', 'Configuramos DiceProjects Platform, papéis, módulos, dados, dashboards, documentos e fluxos operacionais.'],
        ['Integrações', 'Conectamos sistemas existentes, APIs, bancos, SharePoint, Drive, Excel, documentos e serviços externos.'],
        ['Evolução contínua', 'Somamos automações, IA, novos módulos, melhorias de processos e indicadores conforme o negócio muda.'],
      ],
      examplesTitle: 'Soluções que construímos sobre o Core.',
      examples: [
        ['Produto com carrinho consultivo', 'Catálogo, solicitação, vendedor atribuído e link de aprovação.'],
        ['Sites associados a produtos', 'Landing, catálogo ou portal conectado ao backoffice, com leads, estoque, campanhas e cotações.'],
        ['Integração entre sistemas', 'ERP, CRM, logística, administração, saúde, seguros ou sistemas próprios que precisam deixar de viver isolados.'],
        ['Estoque de produtos e compras', 'Disponibilidade, reposição simples, fornecedores, comparativos e adjudicação.'],
        ['Gestão comercial imobiliária', 'Mini portal imobiliário com imóveis, consultas, visitas, documentos comerciais, acompanhamento comercial e assistente web para captar oportunidades.'],
        ['Gestão de projetos imobiliários e obra', 'Backoffice para construtoras e estúdios de arquitetura com projetos, partidas, recursos, custos vs preços, markup, margem, desvios, KPIs, unidades vendáveis e documentos comerciais.'],
        ['Projetos integrais', 'Serviços, automotivo, instalações, manutenção e pós-venda.'],
        ['Assistente web com KB', 'Um chat público que conhece seu negócio, responde consultas, qualifica oportunidades e encaminha para formulário, WhatsApp ou backoffice.'],
        ['Copiloto de negócio', 'Agentes para documentos, dados, indicadores, vendas, compras e projetos.'],
      ],
      implementationTitle: 'Implementação clara.',
      steps: [
        ['01', 'Diagnóstico', 'Entendemos operação, sistemas, dores e oportunidades.'],
        ['02', 'Desenho', 'Definimos módulos, dados, permissões, automações e indicadores.'],
        ['03', 'Execução', 'Configuramos a plataforma, integramos fontes e treinamos usuários.'],
        ['04', 'Evolução', 'Medimos uso, ROI, custos de AI e novos fluxos.'],
      ],
      finalCta: 'Se sua empresa vive em planilhas, mensagens e memória humana, podemos validar o valor com uma prova de 3 meses e depois escalar por assinatura.',
    },
    contact: {
      seoTitle: 'Diagnóstico de automação e melhoria de processos',
      seoDescription: 'Solicite um diagnóstico comercial para detectar oportunidades de automação, integrações, software operacional, assinatura modular e copiloto AI empresarial.',
      eyebrow: 'Diagnóstico executivo',
      h1: 'Vamos encontrar onde sua operação perde tempo, margem e controle.',
      intro: 'Deixe o contexto. Respondemos com quick wins, escopo, módulos, integrações possíveis e uma prova de 3 meses se houver um problema claro para validar.',
      directTitle: 'Uma conversa bem feita define melhor a assinatura que dez demos genéricas.',
      confidentiality: 'Confidencialidade desde o primeiro contato',
      confidentialityCopy: 'Podemos falar de processos, sistemas, custos e problemas operacionais com critério profissional.',
      brief: 'Brief útil para venda',
      briefCopy: 'O formulário organiza o lead por necessidade, segmento, prioridade, módulos e impacto buscado.',
      formTitle: 'Agendar diagnóstico e prova',
      formIntro: 'Complete o contexto mínimo e geramos um brief comercial acionável para definir assinatura, escopo e prova de 3 meses quando aplicar.',
      labels: {
        name: 'Nome',
        company: 'Empresa',
        email: 'Email corporativo',
        phone: 'Telefone / WhatsApp',
        industry: 'Segmento',
        size: 'Tamanho aproximado',
        priority: 'Prioridade',
        interests: 'O que você quer resolver',
        pain: 'Principal dor operacional',
        submit: 'Gerar lead e enviar solicitação',
        note: 'A solicitação fica registrada para acompanhamento comercial, diagnóstico e avaliação de prova de 3 meses.',
      },
    },
  },
} as const;
