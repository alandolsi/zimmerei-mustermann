import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Switch } from '@/components/ui/switch'
import { Plus, Trash, PencilSimple, Image as ImageIcon } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'

export interface Project {
  id: string
  title: string
  category: string
  image: string
  description: string
  isActive: boolean
}

interface ProjectsAdminProps {
  onBack: () => void
}

export function ProjectsAdmin({ onBack }: ProjectsAdminProps) {
  const [projects, setProjects] = useKV<Project[]>('projects-list', [])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    image: '',
    description: '',
    isActive: true,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.category || !formData.image || !formData.description) {
      toast.error('Bitte füllen Sie alle Felder aus')
      return
    }

    if (editingProject) {
      setProjects((currentProjects) => 
        (currentProjects || []).map(p => 
          p.id === editingProject.id 
            ? { ...p, ...formData }
            : p
        )
      )
      toast.success('Projekt aktualisiert')
    } else {
      const newProject: Project = {
        id: Date.now().toString(),
        ...formData,
      }
      setProjects((currentProjects) => [...(currentProjects || []), newProject])
      toast.success('Projekt hinzugefügt')
    }

    setFormData({ title: '', category: '', image: '', description: '', isActive: true })
    setIsAddDialogOpen(false)
    setEditingProject(null)
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setFormData({
      title: project.title,
      category: project.category,
      image: project.image,
      description: project.description,
      isActive: project.isActive,
    })
    setIsAddDialogOpen(true)
  }

  const toggleActive = (id: string) => {
    setProjects((currentProjects) =>
      (currentProjects || []).map(p =>
        p.id === id ? { ...p, isActive: !p.isActive } : p
      )
    )
    toast.success('Status aktualisiert')
  }

  const handleDelete = (id: string) => {
    if (confirm('Möchten Sie dieses Projekt wirklich löschen?')) {
      setProjects((currentProjects) => (currentProjects || []).filter(p => p.id !== id))
      toast.success('Projekt gelöscht')
    }
  }

  const handleCloseDialog = () => {
    setIsAddDialogOpen(false)
    setEditingProject(null)
    setFormData({ title: '', category: '', image: '', description: '', isActive: true })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground py-6 px-4 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Projektverwaltung</h1>
            <p className="text-primary-foreground/90 mt-1">Verwalten Sie Ihre Projekte</p>
          </div>
          <Button variant="secondary" onClick={onBack}>
            Zurück zum Admin
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-2xl">Projekte</CardTitle>
            <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
              if (!open) handleCloseDialog()
              else setIsAddDialogOpen(true)
            }}>
              <DialogTrigger asChild>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="mr-2" />
                  Neues Projekt
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingProject ? 'Projekt bearbeiten' : 'Neues Projekt hinzufügen'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Titel</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="z.B. Einfamilienhaus Neubau"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category">Kategorie</Label>
                    <Input
                      id="category"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="z.B. Dachstuhl, Holzbau, Sanierung"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">Bild URL</Label>
                    <Input
                      id="image"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://..."
                      required
                    />
                    {formData.image && (
                      <div className="mt-2 relative aspect-video overflow-hidden rounded-lg border">
                        <img 
                          src={formData.image} 
                          alt="Vorschau" 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = ''
                            e.currentTarget.className = 'hidden'
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Beschreibung</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Beschreiben Sie das Projekt..."
                      required
                      rows={4}
                    />
                  </div>

                  <div className="flex items-center justify-between space-x-2 py-2">
                    <Label htmlFor="active">Aktiv</Label>
                    <Switch
                      id="active"
                      checked={formData.isActive}
                      onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button type="submit" className="flex-1">
                      {editingProject ? 'Aktualisieren' : 'Hinzufügen'}
                    </Button>
                    <Button type="button" variant="outline" onClick={handleCloseDialog}>
                      Abbrechen
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            {!projects || projects.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p>Noch keine Projekte vorhanden.</p>
                <p className="text-sm mt-2">Fügen Sie Ihr erstes Projekt hinzu!</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-24">Bild</TableHead>
                    <TableHead>Titel</TableHead>
                    <TableHead>Kategorie</TableHead>
                    <TableHead>Beschreibung</TableHead>
                    <TableHead className="w-20">Status</TableHead>
                    <TableHead className="w-32 text-right">Aktionen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project) => (
                    <TableRow key={project.id}>
                      <TableCell>
                        <div className="relative w-16 h-16 rounded overflow-hidden bg-muted">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = ''
                              e.currentTarget.className = 'hidden'
                            }}
                          />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{project.title}</TableCell>
                      <TableCell>
                        <Badge>{project.category}</Badge>
                      </TableCell>
                      <TableCell className="max-w-md truncate">{project.description}</TableCell>
                      <TableCell>
                        <Switch
                          checked={project.isActive}
                          onCheckedChange={() => toggleActive(project.id)}
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleEdit(project)}
                          >
                            <PencilSimple className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(project.id)}
                          >
                            <Trash className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
