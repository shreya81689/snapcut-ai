import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function Terms() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Link className="flex items-center justify-center" to="/">
          <span className="font-bold text-2xl gradient-text">SnapCut AI</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link className="text-sm font-medium hover:text-primary transition-colors" to="/features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors" to="/pricing">
            Pricing
          </Link>
          <Link to="/auth">
            <Button variant="outline" className="mr-2">Log in</Button>
          </Link>
          <Link to="/auth?tab=register">
            <Button>Get Started</Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1 py-12 md:py-24 relative overflow-hidden">
        <section className="container max-w-3xl mx-auto px-4 md:px-6">
          <div className="space-y-6">
            <h1 className="text-4xl font-extrabold tracking-tight">Terms of Service</h1>
            <p className="text-muted-foreground text-sm">Last updated: June 28, 2026</p>
            <hr className="border-border" />
            
            <div className="space-y-4 leading-relaxed text-muted-foreground">
              <h2 className="text-xl font-bold text-foreground mt-6">1. Agreement to Terms</h2>
              <p>
                By accessing or using SnapCut AI ("the Service"), you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the Service.
              </p>

              <h2 className="text-xl font-bold text-foreground mt-6">2. Use of Service</h2>
              <p>
                You must be at least 13 years old to use the Service. You agree not to misuse the Service or assist anyone else in doing so. You are responsible for all image content uploaded under your session or account.
              </p>

              <h2 className="text-xl font-bold text-foreground mt-6">3. Content and Intellectual Property</h2>
              <p>
                You retain ownership and intellectual property rights in any images you upload to the Service. SnapCut AI does not claim ownership of your uploaded images. Images are processed temporarily and are not stored on our systems except for temporary caching needed during background removal.
              </p>

              <h2 className="text-xl font-bold text-foreground mt-6">4. Subscription and Billing</h2>
              <p>
                Some parts of the Service are billed on a subscription basis. You will be billed in advance on a recurring and periodic basis. You can cancel your subscription at any time through your account settings or premium dashboard.
              </p>

              <h2 className="text-xl font-bold text-foreground mt-6">5. Limitation of Liability</h2>
              <p>
                In no event shall SnapCut AI, nor its directors, employees, partners, or agents, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-border bg-card">
        <p className="text-xs text-muted-foreground">© 2026 SnapCut AI. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4 text-muted-foreground" to="/terms">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-muted-foreground" to="/privacy">
            Privacy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-muted-foreground" to="/api-docs">
            API Docs
          </Link>
        </nav>
      </footer>
    </div>
  )
}
