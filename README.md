# Dice Projects Web UI

Sitio comercial de Dice Projects.

Propuesta: automatización de procesos, implementación de plataforma operativa, integraciones empresariales y copiloto AI para empresas multirubro.

## Desarrollo local

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Marketing y bot público

La web usa endpoints públicos de Marketing para capturar visitas, clicks, preguntas del bot y leads.

Variables públicas:

```bash
VITE_SITE_URL="https://diceprojects.com"
VITE_API_BASE_URL="https://api.diceprojects.com/api"
VITE_MARKETING_ENABLED="true"
VITE_MARKETING_CAMPAIGN_KEY="diceprojects"
VITE_PUBLIC_BOT_ENABLED="true"
VITE_PUBLIC_BOT_KEY="diceprojects"
VITE_PUBLIC_WHATSAPP_URL="https://wa.me/541172466605"
```

El bot público `Copiloto Dice` usa respuestas curadas, detección de intención en frontend y memoria local del contexto comercial. Puede responder sobre plataforma, integraciones, módulos, diagnóstico y el core de asistente web con KB; además deriva a formulario de lead o WhatsApp sin exponer credenciales internas.
