import React from 'react';
import { LegalPageLayout } from './LegalPageLayout';

export default function PrivacyPage() {
  return (
    <LegalPageLayout title="Política de Privacidad" updateDate="21 Feb 2026">
      <h2>1. Recolección de Información</h2>
      <p>Recopilamos información que usted nos proporciona directamente a través de nuestros formularios de contacto y diagnóstico, incluyendo nombre, empresa, correo electrónico y detalles operativos.</p>
      
      <h2>2. Uso de la Información</h2>
      <p>Utilizamos la información recopilada para proporcionar nuestros servicios de diagnóstico, comunicarnos con usted y mejorar nuestra oferta de orquestación digital.</p>
      
      <h2>3. Protección de Datos</h2>
      <p>Implementamos medidas de seguridad técnicas y organizativas para proteger sus datos personales contra el acceso no autorizado o la pérdida.</p>
      
      <h2>4. Sus Derechos</h2>
      <p>Usted tiene derecho a acceder, rectificar o eliminar sus datos personales en cualquier momento contactándonos a través de nuestro correo legal.</p>
    </LegalPageLayout>
  );
}
