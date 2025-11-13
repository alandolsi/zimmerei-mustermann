import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Plus, Trash, PencilSimple, Eye, EyeSlash } from '@phosphor-icons/react'
import { toast } from 'sonner'
import * as Icons from '@phosphor-icons/react'

export interface Service {
  id: string
  icon: string
  title: string
  description: string
  isActive: boolean
}

const availableIcons = [
  'House', 'TreeEvergreen', 'ArrowsClockwise', 'Hammer', 
  'Buildings', 'Wrench', 'Toolbox', 'HardHat', 
  'Ladder', 'CirclesThree', 'Gauge', 'PaintBrush'
]

interface ServicesAdminProps {
  onBack: () => void
}

export function ServicesAdmin({ onBack }: ServicesAdminProps) {
  const [services, setServices] = useKV<Service[]>('services-list', [])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [formData, setFormData] = useState({
    icon: 'House',
    title: '',
    description: '',
    isActive: true,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.description) {
      toast.error('Bitte füllen Sie alle Felder aus')
      return
    }

    if (editingService) {
      setServices((currentServices) => 
        (currentServices || []).map(s => 
          s.id === editingService.id 
            ? { ...s, ...formData }
            : s
        )
      )
      toast.success('Leistung aktualisiert')
    } else {
      const newService: Service = {
        id: Date.now().toString(),
        ...formData,
      }
      setServices((currentServices) => [...(currentServices || []), newService])
      toast.success('Leistung hinzugefügt')
    }

    setFormData({ icon: 'House', title: '', description: '', isActive: true })
    setIsAddDialogOpen(false)
    setEditingService(null)
  }

  const handleEdit = (service: Service) => {
    setEditingService(service)
    setFormData({
      icon: service.icon,
      title: service.title,
      description: service.description,
      isActive: service.isActive,
    })
    setIsAddDialogOpen(true)
  }

  const toggleActive = (id: string) => {
    setServices((currentServices) =>
      (currentServices || []).map(s =>
        s.id === id ? { ...s, isActive: !s.isActive } : s
      )
    )
    toast.success('Status aktualisiert')
  }

  const handleDelete = (id: string) => {
    if (confirm('Möchten Sie diese Leistung wirklich löschen?')) {
      setServices((currentServices) => (currentServices || []).filter(s => s.id !== id))
      toast.success('Leistung gelöscht')
    }
  }

  const handleCloseDialog = () => {
    setIsAddDialogOpen(false)
    setEditingService(null)
    setFormData({ icon: 'House', title: '', description: '', isActive: true })
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground py-6 px-4 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Leistungsverwaltung</h1>
            <p className="text-primary-foreground/90 mt-1">Verwalten Sie Ihre Dienstleistungen</p>
          </div>
          <Button variant="secondary" onClick={onBack}>
            Zurück zur Hauptseite
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-2xl">Leistungen</CardTitle>
            <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
              if (!open) handleCloseDialog()
              else setIsAddDialogOpen(true)
            }}>
              <DialogTrigger asChild>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <Plus className="mr-2" />
                  Neue Leistung
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingService ? 'Leistung bearbeiten' : 'Neue Leistung hinzufügen'}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="icon">Icon</Label>
                    <Select
                      value={formData.icon}
                      onValueChange={(value) => setFormData({ ...formData, icon: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {availableIcons.map((iconName) => {
                          const IconComponent = (Icons as any)[iconName]
                          return (
                            <SelectItem key={iconName} value={iconName}>
                              <div className="flex items-center gap-2">
                                {IconComponent && <IconComponent className="w-4 h-4" />}
                                {iconName}
                              </div>
                            </SelectItem>
                          )
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">Titel</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="z.B. Dachstuhl"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Beschreibung</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Beschreiben Sie die Leistung..."
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
                      {editingService ? 'Aktualisieren' : 'Hinzufügen'}
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
            {!services || services.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <p>Noch keine Leistungen vorhanden.</p>
                <p className="text-sm mt-2">Fügen Sie Ihre erste Leistung hinzu!</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">Icon</TableHead>
                    <TableHead>Titel</TableHead>
                    <TableHead>Beschreibung</TableHead>
                    <TableHead className="w-20">Status</TableHead>
                    <TableHead className="w-32 text-right">Aktionen</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {services.map((service) => {
                    const IconComponent = (Icons as any)[service.icon]
                    return (
                      <TableRow key={service.id}>
                        <TableCell>
                          {IconComponent && (
                            <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                              <IconComponent className="w-5 h-5 text-primary" weight="duotone" />
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="font-medium">{service.title}</TableCell>
                        <TableCell className="max-w-md truncate">{service.description}</TableCell>
                        <TableCell>
                          <Switch
                            checked={service.isActive}
                            onCheckedChange={() => toggleActive(service.id)}
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEdit(service)}
                            >
                              <PencilSimple className="w-4 h-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDelete(service.id)}
                            >
                              <Trash className="w-4 h-4 text-destructive" />
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
  )
}
