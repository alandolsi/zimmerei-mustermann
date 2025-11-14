import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
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
  const [slides, setSlides] = useState<Slide[]>([])

  useEffect(() => {
    if (headerData) {
      setCompanyName(headerData.companyName)
      setSlides(headerData.slides)
    }
  }, [headerData])

  const handleSave = () => {
    setHeaderData((current) => ({
      ...current,
      companyName,
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

  const handleUpdateSlide = (id: string, field: keyof Slide, value: string) => {
    setSlides((current) =>
      current.map((slide) =>
        slide.id === id ? { ...slide, [field]: value } : slide
      )
    )
  }

  const handleDeleteSlide = (id: string) => {
    if (slides.length <= 1) {
      toast.error('Mindestens ein Slide muss vorhanden sein')
      return
    }
    setSlides((current) => current.filter((slide) => slide.id !== id))
    toast.success('Slide gelöscht')
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground py-6 px-4 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Header & Hero Slider verwalten</h1>
            <p className="text-primary-foreground/90 mt-1">
              Bearbeiten Sie den Firmennamen und die Hero-Slider-Inhalte
            </p>
          </div>
          <Button variant="secondary" onClick={onBack}>
            <ArrowLeft className="mr-2" />
            Zurück
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Firmenname</CardTitle>
            <CardDescription>
              Dieser Name wird im Header der Website angezeigt
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="company-name">Firmenname</Label>
                <Input
                  id="company-name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="z.B. Zimmerei Mustermann"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Hero Slider</CardTitle>
              <CardDescription>
                Verwalten Sie die Bilder und Texte im Hero-Bereich
              </CardDescription>
            </div>
            <Button onClick={handleAddSlide}>
              <Plus className="mr-2" />
              Slide hinzufügen
            </Button>
          </CardHeader>
          <CardContent className="space-y-6">
            {slides.map((slide, index) => (
              <Card key={slide.id} className="border-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Slide {index + 1}</CardTitle>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDeleteSlide(slide.id)}
                      disabled={slides.length <= 1}
                    >
                      <Trash />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor={`image-${slide.id}`}>
                      <ImageIcon className="inline mr-2" />
                      Bild-URL
                    </Label>
                    <Input
                      id={`image-${slide.id}`}
                      value={slide.image}
                      onChange={(e) =>
                        handleUpdateSlide(slide.id, 'image', e.target.value)
                      }
                      placeholder="https://example.com/image.jpg"
                    />
                    {slide.image && (
                      <div className="mt-2 relative h-40 rounded-lg overflow-hidden">
                        <img
                          src={slide.image}
                          alt="Vorschau"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>

                  <div>
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

                  <div>
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
          <Button size="lg" onClick={handleSave}>
            <FloppyDisk className="mr-2" />
            Alle Änderungen speichern
          </Button>
        </div>
      </div>
    </div>
  )
}
