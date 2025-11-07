import { useKV } from '@github/spark/hooks'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Trash, Envelope, Phone, User, Calendar } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface ContactSubmission {
  id: string
  name: string
  email: string
  phone: string
  message: string
  timestamp: number
}

interface ContactAdminProps {
  onBack: () => void
}

export function ContactAdmin({ onBack }: ContactAdminProps) {
  const [submissions, setSubmissions] = useKV<ContactSubmission[]>('contact-submissions', [])

  const handleDelete = (id: string) => {
    if (confirm('Möchten Sie diese Anfrage wirklich löschen?')) {
      setSubmissions((current) => (current || []).filter(s => s.id !== id))
      toast.success('Anfrage gelöscht')
    }
  }

  const handleDeleteAll = () => {
    if (confirm('Möchten Sie wirklich ALLE Anfragen löschen? Diese Aktion kann nicht rückgängig gemacht werden.')) {
      setSubmissions([])
      toast.success('Alle Anfragen gelöscht')
    }
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const displaySubmissions = submissions || []

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground py-6 px-4 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Kontaktanfragen</h1>
            <p className="text-primary-foreground/90 mt-1">Übersicht aller eingegangenen Anfragen</p>
          </div>
          <Button variant="secondary" onClick={onBack}>
            Zurück zur Hauptseite
          </Button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-2xl">
              Anfragen ({displaySubmissions.length})
            </CardTitle>
            {displaySubmissions.length > 0 && (
              <Button variant="destructive" onClick={handleDeleteAll}>
                <Trash className="mr-2" />
                Alle löschen
              </Button>
            )}
          </CardHeader>
          <CardContent>
            {displaySubmissions.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Envelope className="w-16 h-16 mx-auto mb-4 opacity-20" />
                <p>Noch keine Kontaktanfragen vorhanden.</p>
                <p className="text-sm mt-2">Neue Anfragen erscheinen hier automatisch.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {displaySubmissions.map((submission) => (
                  <Card key={submission.id} className="border-2">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-muted-foreground" />
                            <span className="font-semibold text-lg">{submission.name}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Envelope className="w-4 h-4" />
                              <a href={`mailto:${submission.email}`} className="hover:text-primary">
                                {submission.email}
                              </a>
                            </div>
                            {submission.phone && (
                              <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4" />
                                <a href={`tel:${submission.phone}`} className="hover:text-primary">
                                  {submission.phone}
                                </a>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Calendar className="w-3 h-3" />
                            {formatDate(submission.timestamp)}
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDelete(submission.id)}
                        >
                          <Trash className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4">
                        <p className="text-sm font-medium mb-2">Nachricht:</p>
                        <p className="text-sm whitespace-pre-wrap">{submission.message}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
