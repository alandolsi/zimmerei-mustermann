import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Key, Eye, EyeSlash, Check } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface AdminSettingsProps {
  onBack: () => void
}

export function AdminSettings({ onBack }: AdminSettingsProps) {
  const [adminPassword, setAdminPassword] = useKV<string>('admin-password', '')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (adminPassword && currentPassword !== adminPassword) {
      toast.error('Aktuelles Passwort ist falsch')
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

    setAdminPassword(newPassword)
    toast.success('Passwort erfolgreich geändert!')
    
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setIsLoading(false)
  }

  const handleRemovePassword = async () => {
    if (!window.confirm('Möchten Sie den Passwortschutz wirklich entfernen? Nur der Besitzer kann dann auf den Admin-Bereich zugreifen.')) {
      return
    }

    setAdminPassword('')
    toast.success('Passwortschutz entfernt')
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
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

      <div className="max-w-3xl mx-auto px-4 py-12">
        <Card>
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Key className="w-6 h-6 text-primary" weight="duotone" />
            </div>
            <CardTitle className="text-2xl">Passwort ändern</CardTitle>
            <CardDescription className="text-base">
              {adminPassword 
                ? 'Ändern Sie Ihr Admin-Passwort oder entfernen Sie den Passwortschutz'
                : 'Richten Sie ein Passwort für den Admin-Bereich ein'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordChange} className="space-y-6">
              {adminPassword && (
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
                  {isLoading ? 'Wird gespeichert...' : 'Passwort speichern'}
                </Button>
                {adminPassword && (
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

            {!adminPassword && (
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Hinweis:</strong> Wenn kein Passwort gesetzt ist, können nur Sie als Besitzer auf den Admin-Bereich zugreifen.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
