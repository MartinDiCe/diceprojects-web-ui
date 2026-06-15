import React from 'react';
import { LegalPageLayout } from './LegalPageLayout';

export default function LegalNoticePage() {
  return (
    <LegalPageLayout title="Aviso Legal" updateDate="21 Feb 2026">
      <h2>1. Datos Identificativos</h2>
      <p>En cumplimiento con el deber de información, se facilitan los siguientes datos: Dice Projects, con domicilio en Maipú 939, C1006 Cdad. Autónoma de Buenos Aires, ARGENTINA.</p>
      
      <h2>2. Usuarios</h2>
      <p>El acceso y/o uso de este portal de Dice Projects atribuye la condición de USUARIO, que acepta, desde dicho acceso y/o uso, las Condiciones Generales de Uso aquí reflejadas.</p>
      
      <h2>3. Uso del Portal</h2>
      <p>Dice Projects proporciona el acceso a multitud de informaciones, servicios o datos en Internet pertenecientes a Dice Projects o a sus licenciantes a los que el USUARIO pueda tener acceso.</p>
    </LegalPageLayout>
  );
}
