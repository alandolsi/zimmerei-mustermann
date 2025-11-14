import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/but
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/tex
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Plus, Trash, FloppyDisk, Image as ImageIcon } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface HeaderAdminProps {
  onBack: () => void
}

interface Slide {
  id: string
  image: string
  title: string
  subtitle: string
}

interface HeaderData {
  companyName: string
  logo?: string
  slides: Slide[]
}

const defaultHeaderData: HeaderData = {
  companyName: 'Zimmerei Mustermann',
  slides: [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?q=80&w=2000',
      title: 'Traditionelle Holzbaukunst',
      subtitle: 'Handwerksqualität für nachhaltige Bauwerke',
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000',
      title: 'Moderne Dachkonstruktionen',
      subtitle: 'Innovation trifft auf bewährte Technik',
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2000',
      title: 'Fachgerechte Sanierungen',
      subtitle: 'Erhaltung und Modernisierung Ihres Gebäudes',
    },
  ],
}

export function HeaderAdmin({ onBack }: HeaderAdminProps) {
  const [headerData, setHeaderData] = useKV<HeaderData>('header-data', defaultHeaderData)
  const [companyName, setCompanyName] = useState('')
  const [logo, setLogo] = useState('')
  const [slides, setSlides] = useState<Slide[]>([])

  useEffect(() => {
    if (headerData) {
      setCompanyName(headerData.companyName)
      setLogo(headerData.logo || '')
      setSlides(headerData.slides)
    }
  }, [headerData])

  const handleSave = () => {
    setHeaderData(() => ({
      companyName,
      logo: logo || undefined,
      slides,
    }))
    toast.success('Header-Daten erfolgreich gespeichert')
  }

  const handleAddSlide = () => {
    const newSlide: Slide = {
      id: Date.now().toString(),
      image: '',
      title: '',
      subtitle: '',
    }
    setSlides((current) => [...current, newSlide])
  }

  const handleDeleteSlide = (slideId: string) => {
    if (slides.length <= 1) {
      toast.error('Mindestens ein Slide muss vorhanden sein')
      return
    }
    setSlides((current) => current.filter((slide) => slide.id !== slideId))
    toast.success('Slide gelöscht')
  }

  const handleUpdateSlide = (slideId: string, field: keyof Slide, value: string) => {
    setSlides((current) =>
      current.map((slide) =>
        slide.id === slideId ? { ...slide, [field]: value } : slide
      )
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground py-6 px-4 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Header bearbeiten</h1>
            <p className="text-primary-foreground/90 mt-1">
              Verwalten Sie den Firmennamen und die Slides im Hero-Bereich
            </p>
          </div>
          <Button variant="secondary" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zurück
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Firmenname</CardTitle>
            <CardDescription>
              Dieser Name wird im Header der Website angezeigt
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="company-name">Firmenname</Label>
              <Input
                id="company-name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="z.B. Zimmerei Mustermann"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Hero-Slides</CardTitle>
                <CardDescription>
                  Verwalten Sie die Bilder und Texte im Hero-Bereich
                </CardDescription>
              </div>
              <Button onClick={handleAddSlide}>
                <Plus className="mr-2 h-4 w-4" />
                Slide hinzufügen
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {slides.map((slide, index) => (
              <Card key={slide.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Slide {index + 1}</CardTitle>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => handleDeleteSlide(slide.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`image-${slide.id}`}>
                      <ImageIcon className="inline-block mr-2 h-4 w-4" />
                      Bild-URL
                    </Label>
                    <Input
                      id={`image-${slide.id}`}
                      value={slide.image}
                      onChange={(e) =>
                        handleUpdateSlide(slide.id, 'image', e.target.value)
                      }
                      placeholder="https://images.unsplash.com/..."
                    />
                    {slide.image && (
                      <div className="mt-2">
                        <img
                          src={slide.image}
                          alt="Vorschau"
                          className="w-full h-32 object-cover rounded-md"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`title-${slide.id}`}>Titel</Label>
                    <Input
                      id={`title-${slide.id}`}
                      value={slide.title}
                      onChange={(e) =>
                        handleUpdateSlide(slide.id, 'title', e.target.value)
                      }
                      placeholder="z.B. Traditionelle Holzbaukunst"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`subtitle-${slide.id}`}>Untertitel</Label>
                    <Textarea
                      id={`subtitle-${slide.id}`}
                      value={slide.subtitle}
                      onChange={(e) =>
                        handleUpdateSlide(slide.id, 'subtitle', e.target.value)
                      }
                      placeholder="z.B. Handwerksqualität für nachhaltige Bauwerke"
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSave} size="lg">
            <FloppyDisk className="mr-2 h-5 w-5" />
            Änderungen speichern
          </Button>
        </div>
      </div>
    </div>
  )
}
tarea'
import { ArrowLeft, Plus, Trash, FloppyDisk, Image as ImageIcon } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface HeaderAdminProps {
  onBack: () => void
}

interface Slide {
  id: string
  image: string
  title: string
  subtitle: string
}

interface HeaderData {
  companyName: string
  logo?: string
  slides: Slide[]
}

const defaultHeaderData: HeaderData = {
  companyName: 'Zimmerei Mustermann',
  slides: [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?q=80&w=2000',
      title: 'Traditionelle Holzbaukunst',
      subtitle: 'Handwerksqualität für nachhaltige Bauwerke',
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000',
      title: 'Moderne Dachkonstruktionen',
      subtitle: 'Innovation trifft auf bewährte Technik',
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2000',
      title: 'Fachgerechte Sanierungen',
      subtitle: 'Erhaltung und Modernisierung Ihres Gebäudes',
    },
  ],
}

export function HeaderAdmin({ onBack }: HeaderAdminProps) {
  const [headerData, setHeaderData] = useKV<HeaderData>('header-data', defaultHeaderData)
  const [companyName, setCompanyName] = useState('')
  const [logo, setLogo] = useState('')
  const [slides, setSlides] = useState<Slide[]>([])

  useEffect(() => {
    if (headerData) {
      setCompanyName(headerData.companyName)
      setLogo(headerData.logo || '')
      setSlides(headerData.slides)
    }
  }, [headerData])

  const handleSave = () => {
    setHeaderData(() => ({
      companyName,
      logo: logo || undefined,
      slides,
    }))
    toast.success('Header-Daten erfolgreich gespeichert')
  }

  const handleAddSlide = () => {
    const newSlide: Slide = {
      id: Date.now().toString(),
      image: '',
      title: '',
      subtitle: '',
    }
    setSlides((current) => [...current, newSlide])
  }

  const handleDeleteSlide = (slideId: string) => {
    if (slides.length <= 1) {
      toast.error('Mindestens ein Slide muss vorhanden sein')
      return
    }
    setSlides((current) => current.filter((slide) => slide.id !== slideId))
    toast.success('Slide gelöscht')
  }

  const handleUpdateSlide = (slideId: string, field: keyof Slide, value: string) => {
    setSlides((current) =>
      current.map((slide) =>
        slide.id === slideId ? { ...slide, [field]: value } : slide
      )
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground py-6 px-4 shadow-md">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Header bearbeiten</h1>
            <p className="text-primary-foreground/90 mt-1">
              Verwalten Sie den Firmennamen und die Slides im Hero-Bereich
            </p>
          </div>
          <Button variant="secondary" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zurück
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Firmenidentität</CardTitle>
            <CardDescription>
              Verwalten Sie den Firmennamen und das Logo
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company-name">Firmenname</Label>
              <Input
                id="company-name"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="z.B. Zimmerei Mustermann"
              />
              <p className="text-xs text-muted-foreground">
                Wird als Fallback angezeigt, wenn kein Logo vorhanden ist
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="logo-url">
                <ImageIcon className="inline-block mr-2 h-4 w-4" />
                Logo-URL (optional)
              </Label>
              <Input
                id="logo-url"
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
                placeholder="https://example.com/logo.png"
              />
              <p className="text-xs text-muted-foreground">
                Fügen Sie eine URL zu Ihrem Logo hinzu. Lassen Sie dieses Feld leer, um den Firmennamen anzuzeigen.
              </p>
              {logo && (
                <div className="mt-4 p-4 border rounded-md bg-muted/30">
                  <p className="text-sm font-medium mb-2">Vorschau:</p>
                  <div className="flex gap-4 items-start">
                    <div className="bg-white p-4 rounded-md">
                      <p className="text-xs text-muted-foreground mb-2">Heller Hintergrund</p>
                      <img
                        src={logo}
                        alt="Logo Vorschau"
                        className="h-12 object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    </div>
                    <div className="bg-primary p-4 rounded-md">
                      <p className="text-xs text-primary-foreground/80 mb-2">Dunkler Hintergrund</p>
                      <img
                        src={logo}
                        alt="Logo Vorschau"
                        className="h-12 object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Hero-Slides</CardTitle>
                <CardDescription>
                  Verwalten Sie die Bilder und Texte im Hero-Bereich
                </CardDescription>
              </div>
              <Button onClick={handleAddSlide}>
                <Plus className="mr-2 h-4 w-4" />
                Slide hinzufügen
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {slides.map((slide, index) => (
              <Card key={slide.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Slide {index + 1}</CardTitle>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => handleDeleteSlide(slide.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`image-${slide.id}`}>
                      <ImageIcon className="inline-block mr-2 h-4 w-4" />
                      Bild-URL
                    </Label>
                    <Input
                      id={`image-${slide.id}`}
                      value={slide.image}
                      onChange={(e) =>
                        handleUpdateSlide(slide.id, 'image', e.target.value)
                      }
                      placeholder="https://images.unsplash.com/..."
                    />
                    {slide.image && (
                      <div className="mt-2">
                        <img
                          src={slide.image}
                          alt="Vorschau"
                          className="w-full h-32 object-cover rounded-md"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`title-${slide.id}`}>Titel</Label>
                    <Input
                      id={`title-${slide.id}`}
                      value={slide.title}
                      onChange={(e) =>
                        handleUpdateSlide(slide.id, 'title', e.target.value)
                      }
                      placeholder="z.B. Traditionelle Holzbaukunst"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`subtitle-${slide.id}`}>Untertitel</Label>
                    <Textarea
                      id={`subtitle-${slide.id}`}
                      value={slide.subtitle}
                      onChange={(e) =>
                        handleUpdateSlide(slide.id, 'subtitle', e.target.value)
                      }
                      placeholder="z.B. Handwerksqualität für nachhaltige Bauwerke"
                      rows={2}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSave} size="lg">
            <FloppyDisk className="mr-2 h-5 w-5" />
            Änderungen speichern
          </Button>
        </div>
      </div>
    </div>
  )
}
