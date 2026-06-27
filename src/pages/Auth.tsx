import { useState } from "react"
import { Link, useSearchParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Mail, Lock, User } from "lucide-react"

export default function Auth() {
  const [searchParams] = useSearchParams()
  const defaultTab = searchParams.get("tab") === "register" ? "register" : "login"
  const [tab, setTab] = useState<"login" | "register">(defaultTab)
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    // Mock authentication delay
    setTimeout(() => {
      setLoading(false)
      // Redirect to workspace
      navigate("/workspace")
    }, 1500)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background relative overflow-hidden justify-center items-center px-4">
      {/* Decorative background blur objects */}
      <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] -z-10"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] -z-10"></div>

      <div className="w-full max-w-[450px]">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-2">
            <span className="font-bold text-3xl gradient-text">SnapCut AI</span>
          </Link>
          <p className="text-sm text-muted-foreground">Remove Image Backgrounds Instantly</p>
        </div>

        <Card className="bg-card/75 border-border backdrop-blur-md shadow-2xl">
          <CardHeader className="space-y-1">
            <div className="flex bg-muted p-1 rounded-lg border border-border mb-4">
              <button
                onClick={() => setTab("login")}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  tab === "login"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setTab("register")}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  tab === "register"
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Register
              </button>
            </div>
            <CardTitle className="text-2xl text-center">
              {tab === "login" ? "Welcome Back" : "Create an Account"}
            </CardTitle>
            <CardDescription className="text-center">
              {tab === "login" 
                ? "Enter your credentials to access your workspace" 
                : "Get started with 5 free credits instantly"
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {tab === "register" && (
                <div className="space-y-2">
                  <label className="text-xs font-medium text-muted-foreground">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      type="text" 
                      placeholder="John Doe" 
                      className="pl-9"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="email" 
                    placeholder="name@example.com" 
                    className="pl-9"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-medium text-muted-foreground">Password</label>
                  {tab === "login" && (
                    <a href="#" className="text-xs text-primary hover:underline">Forgot password?</a>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="password" 
                    placeholder="••••••••" 
                    className="pl-9"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full font-semibold" disabled={loading}>
                {loading ? "Authenticating..." : tab === "login" ? "Sign In" : "Create Account"}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <div className="text-center mt-6">
          <Link to="/" className="text-xs text-muted-foreground hover:text-primary transition-colors">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
