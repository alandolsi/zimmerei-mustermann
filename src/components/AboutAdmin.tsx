import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Trash, PencilSimple, ArrowLeft } from '@phosphor-icons/react'
import { toast } from 'sonner'
import * as Icons from '@phosphor-icons/react'

export interface AboutFeature {
  id: string
  icon: string
  title: string
  description: string
}

export interface AboutContent {
  heading: string
  paragraphs: string[]
  badges: string[]
}

const availableIcons = [
  'Certificate', 'Users', 'Hammer', 'CheckCircle',
  'Medal', 'Handshake', 'Star', 'Shield',
  'Trophy', 'Target', 'Leaf', 'Heart'
]

interface AboutAdminProps {
  onBack: () => void
}

export function AboutAdmin({ onBack }: AboutAdminProps) {
  const [features, setFeatures] = useKV<AboutFeature[]>('about-features', [])
  const [content, setContent] = useKV<AboutContent>('about-content', {
    heading: 'Über uns',
    paragraphs: [],
    badges: []
  })
  
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingFeature, setEditingFeature] = useState<AboutFeature | null>(null)
  const [featureFormData, setFeatureFormData] = useState({
    icon: 'Certificate',
    title: '',
    description: '',
  })

  const [contentFormData, setContentFormData] = useState({
    heading: content?.heading || 'Über uns',
    paragraphs: content?.paragraphs?.join('\n\n') || '',
    badges: content?.badges?.join(', ') || ''
  })

  const handleFeatureSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!featureFormData.title || !featureFormData.description) {
      toast.error('Bitte füllen Sie alle Felder aus')
      return
    }

    if (editingFeature) {
      setFeatures((currentFeatures) =>
        (currentFeatures || []).map(f =>
          f.id === editingFeature.id
            ? { ...editingFeature, ...featureFormData }
            : f
        )
      )
      toast.success('Feature aktualisiert')
      setEditingFeature(null)
    } else {
      const newFeature: AboutFeature = {
        id: Date.now().toString(),
        ...featureFormData,
      }
      setFeatures((currentFeatures) => [...(currentFeatures || []), newFeature])
      toast.success('Feature hinzugefügt')
    }

    setFeatureFormData({ icon: 'Certificate', title: '', description: '' })
    setIsAddDialogOpen(false)
  }

  const handleDeleteFeature = (id: string) => {
    setFeatures((currentFeatures) => (currentFeatures || []).filter(f => f.id !== id))
    toast.success('Feature gelöscht')
  }

  const handleEditFeature = (feature: AboutFeature) => {
    setEditingFeature(feature)
    setFeatureFormData({
      icon: feature.icon,
      title: feature.title,
      description: feature.description,
    })
    setIsAddDialogOpen(true)
  }

  const handleContentSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const updatedContent: AboutContent = {
      heading: contentFormData.heading,
      paragraphs: contentFormData.paragraphs.split('\n\n').filter(p => p.trim()),
      badges: contentFormData.badges.split(',').map(b => b.trim()).filter(b => b)
    }

    setContent(updatedContent)
    toast.success('Textinhalte aktualisiert')
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground py-6 px-4 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Über uns verwalten</h1>
            <p className="text-primary-foreground/90 mt-1">Verwalten Sie die Inhalte der Über-uns-Sektion</p>
          </div>
          <Button variant="secondary" onClick={onBack}>
            <ArrowLeft className="mr-2" />
            Zurück
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl">Textinhalte</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleContentSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="heading">Überschrift</Label>
                  <Input
                    id="heading"
                    value={contentFormData.heading}
                    onChange={(e) => setContentFormData({ ...contentFormData, heading: e.target.value })}
                    placeholder="Über uns"
                  />
                </div>

                <div>
                  <Label htmlFor="paragraphs">Absätze (durch doppelte Zeilenumbrüche trennen)</Label>
                  <Textarea
                    id="paragraphs"
                    value={contentFormData.paragraphs}
                    onChange={(e) => setContentFormData({ ...contentFormData, paragraphs: e.target.value })}
                    placeholder="Erster Absatz&#10;&#10;Zweiter Absatz&#10;&#10;Dritter Absatz"
                    rows={12}
                  />
                </div>

                <div>
                  <Label htmlFor="badges">Badges (durch Komma trennen)</Label>
                  <Input
                    id="badges"
                    value={contentFormData.badges}
                    onChange={(e) => setContentFormData({ ...contentFormData, badges: e.target.value })}
                    placeholder="Meisterbetrieb, TÜV-geprüft, Versichert, Nachhaltig"
                  />
                </div>

                <Button type="submit">Textinhalte speichern</Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-2xl">Features</CardTitle>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => {
                    setEditingFeature(null)
                    setFeatureFormData({ icon: 'Certificate', title: '', description: '' })
                  }}>
                    <Plus className="mr-2" />
                    Feature hinzufügen
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingFeature ? 'Feature bearbeiten' : 'Neues Feature hinzufügen'}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleFeatureSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="icon">Icon</Label>
                      <Select
                        value={featureFormData.icon}
                        onValueChange={(value) => setFeatureFormData({ ...featureFormData, icon: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {availableIcons.map((icon) => {
                            const IconComponent = (Icons as any)[icon]
                            return (
                              <SelectItem key={icon} value={icon}>
                                <div className="flex items-center gap-2">
                                  {IconComponent && <IconComponent className="w-4 h-4" />}
                                  <span>{icon}</span>
                                </div>
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="title">Titel</Label>
                      <Input
                        id="title"
                        value={featureFormData.title}
                        onChange={(e) => setFeatureFormData({ ...featureFormData, title: e.target.value })}
                        placeholder="z.B. Meisterbetrieb"
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Beschreibung</Label>
                      <Textarea
                        id="description"
                        value={featureFormData.description}
                        onChange={(e) => setFeatureFormData({ ...featureFormData, description: e.target.value })}
                        placeholder="Kurze Beschreibung des Features"
                        rows={4}
                      />
                    </div>

                    <Button type="submit" className="w-full">
                      {editingFeature ? 'Feature aktualisieren' : 'Feature hinzufügen'}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              {(!features || features.length === 0) ? (
                <p className="text-muted-foreground text-center py-8">
                  Noch keine Features vorhanden. Fügen Sie Ihr erstes Feature hinzu!
                </p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Icon</TableHead>
                      <TableHead>Titel</TableHead>
                      <TableHead>Beschreibung</TableHead>
                      <TableHead className="text-right">Aktionen</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {features.map((feature) => {
                      const IconComponent = (Icons as any)[feature.icon]
                      return (
                        <TableRow key={feature.id}>
                          <TableCell>
                            {IconComponent && <IconComponent className="w-6 h-6 text-primary" weight="duotone" />}
                          </TableCell>
                          <TableCell className="font-medium">{feature.title}</TableCell>
                          <TableCell className="max-w-md truncate">{feature.description}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditFeature(feature)}
                              >
                                <PencilSimple className="w-4 h-4" />
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeleteFeature(feature.id)}
                              >
                                <Trash className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
