import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Key, Eye, EyeSlash, Check, Buildings, Image, Trash } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface AdminSettingsProps {
  onBack: () => void
}

interface HeaderData {
  companyName: string
  logo?: string
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
    if (headerData) {
      setCompanyName(headerData.companyName || 'Zimmerei Mustermann')
      setLogoUrl(headerData.logo || '')
    }
  }, [headerData])

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (adminUser?.password && currentPassword !== adminUser.password) {
      toast.error('Aktuelles Passwort ist falsch')
      setIsLoading(false)
      return
    }

    if (!email || !email.includes('@')) {
      toast.error('Bitte geben Sie eine gültige E-Mail-Adresse ein')
      setIsLoading(false)
      return
    }

    if (newPassword.length < 6) {
      toast.error('Das neue Passwort muss mindestens 6 Zeichen lang sein')
      setIsLoading(false)
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error('Die Passwörter stimmen nicht überein')
      setIsLoading(false)
      return
    }

    await new Promise(resolve => setTimeout(resolve, 500))

    setAdminUser(() => ({ email, password: newPassword }))
    toast.success('Anmeldedaten erfolgreich gespeichert!')
    
    setEmail('')
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setIsLoading(false)
  }

  const handleRemovePassword = async () => {
    if (!window.confirm('Möchten Sie den Passwortschutz wirklich entfernen? Nur der Besitzer kann dann auf den Admin-Bereich zugreifen.')) {
      return
    }

    setAdminUser(() => null)
    toast.success('Passwortschutz entfernt')
    setEmail('')
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  const handleSaveCompanySettings = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!companyName.trim()) {
      toast.error('Bitte geben Sie einen Firmennamen ein')
      return
    }

    setHeaderData((current) => ({
      ...current,
      companyName: companyName.trim(),
      logo: logoUrl.trim() || undefined,
      slides: current?.slides || []
    }))

    toast.success('Firmeneinstellungen erfolgreich gespeichert!')
  }

  const handleRemoveLogo = () => {
    setLogoUrl('')
    setHeaderData((current) => ({
      ...current,
      companyName: current?.companyName || 'Zimmerei Mustermann',
      logo: undefined,
      slides: current?.slides || []
    }))
    toast.success('Logo entfernt')
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary text-primary-foreground py-6 px-4 shadow-md">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Admin-Einstellungen</h1>
            <p className="text-primary-foreground/90 mt-1">Passwort verwalten</p>
          </div>
          <Button variant="secondary" onClick={onBack}>
            <ArrowLeft className="mr-2" />
            Zurück
          </Button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-12 space-y-8">
        <Card>
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Buildings className="w-6 h-6 text-primary" weight="duotone" />
            </div>
            <CardTitle className="text-2xl">Firmeneinstellungen</CardTitle>
            <CardDescription className="text-base">
              Firmennamen und Logo für Navigation und Footer verwalten
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveCompanySettings} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="company-name">Firmenname</Label>
                <Input
                  id="company-name"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Zimmerei Mustermann"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Dieser Name wird in der Navigation und im Footer angezeigt
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="logo-url">Logo URL</Label>
                <Input
                  id="logo-url"
                  type="url"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                  placeholder="https://beispiel.de/logo.png"
                />
                <p className="text-sm text-muted-foreground">
                  Optional: Geben Sie die URL zu Ihrem Logo ein. Wenn kein Logo vorhanden ist, wird der Firmenname angezeigt.
                </p>
              </div>

              {logoUrl && (
                <div className="space-y-2">
                  <Label>Logo Vorschau</Label>
                  <div className="flex items-center gap-4 p-4 border rounded-lg bg-muted/30">
                    <img 
                      src={logoUrl} 
                      alt="Logo Vorschau" 
                      className="h-12 w-auto object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                    <Button 
                      type="button" 
                      variant="destructive" 
                      size="sm"
                      onClick={handleRemoveLogo}
                    >
                      <Trash className="mr-2 w-4 h-4" />
                      Logo entfernen
                    </Button>
                  </div>
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
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Key className="w-6 h-6 text-primary" weight="duotone" />
            </div>
            <CardTitle className="text-2xl">Anmeldedaten verwalten</CardTitle>
            <CardDescription className="text-base">
              {adminUser?.password 
                ? 'Ändern Sie Ihre Admin-Anmeldedaten oder entfernen Sie den Passwortschutz'
                : 'Richten Sie E-Mail und Passwort für den Admin-Bereich ein'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordChange} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="admin-email">E-Mail-Adresse</Label>
                <Input
                  id="admin-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={adminUser?.email || "admin@beispiel.de"}
                  required
                />
                {adminUser?.email && (
                  <p className="text-sm text-muted-foreground">
                    Aktuelle E-Mail: {adminUser.email}
                  </p>
                )}
              </div>

              {adminUser?.password && (
                <div className="space-y-2">
                  <Label htmlFor="current-password">Aktuelles Passwort</Label>
                  <div className="relative">
                    <Input
                      id="current-password"
                      type={showCurrent ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Aktuelles Passwort eingeben"
                      required
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrent(!showCurrent)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showCurrent ? (
                        <EyeSlash className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="new-password">Neues Passwort</Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showNew ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Neues Passwort eingeben (min. 6 Zeichen)"
                    required
                    minLength={6}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
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
                    id="confirm-password"
                    type={showConfirm ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Neues Passwort wiederholen"
                    required
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
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
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  <Check className="mr-2" />
                  {isLoading ? 'Wird gespeichert...' : 'Anmeldedaten speichern'}
                </Button>
                {adminUser?.password && (
                  <Button 
                    type="button" 
                    variant="destructive" 
                    onClick={handleRemovePassword}
                  >
                    Passwortschutz entfernen
                  </Button>
                )}
              </div>
            </form>

            {!adminUser?.password && (
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Hinweis:</strong> Wenn keine Anmeldedaten gesetzt sind, können nur Sie als Besitzer auf den Admin-Bereich zugreifen.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
