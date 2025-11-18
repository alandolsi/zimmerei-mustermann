import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Wrench, Envelope, ArrowLeft, FolderOpen, Images, Info, Gear, SignOut, Aperture, Database } from '@phosphor-icons/react'

interface AdminDashboardProps {
  onBack: () => void
  onNavigateToServices: () => void
  onNavigateToContacts: () => void
  onNavigateToProjects: () => void
  onNavigateToReferences: () => void
  onNavigateToAbout: () => void
  onNavigateToSettings: () => void
  onNavigateToHeader: () => void
  onNavigateToMigration: () => void
  onLogout: () => void
}

export function AdminDashboard({ onBack, onNavigateToServices, onNavigateToContacts, onNavigateToProjects, onNavigateToReferences, onNavigateToAbout, onNavigateToSettings, onNavigateToHeader, onNavigateToMigration, onLogout }: AdminDashboardProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground py-6 px-4 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Admin-Dashboard</h1>
            <p className="text-primary-foreground/90 mt-1">Verwaltung Ihrer Website-Inhalte</p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={onLogout}>
              <SignOut className="mr-2" />
              Abmelden
            </Button>
            <Button variant="secondary" onClick={onBack}>
              <ArrowLeft className="mr-2" />
              Zur Hauptseite
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={onNavigateToHeader}>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Aperture className="w-6 h-6 text-primary" weight="duotone" />
              </div>
              <CardTitle className="text-2xl">Hero Slider</CardTitle>
              <CardDescription className="text-base">
                Bearbeiten Sie die Hero-Slider-Inhalte
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                Zur Header-Verwaltung
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={onNavigateToServices}>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Wrench className="w-6 h-6 text-primary" weight="duotone" />
              </div>
              <CardTitle className="text-2xl">Leistungen verwalten</CardTitle>
              <CardDescription className="text-base">
                Fügen Sie neue Leistungen hinzu, bearbeiten oder entfernen Sie bestehende Einträge
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                Zur Leistungsverwaltung
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={onNavigateToProjects}>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <FolderOpen className="w-6 h-6 text-primary" weight="duotone" />
              </div>
              <CardTitle className="text-2xl">Projekte verwalten</CardTitle>
              <CardDescription className="text-base">
                Fügen Sie neue Projekte hinzu, bearbeiten oder entfernen Sie bestehende Projekte
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                Zur Projektverwaltung
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={onNavigateToReferences}>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Images className="w-6 h-6 text-primary" weight="duotone" />
              </div>
              <CardTitle className="text-2xl">Referenzen verwalten</CardTitle>
              <CardDescription className="text-base">
                Fügen Sie neue Referenzen hinzu, bearbeiten oder entfernen Sie bestehende Referenzen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                Zur Referenzverwaltung
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={onNavigateToAbout}>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Info className="w-6 h-6 text-primary" weight="duotone" />
              </div>
              <CardTitle className="text-2xl">Über uns verwalten</CardTitle>
              <CardDescription className="text-base">
                Bearbeiten Sie Texte und Features der Über-uns-Sektion
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                Zur Über-uns-Verwaltung
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={onNavigateToContacts}>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Envelope className="w-6 h-6 text-primary" weight="duotone" />
              </div>
              <CardTitle className="text-2xl">Kontaktanfragen</CardTitle>
              <CardDescription className="text-base">
                Sehen Sie alle eingegangenen Kontaktanfragen und verwalten Sie diese
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                Zu den Anfragen
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={onNavigateToSettings}>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Gear className="w-6 h-6 text-primary" weight="duotone" />
              </div>
              <CardTitle className="text-2xl">Einstellungen</CardTitle>
              <CardDescription className="text-base">
                Verwalten Sie Firmenname, Logo, Admin-Passwort und weitere Einstellungen
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                Zu den Einstellungen
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-primary" onClick={onNavigateToMigration}>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Database className="w-6 h-6 text-primary" weight="duotone" />
              </div>
              <CardTitle className="text-2xl">Appwrite Migration</CardTitle>
              <CardDescription className="text-base">
                Migrieren Sie Ihre Daten zu Appwrite
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">
                Zur Datenmigration
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
