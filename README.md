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
```

El bot público `Copiloto Dice` usa respuestas curadas y detección de intención en frontend. No llama a Groq, Chat API ni AI Orchestrator, por lo que no consume tokens LLM ni expone credenciales internas.
