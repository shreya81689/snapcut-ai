import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/toaster'
import Landing from './pages/Landing'
import UploadWorkspace from './pages/UploadWorkspace'
import Features from './pages/Features'
import Pricing from './pages/Pricing'
import Auth from './pages/Auth'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import ApiDocs from './pages/ApiDocs'

// Define query client
const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-background font-sans antialiased text-foreground selection:bg-primary/30 flex flex-col">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/api-docs" element={<ApiDocs />} />
            <Route path="/workspace" element={
              <div className="flex-1 flex flex-col">
                <header className="px-4 lg:px-6 h-14 flex items-center border-b border-border bg-card">
                  <span className="font-bold text-xl gradient-text">SnapCut AI</span>
                  <div className="ml-auto text-sm">Credits: 5</div>
                </header>
                <UploadWorkspace />
              </div>
            } />
          </Routes>
        </div>
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  )
}
