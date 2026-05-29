import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// 1. Import Sentry
import * as Sentry from "@sentry/react";

// 2. Inisialisasi Sentry
Sentry.init({
  dsn: "https://b52de424ee4e941bcca3d22fe0c790c4@o4511472106471424.ingest.us.sentry.io/4511472115384320",
  
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  
  // 3. Konfigurasi Performa (Diatur rendah agar skor Lighthouse tetap 98)
  tracesSampleRate: 0.1, 
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0, 
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)