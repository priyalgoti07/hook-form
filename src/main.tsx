import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ReackHookForm } from './components/ReackHookForm.tsx'
import { ControllerForm } from './components/ControllerForm.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    {/* <ReackHookForm /> */}
    <ControllerForm/>
  </StrictMode>,
)
