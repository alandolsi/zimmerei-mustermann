import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Certificate, Users, Hammer } from '@phosphor-icons/react'
import { motion } from 'framer-motion'

const features = [
  {
    icon: Certificate,
    title: 'Meisterbetrieb',
    description: 'Zertifizierter Meisterbetrieb mit höchsten Qualitätsstandards',
  },
  {
    icon: Users,
    title: '30+ Jahre Erfahrung',
    description: 'Über drei Jahrzehnte Expertise im Zimmererhandwerk',
  },
  {
    icon: Hammer,
    title: 'Fachkompetenz',
    description: 'Hochqualifiziertes Team aus erfahrenen Zimmerern',
  },
  {
    icon: CheckCircle,
    title: 'TÜV-geprüft',
    description: 'Geprüfte Qualität und Sicherheit bei allen Arbeiten',
  },
]

export function About() {
  return (
    <section id="about" className="py-16 md:py-24 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Über uns
            </h2>
            <div className="space-y-4 text-lg text-foreground/80 leading-relaxed">
              <p>
                Die <strong>Karmann Zimmerei</strong> ist Ihr kompetenter Partner für alle 
                Zimmererarbeiten in der Region München. Als traditionsreicher Meisterbetrieb 
                verbinden wir handwerkliches Können mit modernster Technik.
              </p>
              <p>
                Seit über 30 Jahren stehen wir für höchste Qualität im Holzbau. Unser 
                erfahrenes Team besteht aus qualifizierten Zimmerern, die mit Leidenschaft 
                und Präzision arbeiten. Von der Planung bis zur Ausführung - bei uns ist 
                Ihr Projekt in besten Händen.
              </p>
              <p>
                Wir legen großen Wert auf Nachhaltigkeit und verwenden ausschließlich 
                hochwertige Materialien. Ihre Zufriedenheit und die langfristige Qualität 
                unserer Arbeit sind unser oberstes Ziel.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              <Badge variant="outline" className="text-sm py-1.5 px-3">
                Meisterbetrieb
              </Badge>
              <Badge variant="outline" className="text-sm py-1.5 px-3">
                TÜV-geprüft
              </Badge>
              <Badge variant="outline" className="text-sm py-1.5 px-3">
                Versichert
              </Badge>
              <Badge variant="outline" className="text-sm py-1.5 px-3">
                Nachhaltig
              </Badge>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" weight="duotone" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}