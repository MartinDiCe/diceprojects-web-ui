import { BrowserRouter as Router, Navigate, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { MainLayout } from './layout/MainLayout';
import HomePage from './pages/Home/HomePage';
import MetodoPage from './pages/Metodo/MetodoPage';
import ServiciosPage from './pages/Servicios/ServiciosPage';
import InsightsPage from './pages/Insights/InsightsPage';
import InsightArticlePage from './pages/Insights/InsightArticlePage';
import SobrePage from './pages/Sobre/SobrePage';
import ContactoPage from './pages/Contacto/ContactoPage';
import SeoLandingPage from './pages/Landing/SeoLandingPage';
import TermsPage from './pages/Legal/TermsPage';
import PrivacyPage from './pages/Legal/PrivacyPage';
import CookiesPage from './pages/Legal/CookiesPage';
import LegalNoticePage from './pages/Legal/LegalNoticePage';
import LegalHubPage from './pages/Legal/LegalHubPage';
import { LanguageProvider } from './i18n/LanguageContext';
import { MarketingTracker } from './components/marketing/MarketingTracker';
import { PublicCopilotWidget } from './components/publicCopilot/PublicCopilotWidget';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <MarketingTracker />
        <MainLayout>
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
        </MainLayout>
        <PublicCopilotWidget />
      </Router>
    </LanguageProvider>
  );
}
