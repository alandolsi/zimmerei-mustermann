import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { motion } from 'framer-motion'

const projects = [
  {
    id: 1,
    title: 'Einfamilienhaus Neubau',
    category: 'Dachstuhl',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800',
    description: 'Moderner Dachstuhl mit Gaube für ein Einfamilienhaus in München',
  },
  {
    id: 2,
    title: 'Carport Holzkonstruktion',
    category: 'Holzbau',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800',
    description: 'Freistehender Carport in hochwertiger Holzbauweise',
  },
  {
    id: 3,
    title: 'Dachsanierung Altbau',
    category: 'Sanierung',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800',
    description: 'Komplette Dachsanierung eines denkmalgeschützten Gebäudes',
  },
  {
    id: 4,
    title: 'Holzterrassenüberdachung',
    category: 'Anbauten',
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=800',
    description: 'Elegante Terrassenüberdachung mit integrierter Beleuchtung',
  },
  {
    id: 5,
    title: 'Gewerbebau Holzkonstruktion',
    category: 'Holzbau',
    image: 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=800',
    description: 'Große Holzkonstruktion für einen Gewerbebetrieb',
  },
  {
    id: 6,
    title: 'Wintergarten Anbau',
    category: 'Anbauten',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=800',
    description: 'Wintergarten mit Holzrahmenkonstruktion',
  },
]

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  return (
    <section id="projects" className="py-16 md:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Unsere Projekte
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ein Einblick in unsere hochwertigen Arbeiten - Qualität, auf die man bauen kann
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                className="overflow-hidden cursor-pointer group h-full p-0"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <CardContent className="p-6">
                  <div className="mb-2">
                    <Badge variant="secondary">{project.category}</Badge>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-muted-foreground text-sm">{project.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl">
          {selectedProject && (
            <div className="space-y-4">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-96 object-cover rounded-lg"
              />
              <div>
                <Badge variant="secondary" className="mb-2">
                  {selectedProject.category}
                </Badge>
                <h3 className="text-2xl font-bold mb-2">{selectedProject.title}</h3>
                <p className="text-muted-foreground">{selectedProject.description}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}