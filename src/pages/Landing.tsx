import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function Landing() {
  return (
    <div className="flex flex-col min-h-screen">
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
      <main className="flex-1 flex items-center justify-center relative overflow-hidden">
        {/* Background glow effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-accent/20 rounded-full blur-[100px] -z-10"></div>

        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 text-center px-4 md:px-6">
          <div className="container max-w-[800px] mx-auto space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Remove Backgrounds <br className="hidden sm:block" />
                <span className="gradient-text">Instantly</span> with AI.
              </h1>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Professional grade cutout tool. Upload any image and get a transparent background in seconds. Perfect for e-commerce, design, and marketing.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/workspace">
                <Button size="lg" className="w-full sm:w-auto font-semibold text-lg px-8">
                  Upload Image Now
                </Button>
              </Link>
              <Link to="/pricing">
                <Button size="lg" variant="outline" className="w-full sm:w-auto font-semibold text-lg px-8">
                  View Pricing
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mt-4">Free to try. No credit card required.</p>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-border">
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
