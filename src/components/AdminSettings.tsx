import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Building, Key, Eye, EyeSlash, Check, Trash } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { useKV } from '@github/spark/hooks'

interface AdminSettingsProps {
  onBack: () => void
}

interface HeaderData {
  companyName: string
  slides: any[]
}

export function AdminSettings({ onBack }: AdminSettingsProps) {
  const [adminUser, setAdminUser] = useKV<{ email: string; password: string } | null>('user', null)
  const [headerData, setHeaderData] = useKV<HeaderData>('header-data', { 
    companyName: 'Zimmerei Mustermann',
    slides: []
  })

  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const [companyName, setCompanyName] = useState('')
  const [logoUrl, setLogoUrl] = useState('')

  useEffect(() => {
    if (adminUser) {
      setEmail(adminUser.email)
    }
    if (headerData) {
      setCompanyName(headerData.companyName || 'Zimmerei Mustermann')
    }
  }, [adminUser, headerData])

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (!adminUser) {
      setAdminUser({ email, password: newPassword })
      toast.success('Admin-Konto erfolgreich erstellt')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setIsLoading(false)
      return
    }

    if (currentPassword !== adminUser.password) {
      toast.error('Aktuelles Passwort ist falsch')
      setIsLoading(false)
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwörter stimmen nicht überein')
      setIsLoading(false)
      return
    }

    if (newPassword.length < 6) {
      toast.error('Passwort muss mindestens 6 Zeichen lang sein')
      setIsLoading(false)
      return
    }

    setAdminUser({ email, password: newPassword })
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setIsLoading(false)
    toast.success('Passwort erfolgreich geändert')
  }

  const handleCancelPasswordChange = () => {
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    if (adminUser) {
      setEmail(adminUser.email)
    }
  }

  const handleCompanySettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setHeaderData((current) => ({
      ...current,
      companyName,
      slides: current?.slides || []
    }))
    toast.success('Firmeneinstellungen gespeichert')
  }

  const handleLogoRemove = () => {
    setLogoUrl('')
    toast.success('Logo entfernt')
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground py-6 px-4 shadow-md">
        <div className="max-w-3xl mx-auto">
          <Button variant="secondary" onClick={onBack} className="mb-4">
            <ArrowLeft className="mr-2" />
            Zurück zum Dashboard
          </Button>
          <h1 className="text-3xl font-bold">Allgemeine Einstellungen</h1>
          <p className="text-primary-foreground/90 mt-1">Verwalten Sie die allgemeinen Informationen Ihres Unternehmens</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12 space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Building className="w-6 h-6" />
              <CardTitle>Firmeneinstellungen</CardTitle>
            </div>
            <CardDescription className="text-base">
              Verwalten Sie die allgemeinen Informationen Ihres Unternehmens
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCompanySettingsSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="company-name">Firmenname</Label>
                <Input
                  type="text"
                  id="company-name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="z.B. Zimmerei Mustermann"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Dieser Name wird im Header der Website angezeigt
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo-url">Logo URL (optional)</Label>
                <Input
                  type="url"
                  id="logo-url"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  placeholder="https://beispiel.de/logo.png"
                />
                <p className="text-sm text-muted-foreground">
                  URL zu Ihrem Firmenlogo (wird zukünftig unterstützt)
                </p>
              </div>

              {logoUrl && (
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <img
                    src={logoUrl}
                    alt="Logo Vorschau"
                    className="w-16 h-16 object-contain"
                    onError={(e) => {
                      e.currentTarget.src = ''
                      toast.error('Logo konnte nicht geladen werden')
                    }}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={handleLogoRemove}
                  >
                    <Trash className="mr-2" />
                    Logo entfernen
                  </Button>
                </div>
              )}

              <Button type="submit" className="w-full">
                <Check className="mr-2" />
                Firmeneinstellungen speichern
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Key className="w-6 h-6" />
              <CardTitle>Admin-Anmeldedaten</CardTitle>
            </div>
            <CardDescription className="text-base">
              {adminUser 
                ? 'Ändern Sie Ihre E-Mail-Adresse und Ihr Passwort'
                : 'Legen Sie ein Admin-Konto an'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-Mail-Adresse</Label>
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {adminUser?.email && (
                  <p className="text-sm text-muted-foreground">
                    Aktuelle E-Mail: {adminUser.email}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="current-password">Aktuelles Passwort</Label>
                <div className="relative">
                  <Input
                    type={showCurrent ? 'text' : 'password'}
                    id="current-password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showCurrent ? (
                      <EyeSlash className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">Neues Passwort</Label>
                <div className="relative">
                  <Input
                    type={showNew ? 'text' : 'password'}
                    id="new-password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showNew ? (
                      <EyeSlash className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Passwort bestätigen</Label>
                <div className="relative">
                  <Input
                    type={showConfirm ? 'text' : 'password'}
                    id="confirm-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirm ? (
                      <EyeSlash className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button type="submit" disabled={isLoading} className="flex-1">
                  <Check className="mr-2" />
                  Passwort ändern
                </Button>
                <Button 
                  type="button"
                  variant="destructive" 
                  onClick={handleCancelPasswordChange}
                >
                  Abbrechen
                </Button>
              </div>

              <div className="mt-6 p-4 bg-muted rounded-lg text-sm">
                <strong>Hinweis:</strong> Wenn Sie Ihr Passwort vergessen, können nur App-Besitzer sich anmelden.
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
