import React from 'react';
import { LegalPageLayout } from './LegalPageLayout';

export default function TermsPage() {
  return (
    <LegalPageLayout title="Términos y Condiciones" updateDate="21 Feb 2026">
      <h2>1. Aceptación de los Términos</h2>
      <p>Al acceder y utilizar los servicios de Dice Projects, usted acepta estar sujeto a estos Términos y Condiciones. Si no está de acuerdo con alguna parte de estos términos, no podrá acceder a nuestros servicios.</p>
      
      <h2>2. Descripción del Servicio</h2>
      <p>Dice Projects es un estudio boutique de orquestación digital que ofrece servicios de diagnóstico, integración y automatización de procesos empresariales.</p>
      
      <h2>3. Propiedad Intelectual</h2>
      <p>Todo el contenido, metodologías (incluyendo el Método ORDEN) y software desarrollados por Dice Projects son propiedad exclusiva de la empresa, a menos que se acuerde lo contrario por escrito.</p>
      
      <h2>4. Limitación de Responsabilidad</h2>
      <p>Dice Projects no será responsable de ningún daño indirecto, incidental o consecuente que surja del uso o la imposibilidad de usar nuestros servicios.</p>
    </LegalPageLayout>
  );
}
