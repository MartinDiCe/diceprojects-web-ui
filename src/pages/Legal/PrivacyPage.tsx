import React from 'react';
import { LegalPageLayout } from './LegalPageLayout';

export default function PrivacyPage() {
  return (
    <LegalPageLayout title="Política de Privacidad" updateDate="15 Jun 2026">
      <h2>1. Alcance</h2>
      <p>Esta política aplica al sitio web de Dice Projects, al backoffice DiceProjects Admin y a la aplicación móvil utilizada por usuarios autorizados de la plataforma.</p>

      <h2>2. Información que recopilamos</h2>
      <p>Podemos procesar datos de contacto enviados por formularios, datos de cuenta como nombre, email, usuario, empresa, roles y permisos, y datos operativos cargados en la plataforma, por ejemplo productos, cotizaciones, clientes, proveedores, proyectos, campañas, documentos, imágenes y movimientos.</p>
      <p>También registramos datos técnicos necesarios para seguridad y operación, como eventos de autenticación, trazas de API, identificadores de dispositivo para notificaciones, fecha, hora, dirección IP aproximada, navegador, sistema operativo y acciones realizadas dentro del servicio.</p>

      <h2>3. Permisos de la aplicación móvil</h2>
      <ul>
        <li><strong>Cámara e imágenes:</strong> se usan solo cuando el usuario decide cargar fotos de productos, personas, vendedores u organizaciones.</li>
        <li><strong>Notificaciones:</strong> se usan para avisos operativos, alertas de cuenta, cotizaciones y novedades relevantes.</li>
        <li><strong>Biometría:</strong> es opcional y se usa para facilitar el ingreso en el mismo dispositivo. Dice Projects no recibe ni almacena huellas digitales o rasgos biométricos.</li>
      </ul>

      <h2>4. Finalidad del tratamiento</h2>
      <p>Usamos la información para autenticar usuarios, operar el backoffice, gestionar procesos comerciales y operativos, responder consultas, coordinar diagnósticos, medir campañas, mejorar la plataforma, proteger accesos, auditar actividad y cumplir obligaciones técnicas, comerciales o legales.</p>

      <h2>5. Servicios de terceros</h2>
      <p>Podemos utilizar proveedores tecnológicos para hosting, analítica, autenticación, mensajería, notificaciones push, almacenamiento, correo, integraciones y automatización. Estos proveedores tratan información solo en la medida necesaria para prestar el servicio.</p>

      <h2>6. Seguridad y confidencialidad</h2>
      <p>Aplicamos controles técnicos y organizativos para reducir riesgos de acceso no autorizado, pérdida o uso indebido. El acceso requiere autenticación y los permisos de cada usuario determinan qué módulos y datos puede consultar o modificar.</p>

      <h2>7. Conservación</h2>
      <p>Conservamos los datos mientras sean necesarios para la operación de la plataforma, la prestación de servicios, auditoría, soporte, seguridad o cumplimiento de obligaciones aplicables. Cuando la información deja de ser necesaria, puede ser eliminada, anonimizada o retenida solo según corresponda legal o técnicamente.</p>

      <h2>8. Derechos de los usuarios</h2>
      <p>Los usuarios pueden solicitar acceso, rectificación, actualización o eliminación de sus datos personales. En cuentas empresariales, algunas solicitudes pueden requerir intervención del administrador de la organización titular de la cuenta.</p>

      <h2>9. Contacto</h2>
      <p>Para consultas sobre privacidad, escribinos a <a href="mailto:mdice@diceprojects.com">mdice@diceprojects.com</a>.</p>
    </LegalPageLayout>
  );
}
