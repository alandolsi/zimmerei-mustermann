import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { useKV } from '@github/spark/hooks'
import * as Icons from '@phosphor-icons/react'
import type { Service } from './ServicesAdmin'

const defaultServices: Service[] = [
  {
    id: '1',
    icon: 'House',
    title: 'Dachstuhl',
    description: 'Traditionelle und moderne Dachkonstruktionen nach Ihren Wünschen - vom klassischen Satteldach bis zu komplexen Dachformen.',
  },
  {
    id: '2',
    icon: 'TreeEvergreen',
    title: 'Holzbau',
    description: 'Hochwertige Holzkonstruktionen für Wohn- und Gewerbebau. Nachhaltig, ökologisch und energieeffizient.',
  },
  {
    id: '3',
    icon: 'ArrowsClockwise',
    title: 'Sanierung',
    description: 'Fachgerechte Sanierung und Modernisierung von Altbauten und historischen Gebäuden mit viel Erfahrung.',
  },
  {
    id: '4',
    icon: 'Hammer',
    title: 'Zimmererarbeiten',
    description: 'Professionelle Zimmerarbeiten aller Art - von der Planung bis zur Ausführung alles aus einer Hand.',
  },
  {
    id: '5',
    icon: 'Buildings',
    title: 'Anbauten',
    description: 'Wohnraumerweiterungen in Holzbauweise - Garagen, Carports, Wintergärten und Terrassenüberdachungen.',
  },
  {
    id: '6',
    icon: 'Wrench',
    title: 'Reparaturen',
    description: 'Schnelle und zuverlässige Reparaturen an Dach und Holzkonstruktionen. Notdienst verfügbar.',
  },
]

export function Services() {
  const [services] = useKV<Service[]>('services-list', defaultServices)
  const displayServices = services || defaultServices

  return (
    <section id="services" className="py-16 md:py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Unsere Leistungen
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Als Meisterbetrieb bieten wir Ihnen ein umfassendes Leistungsspektrum rund um Holzbau und Zimmerei
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displayServices.map((service, index) => {
            const IconComponent = (Icons as any)[service.icon]
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      {IconComponent && <IconComponent className="w-6 h-6 text-primary" weight="duotone" />}
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}