import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function ApiDocs() {
  const curlExample = `curl -X POST \\
  https://shreyabegin.app.n8n.cloud/webhook/remove-background \\
  -H "Content-Type: image/png" \\
  --data-binary "@/path/to/image.png"`

  const jsExample = `const fileInput = document.querySelector('input[type="file"]');
const file = fileInput.files[0];

const response = await fetch('https://shreyabegin.app.n8n.cloud/webhook/remove-background', {
  method: 'POST',
  headers: {
    'Content-Type': file.type || 'application/octet-stream'
  },
  body: file
});

const data = await response.json();
console.log('Background removed image URL:', data.url);`

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
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[80px] -z-10"></div>

        <section className="container max-w-4xl mx-auto px-4 md:px-6">
          <div className="space-y-6">
            <h1 className="text-4xl font-extrabold tracking-tight">Developer API Documentation</h1>
            <p className="text-muted-foreground">
              Integrate SnapCut AI's background removal pipeline into your custom applications, scripts, and automation workflows.
            </p>
            <hr className="border-border" />

            <div className="space-y-8">
              {/* Endpoint block */}
              <div className="space-y-3">
                <h2 className="text-2xl font-bold">Remove Image Background</h2>
                <p className="text-sm text-muted-foreground">
                  Send a raw binary image in the request body to extract the foreground object instantly.
                </p>
                <div className="flex items-center gap-4 bg-muted p-3 rounded-lg border border-border">
                  <span className="text-xs font-bold bg-primary text-primary-foreground px-2 py-1 rounded">POST</span>
                  <code className="text-xs font-mono break-all">https://shreyabegin.app.n8n.cloud/webhook/remove-background</code>
                </div>
              </div>

              {/* Payload requirements */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Headers</h3>
                <table className="min-w-full text-sm border border-border rounded-lg overflow-hidden">
                  <thead>
                    <tr className="bg-muted text-left border-b border-border">
                      <th className="p-3 font-semibold">Header</th>
                      <th className="p-3 font-semibold">Type</th>
                      <th className="p-3 font-semibold">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-muted-foreground">
                    <tr className="border-b border-border">
                      <td className="p-3 font-mono text-xs text-foreground">Content-Type</td>
                      <td className="p-3">string</td>
                      <td className="p-3">The MIME type of your image (e.g. <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">image/png</code> or <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">image/jpeg</code>).</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Response format */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold">Response Payload (JSON)</h3>
                <p className="text-sm text-muted-foreground">
                  The API returns a JSON object containing the URL of the processed image.
                </p>
                <pre className="bg-muted p-4 rounded-lg border border-border overflow-x-auto">
                  <code className="text-xs font-mono text-foreground">{`{
  "url": "http://res.cloudinary.com/dxg7xdbtt/image/upload/v1782418539/vjlvvmdjzxzexicphvys.png"
}`}</code>
                </pre>
              </div>

              {/* Example Code Blocks */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mt-10">Code Examples</h2>

                {/* Curl example */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-muted-foreground">cURL Request</h4>
                  <pre className="bg-muted p-4 rounded-lg border border-border overflow-x-auto">
                    <code className="text-xs font-mono text-foreground">{curlExample}</code>
                  </pre>
                </div>

                {/* JS example */}
                <div className="space-y-2">
                  <h4 className="text-sm font-semibold text-muted-foreground">JavaScript (Fetch API)</h4>
                  <pre className="bg-muted p-4 rounded-lg border border-border overflow-x-auto">
                    <code className="text-xs font-mono text-foreground">{jsExample}</code>
                  </pre>
                </div>
              </div>
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
