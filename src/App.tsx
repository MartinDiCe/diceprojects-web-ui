import { BrowserRouter as Router, Navigate, Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { MainLayout } from './layout/MainLayout';
import { LanguageProvider } from './i18n/LanguageContext';
import { MarketingTracker } from './components/marketing/MarketingTracker';

const HomePage = lazy(() => import('./pages/Home/HomePage'));
const MetodoPage = lazy(() => import('./pages/Metodo/MetodoPage'));
const ServiciosPage = lazy(() => import('./pages/Servicios/ServiciosPage'));
const InsightsPage = lazy(() => import('./pages/Insights/InsightsPage'));
const InsightArticlePage = lazy(() => import('./pages/Insights/InsightArticlePage'));
const SobrePage = lazy(() => import('./pages/Sobre/SobrePage'));
const ContactoPage = lazy(() => import('./pages/Contacto/ContactoPage'));
const SeoLandingPage = lazy(() => import('./pages/Landing/SeoLandingPage'));
const TermsPage = lazy(() => import('./pages/Legal/TermsPage'));
const PrivacyPage = lazy(() => import('./pages/Legal/PrivacyPage'));
const CookiesPage = lazy(() => import('./pages/Legal/CookiesPage'));
const LegalNoticePage = lazy(() => import('./pages/Legal/LegalNoticePage'));
const LegalHubPage = lazy(() => import('./pages/Legal/LegalHubPage'));
const PublicCopilotWidget = lazy(() =>
  import('./components/publicCopilot/PublicCopilotWidget').then((module) => ({ default: module.PublicCopilotWidget })),
);

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function PageFallback() {
  return <div className="min-h-[55vh] bg-brand-light" aria-label="Cargando contenido" />;
}

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <MarketingTracker />
        <MainLayout>
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/metodo" element={<MetodoPage />} />
              <Route path="/automatizacion-y-orquestacion" element={<ServiciosPage />} />
              <Route path="/insights" element={<InsightsPage />} />
              <Route path="/insights/:slug" element={<InsightArticlePage />} />
              <Route path="/sobre" element={<SobrePage />} />
              <Route path="/contacto" element={<ContactoPage />} />
              <Route path="/plataforma-empresarial-multirubro" element={<SeoLandingPage page="plataforma" />} />
              <Route path="/automatizacion-de-procesos" element={<SeoLandingPage page="automatizacion" />} />
              <Route path="/gestion-comercial-crm-operativo" element={<SeoLandingPage page="comercial" />} />
              <Route path="/gestion-productos-catalogo-web" element={<SeoLandingPage page="productos" />} />
              <Route path="/gestion-stock-productos-inventario" element={<SeoLandingPage page="stock" />} />
              <Route path="/gestion-stock-almacenes-inventario" element={<Navigate to="/gestion-stock-productos-inventario" replace />} />
              <Route path="/marketing-leads-campanas-embudos" element={<SeoLandingPage page="marketing" />} />
              <Route path="/sitios-conectados-backoffice-cotizaciones" element={<SeoLandingPage page="sitios" />} />
              <Route path="/software-gestion-obras-servicios" element={<SeoLandingPage page="obras" />} />
              <Route path="/presupuestos-cotizaciones-compras" element={<SeoLandingPage page="cotizaciones" />} />
              <Route path="/integraciones-apis-bases-documentos" element={<SeoLandingPage page="integraciones" />} />
              <Route path="/copiloto-ai-empresarial" element={<SeoLandingPage page="copiloto" />} />
              <Route path="/legal" element={<LegalHubPage />} />
              <Route path="/terminos" element={<TermsPage />} />
              <Route path="/privacidad" element={<PrivacyPage />} />
              <Route path="/cookies" element={<CookiesPage />} />
              <Route path="/aviso-legal" element={<LegalNoticePage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </MainLayout>
        <Suspense fallback={null}>
          <PublicCopilotWidget />
        </Suspense>
      </Router>
    </LanguageProvider>
  );
}
