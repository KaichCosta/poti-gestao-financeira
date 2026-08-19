import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme.js';
import GlobalStyle from './styles/global.js';
import { SpeedInsights } from "@vercel/speed-insights/react"


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
      <SpeedInsights />
    </ThemeProvider>
  </StrictMode>,
)
