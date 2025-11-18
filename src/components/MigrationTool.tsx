import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'
import { ArrowLeft, Database, CheckCircle, XCircle, Warning } from '@phosphor-icons/react'
import { createDocument } from '@/lib/appwrite'

interface MigrationToolProps {
  onBack: () => void
}

interface MigrationStatus {
  collection: string
  status: 'pending' | 'success' | 'error'
  message?: string
  count?: number
}

export function MigrationTool({ onBack }: MigrationToolProps) {
  const [databaseId, setDatabaseId] = useState('')
  const [collectionIds, setCollectionIds] = useState({
    users: '',
    headerData: '',
    services: '',
    projects: '',
    references: '',
    contactSubmissions: '',
    aboutFeatures: '',
    aboutContent: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [migrationStatus, setMigrationStatus] = useState<MigrationStatus[]>([])
  const [progress, setProgress] = useState(0)

  const updateStatus = (collection: string, status: 'pending' | 'success' | 'error', message?: string, count?: number) => {
    setMigrationStatus((prev) => {
      const existing = prev.find((s) => s.collection === collection)
      if (existing) {
        return prev.map((s) =>
          s.collection === collection ? { ...s, status, message, count } : s
        )
      }
      return [...prev, { collection, status, message, count }]
    })
  }

  const handleMigration = async () => {
    if (!databaseId || Object.values(collectionIds).some((id) => !id)) {
      toast.error('Bitte füllen Sie alle Felder aus')
      return
    }

    setIsLoading(true)
    setMigrationStatus([])
    setProgress(0)

    const collections = [
      'users',
      'headerData',
      'services',
      'projects',
      'references',
      'contactSubmissions',
      'aboutFeatures',
      'aboutContent',
    ]

    const totalSteps = collections.length
    let currentStep = 0

    try {
      for (const collection of collections) {
        updateStatus(collection, 'pending')
        
        try {
          const kvKey = getKVKey(collection)
          const data = await window.spark.kv.get(kvKey)

          if (!data) {
            updateStatus(collection, 'success', 'Keine Daten vorhanden', 0)
            currentStep++
            setProgress((currentStep / totalSteps) * 100)
            continue
          }

          const collectionId = collectionIds[collection as keyof typeof collectionIds]

          if (Array.isArray(data)) {
            for (const item of data) {
              const cleanItem = cleanDataForAppwrite(item)
              await createDocument(databaseId, collectionId, cleanItem)
            }
            updateStatus(collection, 'success', `${data.length} Einträge migriert`, data.length)
          } else {
            const cleanData = cleanDataForAppwrite(data)
            await createDocument(databaseId, collectionId, cleanData, 'default')
            updateStatus(collection, 'success', '1 Eintrag migriert', 1)
          }
        } catch (error: any) {
          updateStatus(collection, 'error', error.message || 'Fehler beim Migrieren')
          console.error(`Migration error for ${collection}:`, error)
        }

        currentStep++
        setProgress((currentStep / totalSteps) * 100)
      }

      toast.success('Migration abgeschlossen!')
    } catch (error: any) {
      toast.error('Migration fehlgeschlagen: ' + error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const getKVKey = (collection: string): string => {
    const keyMap: Record<string, string> = {
      users: 'user',
      headerData: 'header-data',
      services: 'services-list',
      projects: 'projects-list',
      references: 'references-list',
      contactSubmissions: 'contact-submissions',
      aboutFeatures: 'about-features',
      aboutContent: 'about-content',
    }
    return keyMap[collection] || collection
  }

  const cleanDataForAppwrite = (data: any): any => {
    if (Array.isArray(data)) {
      return data.map((item) => cleanDataForAppwrite(item))
    }

    if (typeof data === 'object' && data !== null) {
      const cleaned: any = {}
      for (const [key, value] of Object.entries(data)) {
        if (key === 'id' || key === '$id') continue
        
        if (Array.isArray(value)) {
          cleaned[key] = JSON.stringify(value)
        } else if (typeof value === 'object' && value !== null) {
          cleaned[key] = JSON.stringify(value)
        } else {
          cleaned[key] = value
        }
      }
      return cleaned
    }

    return data
  }

  const getStatusIcon = (status: 'pending' | 'success' | 'error') => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" weight="fill" />
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" weight="fill" />
      case 'pending':
        return <Warning className="w-5 h-5 text-yellow-600" weight="fill" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground py-6 px-4 shadow-md">
        <div className="max-w-4xl mx-auto">
          <Button variant="secondary" onClick={onBack} className="mb-4">
            <ArrowLeft className="mr-2" />
            Zurück
          </Button>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Database className="w-8 h-8" />
            Appwrite Migration
          </h1>
          <p className="text-primary-foreground/90 mt-1">
            Migrieren Sie Ihre Daten zu Appwrite
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <Card className="border-yellow-500 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-900">
              <Warning className="w-5 h-5" />
              Wichtiger Hinweis
            </CardTitle>
          </CardHeader>
          <CardContent className="text-yellow-900">
            <p className="mb-2">Bevor Sie die Migration starten:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Erstellen Sie eine Datenbank in Appwrite</li>
              <li>Erstellen Sie alle erforderlichen Collections (siehe Dokumentation oben)</li>
              <li>Notieren Sie die Database ID und alle Collection IDs</li>
              <li>Stellen Sie sicher, dass die API-Key korrekt ist</li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Konfiguration</CardTitle>
            <CardDescription>
              Geben Sie Ihre Appwrite Database und Collection IDs ein
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="database-id">Database ID</Label>
              <Input
                id="database-id"
                value={databaseId}
                onChange={(e) => setDatabaseId(e.target.value)}
                placeholder="z.B. 67890abcdef"
                disabled={isLoading}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="users-collection">Users Collection ID</Label>
                <Input
                  id="users-collection"
                  value={collectionIds.users}
                  onChange={(e) =>
                    setCollectionIds({ ...collectionIds, users: e.target.value })
                  }
                  placeholder="Collection ID"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="header-collection">Header Data Collection ID</Label>
                <Input
                  id="header-collection"
                  value={collectionIds.headerData}
                  onChange={(e) =>
                    setCollectionIds({ ...collectionIds, headerData: e.target.value })
                  }
                  placeholder="Collection ID"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="services-collection">Services Collection ID</Label>
                <Input
                  id="services-collection"
                  value={collectionIds.services}
                  onChange={(e) =>
                    setCollectionIds({ ...collectionIds, services: e.target.value })
                  }
                  placeholder="Collection ID"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="projects-collection">Projects Collection ID</Label>
                <Input
                  id="projects-collection"
                  value={collectionIds.projects}
                  onChange={(e) =>
                    setCollectionIds({ ...collectionIds, projects: e.target.value })
                  }
                  placeholder="Collection ID"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="references-collection">References Collection ID</Label>
                <Input
                  id="references-collection"
                  value={collectionIds.references}
                  onChange={(e) =>
                    setCollectionIds({ ...collectionIds, references: e.target.value })
                  }
                  placeholder="Collection ID"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contacts-collection">Contact Submissions Collection ID</Label>
                <Input
                  id="contacts-collection"
                  value={collectionIds.contactSubmissions}
                  onChange={(e) =>
                    setCollectionIds({
                      ...collectionIds,
                      contactSubmissions: e.target.value,
                    })
                  }
                  placeholder="Collection ID"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="about-features-collection">About Features Collection ID</Label>
                <Input
                  id="about-features-collection"
                  value={collectionIds.aboutFeatures}
                  onChange={(e) =>
                    setCollectionIds({
                      ...collectionIds,
                      aboutFeatures: e.target.value,
                    })
                  }
                  placeholder="Collection ID"
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="about-content-collection">About Content Collection ID</Label>
                <Input
                  id="about-content-collection"
                  value={collectionIds.aboutContent}
                  onChange={(e) =>
                    setCollectionIds({
                      ...collectionIds,
                      aboutContent: e.target.value,
                    })
                  }
                  placeholder="Collection ID"
                  disabled={isLoading}
                />
              </div>
            </div>

            <Button
              onClick={handleMigration}
              disabled={isLoading}
              className="w-full"
              size="lg"
            >
              <Database className="mr-2" />
              {isLoading ? 'Migration läuft...' : 'Migration starten'}
            </Button>
          </CardContent>
        </Card>

        {migrationStatus.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Migrations-Status</CardTitle>
              <CardDescription>
                Fortschritt der Datenmigration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={progress} className="w-full" />
              <div className="space-y-2">
                {migrationStatus.map((status) => (
                  <div
                    key={status.collection}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {getStatusIcon(status.status)}
                      <div>
                        <p className="font-medium capitalize">{status.collection}</p>
                        {status.message && (
                          <p className="text-sm text-muted-foreground">{status.message}</p>
                        )}
                      </div>
                    </div>
                    {status.count !== undefined && (
                      <span className="text-sm font-medium">{status.count} Einträge</span>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
