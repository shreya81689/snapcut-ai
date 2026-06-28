import { useState, useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { UploadCloud, Image as ImageIcon, Download, Loader2, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface HistoryItem {
  id: string
  originalName: string
  originalUrl: string
  resultUrl: string
  timestamp: number
}

const dataURLtoFile = (dataurl: string, filename: string): File => {
  const arr = dataurl.split(',')
  const mime = arr[0].match(/:(.*?);/)![1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

const createThumbnail = (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const maxDim = 200
        let w = img.width
        let h = img.height
        if (w > h) {
          if (w > maxDim) {
            h = Math.round((h * maxDim) / w)
            w = maxDim
          }
        } else {
          if (h > maxDim) {
            w = Math.round((w * maxDim) / h)
            h = maxDim
          }
        }
        canvas.width = w
        canvas.height = h
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.drawImage(img, 0, 0, w, h)
          resolve(canvas.toDataURL('image/jpeg', 0.7))
        } else {
          resolve(e.target?.result as string || '')
        }
      }
      img.src = e.target?.result as string
    }
    reader.readAsDataURL(file)
  })
}

export default function UploadWorkspace() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'uploading' | 'processing' | 'completed' | 'error'>('idle')
  const [activeTab, setActiveTab] = useState<'workspace' | 'history'>('workspace')
  const [history, setHistory] = useState<HistoryItem[]>([])

  const addToHistory = async (originalFile: File | null, resultUrl: string) => {
    if (!originalFile) return
    try {
      const originalThumbnail = await createThumbnail(originalFile)
      
      const newItem: HistoryItem = {
        id: Date.now().toString(),
        originalName: originalFile.name,
        originalUrl: originalThumbnail,
        resultUrl: resultUrl,
        timestamp: Date.now()
      }
      
      const savedHistory = localStorage.getItem('snapcut_history')
      let currentHistory: HistoryItem[] = []
      if (savedHistory) {
        try {
          currentHistory = JSON.parse(savedHistory)
        } catch (e) {
          console.error(e)
        }
      }
      
      const updatedHistory = [newItem, ...currentHistory]
      setHistory(updatedHistory)
      localStorage.setItem('snapcut_history', JSON.stringify(updatedHistory))
    } catch (e) {
      console.error('Failed to add to history:', e)
    }
  }

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: any[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0]
      setFile(selectedFile)
      setResult(null)
      setStatus('idle')

      const reader = new FileReader()
      reader.onload = (e) => {
        const base64 = e.target?.result as string
        setPreview(base64)
        try {
          localStorage.setItem('snapcut_current_preview', base64)
          localStorage.setItem('snapcut_current_filename', selectedFile.name)
          localStorage.removeItem('snapcut_current_result')
        } catch (err) {
          console.warn('Failed to save preview to localStorage:', err)
        }
      }
      reader.readAsDataURL(selectedFile)
    }

    if (fileRejections.length > 0) {
      console.log('Drop rejected:', fileRejections)
      const rejection = fileRejections[0]
      const errorMsg = rejection.errors[0]?.message || 'Invalid file type or size'
      alert(`Upload failed: ${errorMsg}`)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/jpg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp']
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false,
    noClick: !!preview
  })

  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const activeElement = document.activeElement
      if (
        activeElement &&
        (activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA')
      ) {
        return
      }

      const items = e.clipboardData?.items
      let imageFile: File | null = null

      if (items) {
        for (let i = 0; i < items.length; i++) {
          if (items[i].type.startsWith('image/')) {
            const file = items[i].getAsFile()
            if (file) {
              imageFile = file
              break
            }
          }
        }
      }

      if (!imageFile && e.clipboardData?.files && e.clipboardData.files.length > 0) {
        const file = Array.from(e.clipboardData.files).find(f => f.type.startsWith('image/'))
        if (file) {
          imageFile = file
        }
      }

      if (imageFile) {
        e.preventDefault()

        // Verify format
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
        if (!allowedTypes.includes(imageFile.type)) {
          alert('Unsupported file type. Please paste a JPG, PNG, or WEBP image.')
          return
        }

        // Verify size (10MB)
        if (imageFile.size > 10 * 1024 * 1024) {
          alert('File size too large. Maximum size is 10MB.')
          return
        }

        setFile(imageFile)
        setResult(null)
        setStatus('idle')

        const reader = new FileReader()
        reader.onload = (e) => {
          const base64 = e.target?.result as string
          setPreview(base64)
          try {
            localStorage.setItem('snapcut_current_preview', base64)
            localStorage.setItem('snapcut_current_filename', imageFile.name)
            localStorage.removeItem('snapcut_current_result')
          } catch (err) {
            console.warn('Failed to save preview to localStorage:', err)
          }
        }
        reader.readAsDataURL(imageFile)
      }
    }

    // Load active state & history list from local storage on mount
    const savedHistory = localStorage.getItem('snapcut_history')
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory))
      } catch (e) {
        console.error(e)
      }
    }

    const savedPreview = localStorage.getItem('snapcut_current_preview')
    const savedResult = localStorage.getItem('snapcut_current_result')
    const savedFileName = localStorage.getItem('snapcut_current_filename')

    if (savedPreview) {
      setPreview(savedPreview)
      if (savedFileName && savedPreview.startsWith('data:')) {
        try {
          const restoredFile = dataURLtoFile(savedPreview, savedFileName)
          setFile(restoredFile)
        } catch (e) {
          console.error(e)
        }
      }
    }

    if (savedResult) {
      setResult(savedResult)
      setStatus('completed')
    }

    window.addEventListener('paste', handlePaste)
    return () => {
      window.removeEventListener('paste', handlePaste)
    }
  }, [])

  const handleProcess = async () => {
    if (!file) return
    setStatus('processing')
    setResult(null)
    
    try {
      const response = await fetch('https://shreyabegin.app.n8n.cloud/webhook/remove-background', {
        method: 'POST',
        headers: {
          'Content-Type': file.type || 'application/octet-stream'
        },
        body: file
      })

      if (!response.ok) {
        throw new Error(`Failed to process image. Server returned status: ${response.status}`)
      }

      const responseClone = response.clone()

      try {
        let json = await response.json()

        if (Array.isArray(json) && json.length > 0) {
          json = json[0]
        }

        if (json && json.url) {
          const secureUrl = json.url.startsWith('http://') ? json.url.replace(/^http:/, 'https:') : json.url
          setResult(secureUrl)
          setStatus('completed')
          localStorage.setItem('snapcut_current_result', secureUrl)
          addToHistory(file, secureUrl)
          return
        } else {
          throw new Error('No image URL found in JSON response.')
        }
      } catch (jsonError) {
        try {
          const blob = await responseClone.blob()
          if (blob && blob.type.startsWith('image/')) {
            const imageUrl = URL.createObjectURL(blob)
            setResult(imageUrl)
            setStatus('completed')
            
            const reader = new FileReader()
            reader.onload = (e) => {
              const base64 = e.target?.result as string
              localStorage.setItem('snapcut_current_result', base64)
              addToHistory(file, base64)
            }
            reader.readAsDataURL(blob)
            return
          }
        } catch (blobError) {
          console.error('Binary blob parsing failed:', blobError)
        }
      }

      throw new Error('Received an invalid or empty response from the server.')
    } catch (error: any) {
      console.error('Error removing background:', error)
      setStatus('error')
      alert(error?.message || 'Failed to remove background. Please try again.')
    }
  }

  const handleDownload = async () => {
    if (!result) return
    try {
      const targetUrl = result.startsWith('http://') ? result.replace(/^http:/, 'https:') : result
      let downloadUrl = targetUrl

      // If remote cross-origin URL, fetch as blob first to bypass browser same-origin download restrictions
      if (targetUrl.startsWith('http')) {
        const response = await fetch(targetUrl)
        const blob = await response.blob()
        downloadUrl = URL.createObjectURL(blob)
      }

      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = `snapcut-${file?.name || 'result.png'}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      if (downloadUrl !== targetUrl) {
        URL.revokeObjectURL(downloadUrl)
      }
    } catch (error) {
      console.error('Failed to download image:', error)
      // Fallback: open in new tab if CORS or other issues occur
      window.open(result, '_blank')
    }
  }

  return (
    <div className="container mx-auto py-10 max-w-5xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Workspace</h1>
          <p className="text-muted-foreground">Upload an image to remove its background.</p>
        </div>
        
        {/* Tab Switcher */}
        <div className="flex bg-muted p-1 rounded-lg border border-border self-start md:self-auto">
          <button
            onClick={() => setActiveTab('workspace')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
              activeTab === 'workspace'
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Workspace
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 flex items-center gap-2 ${
              activeTab === 'history'
                ? 'bg-card text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            History
            {history.length > 0 && (
              <span className="bg-primary/10 text-primary px-1.5 py-0.5 text-xs rounded-full font-bold">
                {history.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {activeTab === 'workspace' ? (
        <div className="grid md:grid-cols-2 gap-8 animate-in fade-in duration-300">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Original Image</CardTitle>
              <CardDescription>Max 10MB. Formats: JPG, PNG, WEBP.</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div
                {...getRootProps()}
                className={`relative border-2 border-dashed rounded-xl transition-all duration-300 min-h-[300px] flex flex-col justify-center
                  ${!preview ? 'p-12 text-center cursor-pointer' : 'p-2'}
                  ${isDragActive ? 'border-primary bg-primary/5 ring-2 ring-primary/20 scale-[0.99]' : 'border-muted hover:border-primary/50'}
                  ${isDragReject ? 'border-destructive bg-destructive/10' : ''}
                `}
              >
                <input {...getInputProps()} />

                {/* Drag overlay when drag is active over preview */}
                {preview && isDragActive && (
                  <div className="absolute inset-0 bg-background/90 backdrop-blur-sm z-30 flex flex-col items-center justify-center rounded-xl animate-in fade-in zoom-in-95 duration-200 pointer-events-none">
                    <UploadCloud className="h-12 w-12 text-primary animate-bounce mb-3" />
                    <p className="text-lg font-semibold text-primary">Drop to replace image</p>
                    <p className="text-xs text-muted-foreground">Supported formats: JPG, PNG, WEBP</p>
                  </div>
                )}

                {!preview ? (
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex justify-center mb-4 p-3 bg-primary/5 rounded-full border border-primary/10">
                      <UploadCloud className={`h-10 w-10 ${isDragActive ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <p className="text-lg font-semibold mb-1">
                      {isDragActive ? 'Drop image here' : 'Drag & drop image here'}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      or click to browse from your computer
                    </p>
                    <Button variant="outline" size="sm" type="button">Browse Files</Button>
                  </div>
                ) : (
                  <div className="space-y-4 w-full">
                    <div className="relative rounded-lg overflow-hidden border border-border bg-black/20 flex items-center justify-center min-h-[300px] group">
                      <img src={preview} alt="Preview" className="max-h-[400px] object-contain transition-transform duration-300 group-hover:scale-[1.01]" />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2 opacity-80 hover:opacity-100 transition-opacity z-20"
                        onClick={(e) => {
                          e.stopPropagation()
                          setFile(null)
                          setPreview(null)
                          setResult(null)
                          setStatus('idle')
                          localStorage.removeItem('snapcut_current_preview')
                          localStorage.removeItem('snapcut_current_result')
                          localStorage.removeItem('snapcut_current_filename')
                        }}
                        type="button"
                      >
                        Remove
                      </Button>
                    </div>
                    {(status === 'idle' || status === 'error') && (
                      <Button
                        className="w-full relative overflow-hidden group/btn"
                        size="lg"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleProcess()
                        }}
                      >
                        {status === 'error' ? 'Retry Background Removal' : 'Remove Background'}
                      </Button>
                    )}
                    {status === 'processing' && (
                      <Button className="w-full" size="lg" disabled>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Processing...
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Result</CardTitle>
              <CardDescription>Transparent background image.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className={`relative rounded-xl overflow-hidden border flex items-center justify-center min-h-[400px]
                ${result ? 'bg-transparent border-primary/50' : 'border-dashed border-muted bg-muted/5'}
              `}>
                {/* Checkerboard pattern for transparency visualization */}
                <div className="absolute inset-0 z-0 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage: 'linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%)',
                    backgroundSize: '20px 20px',
                    backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
                  }}
                />

                {!result ? (
                  <div className="text-center z-10 p-6">
                    <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground">Result will appear here</p>
                  </div>
                ) : (
                  <img src={result} alt="Result" className="max-h-[400px] object-contain z-10 relative" />
                )}
              </div>

              {status === 'completed' && result && (
                <div className="mt-4 flex gap-2">
                  <Button className="w-full" variant="default" onClick={handleDownload}>
                    <Download className="mr-2 h-4 w-4" />
                    Download HD
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="animate-in fade-in duration-300">
          {history.length === 0 ? (
            <Card className="bg-card border-border border-dashed p-12 text-center flex flex-col items-center justify-center min-h-[350px]">
              <div className="p-4 bg-primary/5 rounded-full border border-primary/10 mb-4">
                <ImageIcon className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-2">No Cutouts Yet</h2>
              <p className="text-sm text-muted-foreground max-w-sm mb-6">
                Your processed images will appear here. Go back to the Workspace tab and upload an image to get started.
              </p>
              <Button onClick={() => setActiveTab('workspace')}>
                Go to Workspace
              </Button>
            </Card>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {history.map((item) => (
                <Card key={item.id} className="bg-card border-border overflow-hidden flex flex-col group/card hover:border-primary/30 transition-all duration-300">
                  <div className="relative aspect-video w-full bg-black/20 border-b border-border flex items-center justify-center overflow-hidden p-2">
                    <div className="grid grid-cols-2 gap-2 w-full h-full">
                      <div className="relative rounded bg-muted/40 overflow-hidden flex items-center justify-center h-full border border-border/50">
                        <span className="absolute top-1.5 left-1.5 text-[9px] bg-black/60 text-white px-1.5 py-0.5 rounded font-medium z-10">Original</span>
                        <img src={item.originalUrl} alt="Original" className="max-h-full max-w-full object-contain" />
                      </div>
                      <div className="relative rounded bg-transparent overflow-hidden flex items-center justify-center h-full border border-primary/10">
                        <div className="absolute inset-0 z-0 opacity-5 pointer-events-none" 
                          style={{
                            backgroundImage: 'linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%)',
                            backgroundSize: '10px 10px',
                            backgroundPosition: '0 0, 0 5px, 5px -5px, -5px 0px'
                          }}
                        />
                        <span className="absolute top-1.5 left-1.5 text-[9px] bg-primary text-primary-foreground px-1.5 py-0.5 rounded font-medium z-10">Cutout</span>
                        <img src={item.resultUrl} alt="Cutout" className="max-h-full max-w-full object-contain z-10" />
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-4 flex-1 flex flex-col justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-sm truncate" title={item.originalName}>
                        {item.originalName}
                      </h3>
                      <p className="text-[11px] text-muted-foreground mt-1">
                        {new Date(item.timestamp).toLocaleString()}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-auto">
                      <Button 
                        size="sm" 
                        className="flex-1 text-xs"
                        onClick={() => {
                          setPreview(item.originalUrl)
                          try {
                            const restoredFile = dataURLtoFile(item.originalUrl, item.originalName)
                            setFile(restoredFile)
                          } catch (e) {
                            console.error(e)
                            setFile(null)
                          }
                          setResult(item.resultUrl)
                          setStatus('completed')
                          localStorage.setItem('snapcut_current_preview', item.originalUrl)
                          localStorage.setItem('snapcut_current_result', item.resultUrl)
                          localStorage.setItem('snapcut_current_filename', item.originalName)
                          setActiveTab('workspace')
                        }}
                      >
                        Load in Workspace
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8 text-primary hover:text-primary-foreground hover:bg-primary"
                        onClick={async () => {
                          try {
                            const targetUrl = item.resultUrl.startsWith('http://') 
                              ? item.resultUrl.replace(/^http:/, 'https:') 
                              : item.resultUrl
                            let downloadUrl = targetUrl
                            if (targetUrl.startsWith('http')) {
                              const response = await fetch(targetUrl)
                              const blob = await response.blob()
                              downloadUrl = URL.createObjectURL(blob)
                            }

                            const link = document.createElement('a')
                            link.href = downloadUrl
                            link.download = `snapcut-${item.originalName}`
                            document.body.appendChild(link)
                            link.click()
                            document.body.removeChild(link)

                            if (downloadUrl !== targetUrl) {
                              URL.revokeObjectURL(downloadUrl)
                            }
                          } catch (error) {
                            console.error(error)
                            window.open(item.resultUrl, '_blank')
                          }
                        }}
                        title="Download Result"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="destructive"
                        className="h-8 w-8"
                        onClick={() => {
                          const updatedHistory = history.filter(h => h.id !== item.id)
                          setHistory(updatedHistory)
                          localStorage.setItem('snapcut_history', JSON.stringify(updatedHistory))
                        }}
                        title="Delete from History"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
