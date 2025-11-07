import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { motion, AnimatePresence } from 'framer-motion'

interface Project {
  id: number
  title: string
  category: string
  image: string
  description: string
}

const categories = ['Alle', 'Dachstuhl', 'Carport', 'Terrasse', 'Holzbau', 'Fassade']

const projects: Project[] = [
  {
    id: 1,
    title: 'Moderner Dachstuhl Einfamilienhaus',
    category: 'Dachstuhl',
    image: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?w=800&h=600&fit=crop',
    description: 'Kompletter Dachstuhl für ein modernes Einfamilienhaus mit Satteldach',
  },
  {
    id: 2,
    title: 'Carport mit Holzkonstruktion',
    category: 'Carport',
    image: 'https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?w=800&h=600&fit=crop',
    description: 'Maßgefertigter Carport aus massivem Holz für zwei Fahrzeuge',
  },
  {
    id: 3,
    title: 'Terrassenüberdachung',
    category: 'Terrasse',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
    description: 'Elegante Terrassenüberdachung mit Holz-Glas-Konstruktion',
  },
  {
    id: 4,
    title: 'Holzfassade Mehrfamilienhaus',
    category: 'Fassade',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
    description: 'Moderne Holzfassade mit nachhaltiger Lärchenverkleidung',
  },
  {
    id: 5,
    title: 'Dachsanierung Altbau',
    category: 'Dachstuhl',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop',
    description: 'Sanierung und Verstärkung eines historischen Dachstuhls',
  },
  {
    id: 6,
    title: 'Gartenhaus Holzbau',
    category: 'Holzbau',
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?w=800&h=600&fit=crop',
    description: 'Maßgefertigtes Gartenhaus in nachhaltiger Holzbauweise',
  },
  {
    id: 7,
    title: 'Walmdach Neubau',
    category: 'Dachstuhl',
    image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop',
    description: 'Walmdachkonstruktion für Neubau-Einfamilienhaus',
  },
  {
    id: 8,
    title: 'Holzterrasse mit Pergola',
    category: 'Terrasse',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=600&fit=crop',
    description: 'Großzügige Holzterrasse mit integrierter Pergola',
  },
  {
    id: 9,
    title: 'Doppelcarport Premium',
    category: 'Carport',
    image: 'https://images.unsplash.com/photo-1600573472556-e636c2acde0e?w=800&h=600&fit=crop',
    description: 'Premium Doppelcarport mit Abstellraum und Satteldach',
  },
  {
    id: 10,
    title: 'Holzanbau Wohnhaus',
    category: 'Holzbau',
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop',
    description: 'Moderner Holzanbau mit großflächiger Verglasung',
  },
  {
    id: 11,
    title: 'Fassadensanierung Holz',
    category: 'Fassade',
    image: 'https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=800&h=600&fit=crop',
    description: 'Komplettsanierung mit moderner Holzfassade',
  },
  {
    id: 12,
    title: 'Pergola Garten',
    category: 'Terrasse',
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop',
    description: 'Freistehende Gartenpergola aus massivem Eichenholz',
  },
]

export function References() {
  const [selectedCategory, setSelectedCategory] = useState('Alle')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const filteredProjects = selectedCategory === 'Alle'
    ? projects
    : projects.filter(project => project.category === selectedCategory)

  return (
    <section id="references" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Referenzen
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Überzeugen Sie sich von unserer Arbeit - Qualität, die man sieht
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              onClick={() => setSelectedCategory(category)}
              className="px-6"
            >
              {category}
            </Button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card
                  className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Badge className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm">
                      {project.category}
                    </Badge>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              Keine Projekte in dieser Kategorie gefunden.
            </p>
          </div>
        )}
      </div>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl">
          {selectedProject && (
            <div className="space-y-4">
              <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-bold">{selectedProject.title}</h3>
                  <Badge variant="secondary">{selectedProject.category}</Badge>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
