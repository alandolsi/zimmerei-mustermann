import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Phone, Envelope, MapPin } from '@phosphor-icons/react'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

interface ContactSubmission {
  id: string
  name: string
  email: string
  phone: string
  message: string
  timestamp: number
}

export function Contact() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  
  useEffect(() => {
    const loadSubmissions = async () => {
      try {
        const stored = await window.spark.kv.get<ContactSubmission[]>('contact-submissions')
        if (stored) {
          setSubmissions(stored)
        }
      } catch (error) {
        console.error('Failed to load submissions:', error)
      }
    }
    loadSubmissions()
  }, [])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Bitte füllen Sie alle Pflichtfelder aus')
      return
    }

    const submission: ContactSubmission = {
      id: Date.now().toString(),
      ...formData,
      timestamp: Date.now(),
    }

    const updatedSubmissions = [...submissions, submission]
    setSubmissions(updatedSubmissions)
    
    try {
      await window.spark.kv.set('contact-submissions', updatedSubmissions)
      toast.success('Vielen Dank! Wir melden uns bald bei Ihnen.')
    } catch (error) {
      console.error('Failed to save submission:', error)
      toast.error('Es gab einen Fehler beim Speichern')
    }

    setFormData({
      name: '',
      email: '',
      phone: '',
      message: '',
    })
  }

  return (
    <section id="contact" className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Kontaktieren Sie uns
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Haben Sie Fragen oder möchten Sie ein Projekt besprechen? Wir freuen uns auf Ihre Nachricht!
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <div className="bg-gradient-to-br from-primary to-primary/80 rounded-xl p-8 text-primary-foreground shadow-lg flex-1">
              <h3 className="text-2xl font-bold mb-2">Sprechen wir über Ihr Projekt</h3>
              <p className="text-primary-foreground/90 mb-8">
                Unser Team steht Ihnen für Beratung und individuelle Angebote zur Verfügung.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary-foreground" weight="bold" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Telefon</h4>
                    <a href="tel:+4989123456789" className="text-primary-foreground/90 hover:text-primary-foreground transition-colors">
                      +49 89 123 456 78
                    </a>
                    <p className="text-sm text-primary-foreground/70 mt-1">Mo-Fr: 7:00 - 18:00 Uhr</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                    <Envelope className="w-6 h-6 text-primary-foreground" weight="bold" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">E-Mail</h4>
                    <a href="mailto:info@karmann-zimmerei.de" className="text-primary-foreground/90 hover:text-primary-foreground transition-colors break-all">
                      info@karmann-zimmerei.de
                    </a>
                    <p className="text-sm text-primary-foreground/70 mt-1">Antwort innerhalb von 24 Stunden</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary-foreground" weight="bold" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-1">Adresse</h4>
                    <address className="text-primary-foreground/90 not-italic">
                      Musterstraße 123
                      <br />
                      80331 München
                      <br />
                      Deutschland
                    </address>
                  </div>
                </div>
              </div>
            </div>

            <Card className="border-2">
              <CardContent className="p-6">
                <h4 className="font-semibold text-lg mb-3">Öffnungszeiten</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Montag - Freitag:</span>
                    <span className="font-medium">7:00 - 18:00 Uhr</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Samstag:</span>
                    <span className="font-medium">Nach Vereinbarung</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sonntag:</span>
                    <span className="font-medium">Geschlossen</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3 flex"
          >
            <Card className="shadow-lg border-2 flex-1 flex flex-col">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl">Anfrage senden</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  Füllen Sie das Formular aus und wir melden uns schnellstmöglich bei Ihnen.
                </p>
              </CardHeader>
              <CardContent className="pt-2 flex-1 flex flex-col">
                <form onSubmit={handleSubmit} className="space-y-5 flex-1 flex flex-col">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">
                        Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Max Mustermann"
                        required
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        E-Mail <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="max@beispiel.de"
                        required
                        className="h-11"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Telefon
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+49 89 123 456 78"
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-2 flex-1 flex flex-col">
                    <Label htmlFor="message" className="text-sm font-medium">
                      Nachricht <span className="text-destructive">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Beschreiben Sie Ihr Projekt oder Ihre Anfrage..."
                      required
                      className="resize-none flex-1 min-h-[140px]"
                    />
                  </div>

                  <div className="flex items-start gap-3 pt-2">
                    <Button type="submit" size="lg" className="px-8">
                      Nachricht senden
                    </Button>
                    <p className="text-xs text-muted-foreground pt-3 leading-relaxed">
                      Mit dem Absenden stimmen Sie der Verarbeitung Ihrer Daten zu.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}