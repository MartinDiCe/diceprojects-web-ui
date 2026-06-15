import React from 'react';
import { LegalPageLayout } from './LegalPageLayout';

export default function CookiesPage() {
  return (
    <LegalPageLayout title="Política de Cookies" updateDate="21 Feb 2026">
      <h2>1. ¿Qué son las Cookies?</h2>
      <p>Las cookies son pequeños archivos de texto que se almacenan en su dispositivo cuando visita nuestro sitio web.</p>
      
      <h2>2. Tipos de Cookies que Utilizamos</h2>
      <ul>
        <li><strong>Cookies Esenciales:</strong> Necesarias para el funcionamiento básico del sitio.</li>
        <li><strong>Cookies de Análisis:</strong> Nos ayudan a entender cómo los visitantes interactúan con el sitio (Google Analytics).</li>
      </ul>
      
      <h2>3. Control de Cookies</h2>
      <p>Usted puede controlar y/o eliminar las cookies según desee a través de la configuración de su navegador.</p>
    </LegalPageLayout>
  );
}
