import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { UploadCloud, Zap, History, Download, Code, ShieldCheck } from "lucide-react"

export default function Features() {
  const featureList = [
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: "Instant Background Removal",
      description: "Remove image backgrounds in less than 3 seconds using our high-fidelity custom AI networks."
    },
    {
      icon: <UploadCloud className="h-6 w-6 text-primary" />,
      title: "Drag & Drop Uploads",
      description: "Conveniently drop image files directly from your computer or file browser to start processing instantly."
    },
    {
      icon: <Code className="h-6 w-6 text-primary" />,
      title: "Clipboard Copy-Paste",
      description: "Paste screenshots or images copied directly from other apps (Slack, browser, file explorer) using Ctrl+V."
    },
    {
      icon: <History className="h-6 w-6 text-primary" />,
      title: "Local Session History",
      description: "Access past uploads directly from your browser. History is stored space-efficiently with JPEG thumbnails."
    },
    {
      icon: <Download className="h-6 w-6 text-primary" />,
      title: "HD Downloads",
      description: "Save processed background-removed images at full high-definition resolution directly onto your local machine."
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-primary" />,
      title: "Developer API Integration",
      description: "Integrate SnapCut AI's processing pipelines directly into your workflows and applications using simple endpoints."
    }
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="px-4 lg:px-6 h-16 flex items-center border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <Link className="flex items-center justify-center" to="/">
          <span className="font-bold text-2xl gradient-text">SnapCut AI</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link className="text-sm font-medium hover:text-primary transition-colors text-primary" to="/features">
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
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-accent/10 rounded-full blur-[120px] -z-10"></div>

        <section className="container max-w-5xl mx-auto px-4 md:px-6">
          <div className="text-center max-w-[800px] mx-auto mb-16 space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Engineered for <span className="gradient-text">Designers</span> & <span className="gradient-text">Developers</span>
            </h1>
            <p className="text-muted-foreground md:text-xl/relaxed">
              Explore the advanced functionalities that make background removal fast, efficient, and seamlessly integrated into your workflow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featureList.map((feature, index) => (
              <div 
                key={index} 
                className="bg-card border border-border p-6 rounded-xl hover:border-primary/30 transition-all duration-300 flex flex-col gap-4 group hover:-translate-y-1"
              >
                <div className="p-3 bg-primary/5 border border-primary/10 w-fit rounded-lg group-hover:bg-primary/10 group-hover:border-primary/20 transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 p-8 md:p-12 bg-card border border-border rounded-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] -z-10"></div>
            <div className="space-y-4 max-w-[550px]">
              <h2 className="text-3xl font-bold">Ready to remove backgrounds instantly?</h2>
              <p className="text-muted-foreground">
                Get started today for free. Drag and drop your image, or paste it directly from your clipboard to experience it now.
              </p>
            </div>
            <div className="flex gap-4 w-full sm:w-auto shrink-0">
              <Link to="/workspace" className="w-full sm:w-auto">
                <Button size="lg" className="w-full">Upload Image</Button>
              </Link>
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
