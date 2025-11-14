import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Lock, Eye, EyeSlash } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface AdminLoginProps {
  onLoginSuccess: () => void
  onBack: () => void
}

export function AdminLogin({ onLoginSuccess, onBack }: AdminLoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [adminUser, setAdminUser] = useState<{ email: string; password: string } | null>(null)

  useEffect(() => {
    const loadAdminUser = async () => {
      try {
        const user = await window.spark.kv.get<{ email: string; password: string }>('user')
        setAdminUser(user || null)
      } catch (error) {
        console.error('Failed to load admin user:', error)
      }
    }
    loadAdminUser()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const user = await window.spark.user()
      const isOwner = user && user.isOwner

      if (!adminUser) {
        if (isOwner) {
          onLoginSuccess()
          toast.success('Erfolgreich angemeldet!')
        } else {
          toast.error('Zugriff verweigert')
        }
      } else {
        if ((email === adminUser.email && password === adminUser.password) || isOwner) {
          onLoginSuccess()
          toast.success('Erfolgreich angemeldet!')
        } else {
          toast.error('E-Mail oder Passwort falsch')
        }
      }
    } catch (error) {
      toast.error('Anmeldefehler')
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8 text-primary" weight="duotone" />
          </div>
          <CardTitle className="text-3xl text-center">Admin-Bereich</CardTitle>
          <CardDescription className="text-center text-base">
            Bitte melden Sie sich an, um auf das Admin-Dashboard zuzugreifen
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="py-3 pr-4 align-top">
                    <label htmlFor="admin-email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      E-Mail
                    </label>
                  </td>
                  <td className="py-3">
                    <Input
                      id="admin-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@beispiel.de"
                      required
                    />
                  </td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 align-top">
                    <label htmlFor="admin-password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Passwort
                    </label>
                  </td>
                  <td className="py-3">
                    <div className="relative">
                      <Input
                        id="admin-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Geben Sie Ihr Passwort ein"
                        required
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {showPassword ? (
                          <EyeSlash className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="space-y-3 pt-2">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Anmeldung läuft...' : 'Anmelden'}
              </Button>
              <Button type="button" variant="outline" className="w-full" onClick={onBack}>
                Zurück zur Hauptseite
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
