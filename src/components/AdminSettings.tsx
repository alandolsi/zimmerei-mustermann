import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/but
import { Label } from '@/components/ui/label'
import { ArrowLeft, Key, Eye, EyeSlash, Check
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Key, Eye, EyeSlash, Check, Buildings, Image, Trash } from '@phosphor-icons/react'
import { toast } from 'sonner'

  companyName: string
  slides: any[]


    companyName: 'Zimm
  })
  const [email,
  const [newPas
 

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

    }
    if (!email || !em
      setIsLoading(false)
    }
    i
      setIsLoading

    if (newPassword !== confirmPassword) {
      setIsLoading(fal
    }

    setAdminUser(() => ({ email, password: newPassword }))
    
    setCurrentPassword(''
    setConfi
  }

      return

    toast.success('Passwo
    setCurre
    s

    e.preventDefault()
    if (!companyName.trim()) {
      return

     

    }))
    toast.success('Firmeneinstellungen erfolgreich gespei

    setLogoU
     

    }))

  return (
      <div className="bg-primary text-primary-foreground p
    
            <p c
          <Button variant=
            Zurück
        </div>

   

            </div>
            <CardDescription className="text-base">
            
     

                <Input
                  type="text"
                
                  required
                <p cla
                </p>


                  id="logo-url"
                  valu
    
                <p className="
                </p>

     

                      src={logoUr
                 
                        e.currentTarge
                    />
                      type="button"
       

                      Logo entfernen
   

              <Button type="submit
                Fi
            </form>
        </Card>
        <Card>
            <div class
            </div>
       
                ? 'Ändern Sie Ihre
   

          
                <Input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
               
                {adminUser?.email && (
                    Aktuelle E-Mail: {adminUser.email}
                

                <div className="space-y-2"
                  
                   
              
            

                    <button
              
                    >
                        <EyeSlash className="w-5 h-5" />
                        <Eye className="w-5 h-5" />
                  
                </div>

                <Label htmlFor="new-password">Neues Passwort</Label>
                  <Input
                    typ
                    onC
                    required
                    className="pr-10"
                  <button
                    on
                  >
                      <EyeSla
                      <Eye className=
                  </button>
              </div>
              <div classNa
                <d
                    id="confirm-password"
                    value={confirmPassword}
                    
                    

                    onClick={() => setSho
                  >
                      
                      <Eye clas
                  </button>
              </div>
              <div className="flex gap-3">
                  <Check className="mr-2" />
                </
                  <Button 
                    variant="destructive" 
                  >
                  </


              <div className="mt-6 p-4 bg-m
                  <strong>Hinweis:</strong> We
              </div>
          </CardContent>
      </div>
  )








































































































































































