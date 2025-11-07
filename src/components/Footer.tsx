import { Separator } from '@/components/ui/separator'
import { Phone, Envelope, MapPin } from '@phosphor-icons/react'

interface FooterProps {
  onNavigateToImpressum: () => void
  onNavigateToDatenschutz: () => void
  onNavigateToAGB: () => void
}

export function Footer({ onNavigateToImpressum, onNavigateToDatenschutz, onNavigateToAGB }: FooterProps) {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Zimmerei Mustermann</h3>
            <p className="text-primary-foreground/90 leading-relaxed">
              Ihr Meisterbetrieb für Holzbau und Zimmererarbeiten. 
              Qualität und Präzision seit über 30 Jahren.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Kontakt</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5" weight="duotone" />
                <span className="text-primary-foreground/90">+49 123 456 7890</span>
              </div>
              <div className="flex items-center space-x-3">
                <Envelope className="w-5 h-5" weight="duotone" />
                <span className="text-primary-foreground/90">info@beispiel-zimmerei.de</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5" weight="duotone" />
                <span className="text-primary-foreground/90">Beispielstraße 123, 12345 Musterstadt</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Öffnungszeiten</h3>
            <div className="space-y-2 text-primary-foreground/90">
              <div className="flex justify-between">
                <span>Montag - Freitag:</span>
                <span>7:00 - 18:00</span>
              </div>
              <div className="flex justify-between">
                <span>Samstag:</span>
                <span>Nach Vereinbarung</span>
              </div>
              <div className="flex justify-between">
                <span>Sonntag:</span>
                <span>Geschlossen</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-primary-foreground/20 mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-primary-foreground/80 text-sm">
            © {new Date().getFullYear()} Zimmerei Mustermann. Alle Rechte vorbehalten.
          </p>
          <div className="flex space-x-6 text-sm">
            <button 
              onClick={onNavigateToImpressum}
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              Impressum
            </button>
            <button 
              onClick={onNavigateToDatenschutz}
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              Datenschutz
            </button>
            <button 
              onClick={onNavigateToAGB}
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              AGB
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}