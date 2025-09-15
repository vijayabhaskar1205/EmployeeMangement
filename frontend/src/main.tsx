import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PersistGate } from "redux-persist/integration/react";
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import {storee,persistor} from './components/store/storee.ts'
const client=new QueryClient()
createRoot(document.getElementById('root')!).render(
   <StrictMode>
    <Provider store={storee}>
       <PersistGate loading={null} persistor={persistor}>
    <QueryClientProvider client={client}>
    <App />
    </QueryClientProvider>
    </PersistGate>
    </Provider>
  </StrictMode>,
)
