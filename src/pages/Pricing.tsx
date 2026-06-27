import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for testing and personal hobbies.",
      features: [
        "5 processing credits monthly",
        "Standard processing speed",
        "HD downloads",
        "Session history (last 5 items)",
        "Email support"
      ],
      buttonText: "Get Started",
      linkTo: "/workspace",
      popular: false
    },
    {
      name: "Pro",
      price: "$9",
      period: "/month",
      description: "Best for professional designers and freelancers.",
      features: [
        "100 processing credits monthly",
        "Priority processing speed",
        "HD downloads",
        "Unlimited session history",
        "Developer API Access",
        "Premium support"
      ],
      buttonText: "Upgrade to Pro",
      linkTo: "/auth",
      popular: true
    },
    {
      name: "Enterprise",
      price: "$29",
      period: "/month",
      description: "For agencies, power users, and developer integrations.",
      features: [
        "1000 processing credits monthly",
        "Ultra-priority queue speed",
        "HD downloads & Bulk processing",
        "Unlimited history persistence",
        "Dedicated API key keys",
        "24/7 Priority support"
      ],
      buttonText: "Contact Sales",
      linkTo: "/auth",
      popular: false
    }
  ]

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
          <Link className="text-sm font-medium hover:text-primary transition-colors text-primary" to="/pricing">
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
        {/* Decorative elements */}
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[450px] h-[450px] bg-accent/10 rounded-full blur-[120px] -z-10"></div>

        <section className="container max-w-5xl mx-auto px-4 md:px-6">
          <div className="text-center max-w-[800px] mx-auto mb-16 space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Simple, Transparent <span className="gradient-text">Pricing</span>
            </h1>
            <p className="text-muted-foreground md:text-xl/relaxed">
              No hidden fees. Choose a plan that fits your background removal needs. Upgrade or cancel anytime.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {plans.map((plan, index) => (
              <div 
                key={index} 
                className={`bg-card border rounded-2xl p-8 flex flex-col justify-between relative transition-all duration-300 hover:-translate-y-1
                  ${plan.popular ? 'border-primary shadow-lg ring-1 ring-primary/20 bg-gradient-to-b from-card to-primary/5' : 'border-border'}
                `}
              >
                {plan.popular && (
                  <span className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                    Most Popular
                  </span>
                )}
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                  </div>
                  
                  <div className="flex items-baseline">
                    <span className="text-5xl font-extrabold tracking-tight">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground ml-1 text-sm font-semibold">{plan.period}</span>}
                  </div>
                  
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm gap-2">
                        <Check className="h-4 w-4 text-primary shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-8">
                  <Link to={plan.linkTo}>
                    <Button 
                      className="w-full font-semibold" 
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.buttonText}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
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
