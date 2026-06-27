import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function Privacy() {
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
            <h1 className="text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
            <p className="text-muted-foreground text-sm">Last updated: June 28, 2026</p>
            <hr className="border-border" />
            
            <div className="space-y-4 leading-relaxed text-muted-foreground">
              <h2 className="text-xl font-bold text-foreground mt-6">1. Information We Collect</h2>
              <p>
                We do not save or persistently store images you upload for background removal. Uploaded images are processed in-memory or cached temporarily and are deleted immediately after the background removal operation is complete. We collect simple usage data and profile parameters (e.g. email address) when you register for an account.
              </p>

              <h2 className="text-xl font-bold text-foreground mt-6">2. How We Use Information</h2>
              <p>
                We use the collected information to maintain the Service, facilitate account authentication, process pricing payments, and respond to support queries. Your email is never sold or shared with external third-party advertisers.
              </p>

              <h2 className="text-xl font-bold text-foreground mt-6">3. Local Storage and Cookies</h2>
              <p>
                We use local browser storage (such as `localStorage`) to save active workspace states (current image and cutout previews) and a record of processing history at your discretion. You can prune your local history or clear browser cache at any time.
              </p>

              <h2 className="text-xl font-bold text-foreground mt-6">4. Data Security</h2>
              <p>
                The security of your data is important to us. We employ standard industry safeguards to secure transaction credentials, API communications, and user database profiles.
              </p>

              <h2 className="text-xl font-bold text-foreground mt-6">5. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this document.
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
