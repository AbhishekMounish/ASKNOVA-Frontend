import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App.jsx'

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
   <MantineProvider defaultColorScheme="dark">
     <Notifications />
  <StrictMode>
    <App />
  </StrictMode>
  </MantineProvider>
  </BrowserRouter>
)
