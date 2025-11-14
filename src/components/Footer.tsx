import { Separator } from '@/components/ui/separator'
import { Phone, Envelope, MapPin, House, TreeEvergreen, ArrowsClockwise, Hammer, Buildings, Wrench } from '@phosphor-icons/react'
import { useKV } from '@github/spark/hooks'
import type { Service } from './ServicesAdmin'

interface HeaderData {
  companyName: string
  logo?: string
  slides: any[]
}

interface FooterProps {
  onNavigateToImpressum: () => void
  onNavigateToDatenschutz: () => void
  onNavigateToAGB: () => void
  onNavigateToAdmin?: () => void
}

const defaultServices: Service[] = [
  {
    id: '1',
    icon: 'House',
    title: 'Dachstuhl',
    description: 'Traditionelle und moderne Dachkonstruktionen nach Ihren Wünschen - vom klassischen Satteldach bis zu komplexen Dachformen.',
    isActive: true,
  },
  {
    id: '2',
    icon: 'TreeEvergreen',
    title: 'Holzbau',
    description: 'Hochwertige Holzkonstruktionen für Wohn- und Gewerbebau. Nachhaltig, ökologisch und energieeffizient.',
    isActive: true,
  },
  {
    id: '3',
    icon: 'ArrowsClockwise',
    title: 'Sanierung',
    description: 'Fachgerechte Sanierung und Modernisierung von Altbauten und historischen Gebäuden mit viel Erfahrung.',
    isActive: true,
  },
  {
    id: '4',
    icon: 'Hammer',
    title: 'Zimmererarbeiten',
    description: 'Professionelle Zimmerarbeiten aller Art - von der Planung bis zur Ausführung alles aus einer Hand.',
    isActive: true,
  },
  {
    id: '5',
    icon: 'Buildings',
    title: 'Anbauten',
    description: 'Wohnraumerweiterungen in Holzbauweise - Garagen, Carports, Wintergärten und Terrassenüberdachungen.',
    isActive: true,
  },
  {
    id: '6',
    icon: 'Wrench',
    title: 'Reparaturen',
    description: 'Schnelle und zuverlässige Reparaturen an Dach und Holzkonstruktionen. Notdienst verfügbar.',
    isActive: true,
  },
]

export function Footer({ onNavigateToImpressum, onNavigateToDatenschutz, onNavigateToAGB, onNavigateToAdmin }: FooterProps) {
  const [services] = useKV<Service[]>('services-list', defaultServices)
  const [headerData] = useKV<HeaderData>('header-data', { companyName: 'Zimmerei Mustermann', slides: [] })
  
  const displayServices = (services || defaultServices).filter(service => service.isActive)
  const companyName = headerData?.companyName || 'Zimmerei Mustermann'
  const logo = headerData?.logo

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services')
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            {logo ? (
              <img 
                src={logo} 
                alt={companyName} 
                className="h-12 w-auto object-contain mb-4 brightness-0 invert"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            ) : (
              <h3 className="text-xl font-bold mb-4">{companyName}</h3>
            )}
            {!logo && <div className="h-0" />}
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
            <h3 className="text-xl font-bold mb-4">Leistungen</h3>
            <ul className="space-y-2 text-primary-foreground/90">
              {displayServices.map((service) => {
                const iconMap: Record<string, any> = {
                  House,
                  TreeEvergreen,
                  ArrowsClockwise,
                  Hammer,
                  Buildings,
                  Wrench,
                }
                const IconComponent = iconMap[service.icon] || House
                
                return (
                  <li key={service.id} className="flex items-center gap-2">
                    <IconComponent className="w-4 h-4 flex-shrink-0" weight="duotone" />
                    <button
                      onClick={scrollToServices}
                      className="text-left hover:text-primary-foreground transition-colors hover:underline"
                    >
                      {service.title}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>

        <Separator className="bg-primary-foreground/20 mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center md:items-start space-y-2 md:col-span-2">
            <p className="text-primary-foreground/80 text-sm">
              © {new Date().getFullYear()} {companyName}. Alle Rechte vorbehalten.
            </p>
            <p className="text-primary-foreground/60 text-xs">
              Webdesign & Entwicklung by{' '}
              <a 
                href="https://www.landolsi.de" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors underline"
              >
                Landolsi Webdesign
              </a>
            </p>
          </div>
          <div className="flex flex-wrap items-center md:items-start gap-x-4 gap-y-2 text-sm">
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
            {onNavigateToAdmin && (
              <button 
                onClick={onNavigateToAdmin}
                className="text-primary-foreground/80 hover:text-primary-foreground transition-colors font-semibold"
              >
                Admin
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}