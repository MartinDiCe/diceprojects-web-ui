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
      solution: 'Solución',
      method: 'Método',
      insights: 'Insights',
      about: 'Sobre',
      contact: 'Contacto',
      cta: 'Agendar diagnóstico',
      menu: 'Menú',
      switch: 'English',
    },
    footer: {
      statement: 'Plataforma, automatización e inteligencia para ordenar operaciones y vender mejor.',
      legal: 'Legal y transparencia',
      solutions: 'Soluciones',
      contact: 'Contacto',
      diagnostic: 'Diagnóstico',
      rights: 'Todos los derechos reservados.',
      line: 'Producto empresarial • Automatización • Copiloto AI',
      links: [
        'Plataforma empresarial',
        'Automatización de procesos',
        'Gestión comercial',
        'Productos y catálogo',
        'Stock de productos',
        'Marketing y leads',
        'Sitios conectados',
        'Presupuestos y cotizaciones',
        'Proyectos y servicios',
        'Integraciones empresariales',
        'Copiloto AI empresarial',
      ],
    },
    home: {
      seoTitle: 'Plataforma empresarial multirubro para automatización, operación y copiloto AI',
      seoDescription: 'Dice Projects centraliza ventas, compras, productos, proyectos, servicios, stock, marketing, integraciones, KPIs y copiloto AI en una plataforma operativa multirubro.',
      eyebrow: 'Enterprise operations platform',
      h1: 'Operación conectada. Decisiones con datos. AI lista para trabajar.',
      intro: 'Centralizá ventas, compras, productos, stock, proyectos, marketing e integraciones en una misma plataforma. Sumá copilotos que entienden tu negocio y respetan permisos.',
      primary: 'Agendar diagnóstico',
      secondary: 'Ver solución',
      proof: ['Multiempresa', 'Procesos trazables', 'AI con contexto'],
      catalogTitle: 'Una plataforma modular para operar mejor.',
      catalogIntro: 'Activá los módulos que tu empresa necesita hoy y escalá hacia automatización, reporting e inteligencia empresarial sin rediseñar todo.',
      catalog: [
        ['Ventas y cotizaciones', 'Carritos consultivos, propuestas, links de aprobación y seguimiento comercial.'],
        ['Compras y proveedores', 'Solicitudes simultáneas, comparativas, adjudicación y trazabilidad de costos.'],
        ['Productos y stock', 'Catálogo, precios, puntos de stock, movimientos simples y disponibilidad por tienda o canal.'],
        ['Proyectos y servicios', 'Obras, servicios integrales, hitos, recursos, costos, avances y desvíos.'],
        ['Marketing y demanda', 'Leads, campañas, formularios, eventos web y señales de interés.'],
        ['Sitios conectados', 'Catálogos, portales y landings conectados a productos, campañas, stock y cotizaciones.'],
        ['Copiloto empresarial', 'Agentes, documentos, sistemas, indicadores, conocimiento por empresa y control de costos.'],
      ],
      workflowsTitle: 'Flujos de negocio, no pantallas sueltas.',
      workflows: [
        ['Carrito a cotización', 'El cliente arma una solicitud, el vendedor responde y el link inteligente registra aprobación, rechazo o cambios.'],
        ['Compra inteligente', 'Si falta mercadería, pedís presupuesto a varios proveedores y adjudicás por costo, plazo o condición.'],
        ['Eventos web a venta', 'La web captura intereses, campañas y productos vistos para accionar sobre leads reales.'],
        ['Proyecto a rentabilidad', 'Seguís recursos, avances, costos, certificaciones y KPIs por empresa o unidad.'],
      ],
      aiTitle: 'Bot para sitios web conectado al backoffice.',
      aiCopy: 'Podés convertir el chat en un asesor público: responde preguntas del sitio, explica servicios, captura leads y deriva oportunidades al backoffice con contexto.',
      aiBullets: ['Responde como vendedor consultivo', 'Usa contenido aprobado del sitio', 'Crea leads y conversaciones', 'Escala a humano cuando corresponde'],
      impactTitle: 'Menos fricción. Más margen. Mejor control.',
      impact: ['Menos tareas manuales', 'Dato único entre áreas', 'Trazabilidad y permisos', 'KPIs accionables', 'AI con gobierno'],
    },
    services: {
      seoTitle: 'Catálogo de servicios y plataforma empresarial multirubro',
      seoDescription: 'Implementamos una plataforma empresarial para organización, productos, ventas, compras, stock, proyectos, marketing, seguridad, integraciones, KPIs y copiloto AI.',
      eyebrow: 'Product + automation + AI',
      h1: 'Diseñamos el sistema operativo de tu negocio.',
      intro: 'Combinamos plataforma, consultoría e integraciones para ordenar operación, automatizar flujos y crear inteligencia aplicable.',
      cta: 'Quiero una propuesta',
      offersTitle: 'Tres formas de empezar.',
      offers: [
        ['Blueprint operativo', 'Mapa de procesos, módulos, datos, permisos, ROI y quick wins.'],
        ['Implementación de plataforma', 'Configuración de módulos, roles, catálogos, dashboards y flujos.'],
        ['Sitios conectados al backoffice', 'Webs, catálogos y portales comerciales conectados a productos, campañas, leads y cotizaciones.'],
        ['Copiloto e integraciones AI', 'Documentos, sistemas, datos, conocimiento de la empresa, agentes y control de costos.'],
      ],
      examplesTitle: 'Casos que se pueden activar.',
      examples: [
        ['Producto con carrito consultivo', 'Catálogo, solicitud, vendedor asignado y link de aprobación.'],
        ['Sitios asociados a productos', 'Landing, catálogo o portal conectado al backoffice, con leads, stock, campañas y cotizaciones.'],
        ['Stock de productos y compras', 'Disponibilidad, reposición simple, proveedores, comparativas y adjudicación.'],
        ['Proyectos integrales', 'Servicios, automotores, instalaciones, mantenimiento y posventa.'],
        ['Copiloto de negocio', 'Agentes para documentos, datos, indicadores, ventas, compras y proyectos.'],
      ],
      implementationTitle: 'Implementación clara.',
      steps: [
        ['01', 'Diagnóstico', 'Entendemos operación, sistemas, dolores y oportunidades.'],
        ['02', 'Diseño', 'Definimos módulos, datos, permisos, automatizaciones e indicadores.'],
        ['03', 'Ejecución', 'Configuramos plataforma, integramos fuentes y entrenamos usuarios.'],
        ['04', 'Evolución', 'Medimos uso, ROI, costos AI y nuevos flujos.'],
      ],
      finalCta: 'Si tu empresa vive en planillas, mensajes y memoria humana, hay valor listo para capturar.',
    },
    contact: {
      seoTitle: 'Diagnóstico de automatización y mejora de procesos',
      seoDescription: 'Solicitá un diagnóstico comercial para detectar oportunidades de automatización, integraciones, software operativo y copiloto AI empresarial.',
      eyebrow: 'Diagnóstico ejecutivo',
      h1: 'Hablemos de dónde tu operación pierde tiempo, margen y control.',
      intro: 'Dejanos contexto. Te respondemos con quick wins, alcance, módulos e integraciones posibles.',
      directTitle: 'Una conversación bien hecha vale más que diez demos genéricas.',
      confidentiality: 'Confidencialidad desde el primer contacto',
      confidentialityCopy: 'Podemos hablar de procesos, sistemas, costos y problemas operativos con criterio profesional.',
      brief: 'Brief útil para venta',
      briefCopy: 'El formulario ordena el lead por necesidad, rubro, prioridad, módulos e impacto buscado.',
      formTitle: 'Agendar diagnóstico',
      formIntro: 'Completá el contexto mínimo y generamos un brief comercial accionable.',
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
        note: 'La solicitud queda registrada para seguimiento comercial y diagnóstico.',
      },
    },
  },
  en: {
    nav: {
      home: 'Home',
      solution: 'Solution',
      method: 'Method',
      insights: 'Insights',
      about: 'About',
      contact: 'Contact',
      cta: 'Book assessment',
      menu: 'Menu',
      switch: 'Español',
    },
    footer: {
      statement: 'Platform, automation and intelligence to run cleaner operations and sell better.',
      legal: 'Legal and transparency',
      solutions: 'Solutions',
      contact: 'Contact',
      diagnostic: 'Assessment',
      rights: 'All rights reserved.',
      line: 'Enterprise product • Automation • AI copilot',
      links: [
        'Enterprise platform',
        'Process automation',
        'Commercial operations',
        'Products and catalog',
        'Product inventory',
        'Marketing and leads',
        'Connected websites',
        'Quotes and procurement',
        'Projects and services',
        'Enterprise integrations',
        'Enterprise AI copilot',
      ],
    },
    home: {
      seoTitle: 'Enterprise platform for operations, automation and AI copilots',
      seoDescription: 'Dice Projects connects sales, procurement, products, projects, inventory, marketing, integrations, KPIs and AI copilots in one enterprise operating platform.',
      eyebrow: 'Enterprise operations platform',
      h1: 'Connected operations. Data-led decisions. AI ready to work.',
      intro: 'Unify sales, procurement, products, inventory, projects, marketing and integrations in one platform. Add copilots that understand your business and respect permissions.',
      primary: 'Book assessment',
      secondary: 'Explore solution',
      proof: ['Multi-company', 'Traceable workflows', 'Context-aware AI'],
      catalogTitle: 'A modular platform to operate better.',
      catalogIntro: 'Activate what your company needs today, then scale into automation, reporting and enterprise intelligence without redesigning everything.',
      catalog: [
        ['Sales and quotes', 'Consultative carts, proposals, approval links and commercial follow-up.'],
        ['Procurement', 'Multi-supplier requests, comparisons, awards and cost traceability.'],
        ['Products and inventory', 'Catalog, pricing, product stock points, simple movements and availability by store or channel.'],
        ['Projects and services', 'Projects, integrated services, milestones, resources, costs, progress and deviations.'],
        ['Marketing and demand', 'Leads, campaigns, forms, web events and buying signals.'],
        ['Connected websites', 'Catalogs, portals and landing pages connected to products, campaigns, inventory and quotes.'],
        ['Enterprise copilot', 'Agents, documents, business systems, KPIs, company knowledge and cost control.'],
      ],
      workflowsTitle: 'Business workflows, not disconnected screens.',
      workflows: [
        ['Cart to quote', 'Customers submit a request, sales respond, and a smart link tracks approval, rejection or changes.'],
        ['Smart procurement', 'When product stock is missing, request quotes from suppliers and award by cost, timing or terms.'],
        ['Web events to sales', 'Capture interests, campaigns and viewed products to act on real buying signals.'],
        ['Project to profitability', 'Track resources, progress, costs, certifications and KPIs by company or unit.'],
      ],
      aiTitle: 'Website bot connected to the backoffice.',
      aiCopy: 'Turn chat into a public advisor: answer site questions, explain services, capture leads and route opportunities with context.',
      aiBullets: ['Answers like a consultative seller', 'Uses approved website content', 'Creates leads and conversations', 'Escalates to a human when needed'],
      impactTitle: 'Less friction. More margin. Better control.',
      impact: ['Less manual work', 'One source of truth', 'Traceability and permissions', 'Actionable KPIs', 'Governed AI'],
    },
    services: {
      seoTitle: 'Enterprise services catalog and multi-industry platform',
      seoDescription: 'We implement an enterprise platform for sales, procurement, products, inventory, projects, marketing, security, integrations, KPIs and AI copilots.',
      eyebrow: 'Product + automation + AI',
      h1: 'We design your business operating system.',
      intro: 'We combine platform, consulting and integrations to structure operations, automate workflows and create useful intelligence.',
      cta: 'Request proposal',
      offersTitle: 'Three ways to start.',
      offers: [
        ['Operational blueprint', 'Processes, modules, data, permissions, ROI and quick wins.'],
        ['Platform implementation', 'Modules, roles, catalogs, dashboards and workflows.'],
        ['Backoffice-connected websites', 'Websites, catalogs and commercial portals connected to products, campaigns, leads and quotes.'],
        ['AI copilot and integrations', 'Documents, systems, business data, company knowledge, agents and cost governance.'],
      ],
      examplesTitle: 'Use cases you can activate.',
      examples: [
        ['Consultative product cart', 'Catalog, request, assigned seller and approval link.'],
        ['Product-connected websites', 'Landing page, catalog or portal connected to the backoffice, with leads, inventory, campaigns and quotes.'],
        ['Inventory and procurement', 'Replenishment, suppliers, comparisons and awards.'],
        ['Integrated projects', 'Services, automotive, installations, maintenance and after-sales.'],
        ['Business copilot', 'Agents for documents, data, indicators, sales, procurement and projects.'],
      ],
      implementationTitle: 'Clear implementation.',
      steps: [
        ['01', 'Assessment', 'We understand operations, systems, pain points and opportunities.'],
        ['02', 'Design', 'We define modules, data, permissions, automation and indicators.'],
        ['03', 'Execution', 'We configure the platform, integrate sources and train users.'],
        ['04', 'Evolution', 'We measure adoption, ROI, AI costs and new workflows.'],
      ],
      finalCta: 'If your company runs on spreadsheets, messages and human memory, there is value ready to capture.',
    },
    contact: {
      seoTitle: 'Automation and process improvement assessment',
      seoDescription: 'Request a commercial assessment to identify automation, integrations, operating software and enterprise AI copilot opportunities.',
      eyebrow: 'Executive assessment',
      h1: 'Let’s find where your operation loses time, margin and control.',
      intro: 'Share context. We will respond with quick wins, scope, modules and possible integrations.',
      directTitle: 'One sharp conversation beats ten generic demos.',
      confidentiality: 'Confidential from the first conversation',
      confidentialityCopy: 'We can discuss processes, systems, costs and operational issues with professional care.',
      brief: 'Sales-ready brief',
      briefCopy: 'The form structures the lead by need, industry, priority, modules and expected impact.',
      formTitle: 'Book assessment',
      formIntro: 'Complete the minimum context and we generate an actionable commercial brief.',
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
        note: 'Your request is registered for commercial follow-up and assessment.',
      },
    },
  },
  pt: {
    nav: {
      home: 'Início',
      solution: 'Solução',
      method: 'Método',
      insights: 'Insights',
      about: 'Sobre',
      contact: 'Contato',
      cta: 'Agendar diagnóstico',
      menu: 'Menu',
      switch: 'Español',
    },
    footer: {
      statement: 'Plataforma, automação e inteligência para organizar operações e vender melhor.',
      legal: 'Legal e transparência',
      solutions: 'Soluções',
      contact: 'Contato',
      diagnostic: 'Diagnóstico',
      rights: 'Todos os direitos reservados.',
      line: 'Produto empresarial • Automação • Copiloto AI',
      links: [
        'Plataforma empresarial',
        'Automação de processos',
        'Gestão comercial',
        'Produtos e catálogo',
        'Estoque de produtos',
        'Marketing e leads',
        'Sites conectados',
        'Orçamentos e cotações',
        'Projetos e serviços',
        'Integrações empresariais',
        'Copiloto AI empresarial',
      ],
    },
    home: {
      seoTitle: 'Plataforma empresarial multissetorial para automação, operação e copiloto AI',
      seoDescription: 'Dice Projects centraliza vendas, compras, produtos, projetos, serviços, estoque, marketing, integrações, KPIs e copiloto AI em uma plataforma operacional multissetorial.',
      eyebrow: 'Enterprise operations platform',
      h1: 'Operação conectada. Decisões com dados. AI pronta para trabalhar.',
      intro: 'Centralize vendas, compras, produtos, estoque, projetos, marketing e integrações em uma mesma plataforma. Some copilotos que entendem seu negócio e respeitam permissões.',
      primary: 'Agendar diagnóstico',
      secondary: 'Ver solução',
      proof: ['Multiempresa', 'Processos rastreáveis', 'AI com contexto'],
      catalogTitle: 'Uma plataforma modular para operar melhor.',
      catalogIntro: 'Ative os módulos que sua empresa precisa hoje e evolua para automação, relatórios e inteligência empresarial sem redesenhar tudo.',
      catalog: [
        ['Vendas e cotações', 'Carrinhos consultivos, propostas, links de aprovação e acompanhamento comercial.'],
        ['Compras e fornecedores', 'Solicitações simultâneas, comparativos, adjudicação e rastreabilidade de custos.'],
        ['Produtos e estoque', 'Catálogo, preços, pontos de estoque, movimentos simples e disponibilidade por loja ou canal.'],
        ['Projetos e serviços', 'Obras, serviços integrais, marcos, recursos, custos, avanços e desvios.'],
        ['Marketing e demanda', 'Leads, campanhas, formulários, eventos web e sinais de interesse.'],
        ['Sites conectados', 'Catálogos, portais e landing pages conectados a produtos, campanhas, estoque e cotações.'],
        ['Copiloto empresarial', 'Agentes, documentos, sistemas, indicadores, conhecimento por empresa e controle de custos.'],
      ],
      workflowsTitle: 'Fluxos de negócio, não telas soltas.',
      workflows: [
        ['Carrinho para cotação', 'O cliente monta uma solicitação, o vendedor responde e o link inteligente registra aprovação, rejeição ou mudanças.'],
        ['Compra inteligente', 'Se faltar mercadoria, peça orçamento a vários fornecedores e adjudique por custo, prazo ou condição.'],
        ['Eventos web para vendas', 'A web captura interesses, campanhas e produtos vistos para acionar leads reais.'],
        ['Projeto para rentabilidade', 'Acompanhe recursos, avanços, custos, certificações e KPIs por empresa ou unidade.'],
      ],
      aiTitle: 'Bot para sites conectado ao backoffice.',
      aiCopy: 'Você pode transformar o chat em um consultor público: responde perguntas do site, explica serviços, captura leads e encaminha oportunidades ao backoffice com contexto.',
      aiBullets: ['Responde como vendedor consultivo', 'Usa conteúdo aprovado do site', 'Cria leads e conversas', 'Escala para humano quando corresponde'],
      impactTitle: 'Menos atrito. Mais margem. Mais controle.',
      impact: ['Menos tarefas manuais', 'Dado único entre áreas', 'Rastreabilidade e permissões', 'KPIs acionáveis', 'AI com governança'],
    },
    services: {
      seoTitle: 'Catálogo de serviços e plataforma empresarial multissetorial',
      seoDescription: 'Implementamos uma plataforma empresarial para organização, produtos, vendas, compras, estoque, projetos, marketing, segurança, integrações, KPIs e copiloto AI.',
      eyebrow: 'Product + automation + AI',
      h1: 'Desenhamos o sistema operacional do seu negócio.',
      intro: 'Combinamos plataforma, consultoria e integrações para organizar a operação, automatizar fluxos e criar inteligência aplicável.',
      cta: 'Quero uma proposta',
      offersTitle: 'Três formas de começar.',
      offers: [
        ['Blueprint operacional', 'Mapa de processos, módulos, dados, permissões, ROI e quick wins.'],
        ['Implementação da plataforma', 'Configuração de módulos, papéis, catálogos, dashboards e fluxos.'],
        ['Sites conectados ao backoffice', 'Webs, catálogos e portais comerciais conectados a produtos, campanhas, leads e cotações.'],
        ['Copiloto e integrações AI', 'Documentos, sistemas, dados, conhecimento da empresa, agentes e controle de custos.'],
      ],
      examplesTitle: 'Casos que podem ser ativados.',
      examples: [
        ['Produto com carrinho consultivo', 'Catálogo, solicitação, vendedor atribuído e link de aprovação.'],
        ['Sites associados a produtos', 'Landing, catálogo ou portal conectado ao backoffice, com leads, estoque, campanhas e cotações.'],
        ['Estoque de produtos e compras', 'Disponibilidade, reposição simples, fornecedores, comparativos e adjudicação.'],
        ['Projetos integrais', 'Serviços, automotivo, instalações, manutenção e pós-venda.'],
        ['Copiloto de negócio', 'Agentes para documentos, dados, indicadores, vendas, compras e projetos.'],
      ],
      implementationTitle: 'Implementação clara.',
      steps: [
        ['01', 'Diagnóstico', 'Entendemos operação, sistemas, dores e oportunidades.'],
        ['02', 'Desenho', 'Definimos módulos, dados, permissões, automações e indicadores.'],
        ['03', 'Execução', 'Configuramos a plataforma, integramos fontes e treinamos usuários.'],
        ['04', 'Evolução', 'Medimos uso, ROI, custos de AI e novos fluxos.'],
      ],
      finalCta: 'Se sua empresa vive em planilhas, mensagens e memória humana, há valor pronto para capturar.',
    },
    contact: {
      seoTitle: 'Diagnóstico de automação e melhoria de processos',
      seoDescription: 'Solicite um diagnóstico comercial para detectar oportunidades de automação, integrações, software operacional e copiloto AI empresarial.',
      eyebrow: 'Diagnóstico executivo',
      h1: 'Vamos encontrar onde sua operação perde tempo, margem e controle.',
      intro: 'Deixe o contexto. Respondemos com quick wins, escopo, módulos e integrações possíveis.',
      directTitle: 'Uma conversa bem feita vale mais que dez demos genéricas.',
      confidentiality: 'Confidencialidade desde o primeiro contato',
      confidentialityCopy: 'Podemos falar de processos, sistemas, custos e problemas operacionais com critério profissional.',
      brief: 'Brief útil para venda',
      briefCopy: 'O formulário organiza o lead por necessidade, segmento, prioridade, módulos e impacto buscado.',
      formTitle: 'Agendar diagnóstico',
      formIntro: 'Complete o contexto mínimo e geramos um brief comercial acionável.',
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
        note: 'A solicitação fica registrada para acompanhamento comercial e diagnóstico.',
      },
    },
  },
} as const;
