import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const domain = 'https://diceprojects.com';
const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': domain,
  name: 'Dice Projects',
  url: domain,
  logo: `${domain}/assets/logos/dice-logo-positivo.webp`,
  email: 'mdice@diceprojects.com',
  telephone: '+54 11 7246 6605',
  sameAs: ['https://linkedin.com/company/dice-projects'],
};

const pages = [
  {
    path: '/',
    title: 'Dice Projects | Plataforma empresarial, automatización y copiloto AI',
    description: 'Plataforma empresarial multirubro para organizar ventas, compras, productos, stock, proyectos, marketing, integraciones, KPIs y copiloto AI con datos reales.',
    h1: 'Tecnología y automatización para operar empresas con orden, datos y control.',
    intro: 'Diseñamos, integramos e implementamos una plataforma operativa para conectar procesos, equipos y decisiones.',
  },
  {
    path: '/automatizacion-y-orquestacion',
    title: 'Automatización y orquestación empresarial',
    description: 'Automatización y orquestación empresarial para integrar procesos, sistemas, datos y equipos en una operación medible.',
    h1: 'Automatización y orquestación para empresas que necesitan operar mejor.',
    intro: 'Convertimos procesos dispersos en flujos conectados, trazables y preparados para crecer.',
  },
  {
    path: '/plataforma-empresarial-multirubro',
    title: 'Plataforma empresarial multirubro',
    description: 'Plataforma empresarial multirubro para centralizar organización, ventas, compras, productos, stock, proyectos, marketing, indicadores, integraciones y copiloto AI.',
    h1: 'Una plataforma empresarial para operar distintos rubros con orden, datos y control.',
    intro: 'Activá módulos según necesidad y conectá la operación comercial, administrativa y estratégica.',
  },
  {
    path: '/automatizacion-de-procesos',
    title: 'Automatización de procesos empresariales',
    description: 'Automatización de procesos empresariales para reducir tareas manuales, integrar sistemas, ordenar flujos de trabajo y medir KPIs operativos.',
    h1: 'Automatización de procesos para empresas que necesitan crecer sin sumar caos.',
    intro: 'Diseñamos flujos con responsables, permisos, integraciones e indicadores para reducir fricción operativa.',
  },
  {
    path: '/gestion-comercial-crm-operativo',
    title: 'Gestión comercial y CRM operativo',
    description: 'Gestión comercial con clientes, vendedores, prospectos, cotizaciones, campañas, seguimiento, propuestas y dashboards comerciales.',
    h1: 'Un CRM operativo conectado con cotizaciones, productos, compras y marketing.',
    intro: 'Ordená clientes, vendedores, prospectos y oportunidades con información real para vender mejor.',
  },
  {
    path: '/gestion-productos-catalogo-web',
    title: 'Gestión de productos y catálogo web',
    description: 'Gestión de productos, catálogo web, precios, imágenes, atributos, marcas, canales de publicación, importación y reglas comerciales.',
    h1: 'Catálogo de productos listo para vender, publicar, cotizar y controlar.',
    intro: 'Centralizá artículos, SKU, precios, imágenes, atributos y canales sin duplicar información.',
  },
  {
    path: '/gestion-stock-productos-inventario',
    title: 'Gestión de stock de productos e inventario',
    description: 'Gestión simple de stock de productos, movimientos, disponibilidad e inventario conectado con catálogo, ventas y compras.',
    h1: 'Stock de productos conectado con ventas, compras y catálogo.',
    intro: 'Controlá disponibilidad, movimientos, ajustes y reposición con trazabilidad operativa.',
  },
  {
    path: '/marketing-leads-campanas-embudos',
    title: 'Marketing, leads, campañas y embudos',
    description: 'Marketing operativo con prospectos, formularios públicos, campañas, embudos, cupones, destacados, señales de producto y derivación a ventas.',
    h1: 'Capturá demanda, medí señales y conectá marketing con ventas.',
    intro: 'Transformá formularios, campañas y productos en oportunidades comerciales trazables.',
  },
  {
    path: '/sitios-conectados-backoffice-cotizaciones',
    title: 'Sitios web conectados al backoffice y cotizaciones',
    description: 'Creamos sitios, catálogos, portales y landings conectados a productos, stock, campañas, clientes, vendedores y cotizaciones dentro del backoffice Dice Projects.',
    h1: 'Sitios públicos que funcionan como canales comerciales conectados al backoffice.',
    intro: 'Conectamos catálogos, formularios y cotizaciones al flujo operativo para que cada consulta sea accionable.',
  },
  {
    path: '/software-gestion-obras-servicios',
    title: 'Software para gestión de obras y servicios integrales',
    description: 'Sistema para gestionar obras, servicios integrales, avances, recursos, costos, compras, aprobaciones y reportes por proyecto.',
    h1: 'Gestión de obras y servicios con control de avances, costos y ejecución.',
    intro: 'Centralizá proyectos, recursos, compras, presupuestos y reportes para operar con información confiable.',
  },
  {
    path: '/presupuestos-cotizaciones-compras',
    title: 'Presupuestos, cotizaciones y compras empresariales',
    description: 'Solución para presupuestos, cotizaciones, comparativas de proveedores, compras y propuestas comerciales con trazabilidad.',
    h1: 'Presupuestos y cotizaciones más rápidos, comparables y trazables.',
    intro: 'Conectá solicitudes, proveedores, aprobaciones y propuestas comerciales en un único flujo.',
  },
  {
    path: '/integraciones-apis-bases-documentos',
    title: 'Integraciones con sistemas, datos y documentos',
    description: 'Integraciones empresariales con sistemas, datos, documentos, Google Drive, SharePoint, S3 y herramientas internas.',
    h1: 'Conectamos tus sistemas para que la operación deje de depender de copiar y pegar.',
    intro: 'Integramos datos, documentos y herramientas existentes con seguridad y permisos por empresa.',
  },
  {
    path: '/copiloto-ai-empresarial',
    title: 'Copiloto AI empresarial para procesos, datos y documentos',
    description: 'Copiloto AI empresarial con agentes, documentos, sistemas, datos, indicadores, conocimiento por empresa y permisos por usuario.',
    h1: 'Un copiloto empresarial que entiende tus procesos, documentos, datos y permisos.',
    intro: 'Configuramos agentes con contexto de negocio, fuentes autorizadas y control por usuario.',
  },
  {
    path: '/metodo',
    title: 'Método ORDEN para transformación operativa',
    description: 'El método ORDEN de Dice Projects transforma procesos, tecnología y datos en una operación más clara, medible y escalable.',
    h1: 'Un método para transformar complejidad operativa en un sistema ejecutable.',
    intro: 'Diagnóstico, prioridades, implementación y mejora continua para construir control sin frenar el negocio.',
  },
  {
    path: '/contacto',
    title: 'Contacto y diagnóstico de automatización empresarial',
    description: 'Solicitá un diagnóstico para automatizar procesos, integrar sistemas, ordenar datos y definir un roadmap de implementación.',
    h1: 'Conversemos sobre la operación que necesitás ordenar y escalar.',
    intro: 'Contanos el desafío y te ayudamos a definir prioridades, quick wins e integración necesaria.',
  },
  {
    path: '/sobre',
    title: 'Sobre Dice Projects',
    description: 'Dice Projects es un partner tecnológico que combina estrategia, procesos, software, integraciones y AI para empresas en crecimiento.',
    h1: 'Tecnología, procesos y estrategia para construir operaciones que escalan.',
    intro: 'Ayudamos a empresas a conectar lo que ya tienen y a implementar la tecnología que les falta.',
  },
];

function escapeHtml(value) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function replaceTag(html, pattern, replacement) {
  return html.replace(pattern, replacement);
}

function seoHead(page) {
  const url = `${domain}${page.path}`;
  const fullTitle = page.title.includes('Dice Projects') ? page.title : `${page.title} | Dice Projects`;
  const title = escapeHtml(fullTitle);
  const description = escapeHtml(page.description);
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      organization,
      {
        '@type': 'Service',
        name: page.title.replace(' | Dice Projects', ''),
        description: page.description,
        provider: { '@id': domain },
        areaServed: ['Argentina', 'Latinoamérica'],
        url,
      },
    ],
  };

  return `\n    <meta name="description" content="${description}" />
    <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />
    <link rel="canonical" href="${url}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Dice Projects" />
    <meta property="og:url" content="${url}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:image" content="${domain}/assets/images/og-dice-projects.png" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="${domain}/assets/images/og-dice-projects.png" />
    <script type="application/ld+json">${JSON.stringify(graph)}</script>`;
}

function staticBody(page) {
  const links = pages
    .filter((item) => item.path !== page.path && item.path !== '/')
    .map((item) => `<li><a href="${item.path}">${escapeHtml(item.title.replace(' | Dice Projects', ''))}</a></li>`)
    .join('');

  return `<main id="seo-content">
      <header><a href="/" aria-label="Dice Projects">Dice Projects</a></header>
      <article>
        <h1>${escapeHtml(page.h1)}</h1>
        <p>${escapeHtml(page.intro)}</p>
        <p>${escapeHtml(page.description)}</p>
        <p><a href="/contacto#diagnostico">Solicitar diagnóstico</a></p>
      </article>
      <nav aria-label="Soluciones"><ul>${links}</ul></nav>
    </main>`;
}

const template = await readFile(path.join(dist, 'index.html'), 'utf8');

for (const page of pages) {
  const fullTitle = page.title.includes('Dice Projects') ? page.title : `${page.title} | Dice Projects`;
  const title = `<title>${escapeHtml(fullTitle)}</title>`;
  let html = replaceTag(template, /<title>[\s\S]*?<\/title>/i, title);
  html = html.replace(/\s*<meta\s+(?:name|property)=["'](?:description|robots|keywords|og:[^"']+|twitter:[^"']+)["'][^>]*>/gi, '');
  html = html.replace(/\s*<link\s+rel=["']canonical["'][^>]*>/gi, '');
  html = html.replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');
  html = html.replace('</head>', `${seoHead(page)}\n  </head>`);
  html = html.replace('<div id="root"></div>', `<div id="root">${staticBody(page)}</div>`);

  const output = page.path === '/' ? path.join(dist, 'index.html') : path.join(dist, page.path.slice(1), 'index.html');
  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, html);
}

console.log(`Generated static SEO documents for ${pages.length} routes.`);
