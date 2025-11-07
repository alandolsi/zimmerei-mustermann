import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { List, CaretLeft, CaretRight } from '@phosphor-icons/react'
import { motion, AnimatePresence } from 'framer-motion'

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'Leistungen', href: '#services' },
  { name: 'Projekte', href: '#projects' },
  { name: 'Über uns', href: '#about' },
  { name: 'Kontakt', href: '#contact' },
]

const carouselSlides = [
  {
    image: 'https://images.unsplash.com/photo-1513467535987-fd81bc7d62f8?q=80&w=2000',
    title: 'Traditionelle Holzbaukunst',
    subtitle: 'Handwerksqualität für nachhaltige Bauwerke',
  },
  {
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000',
    title: 'Moderne Dachkonstruktionen',
    subtitle: 'Innovation trifft auf bewährte Technik',
  },
  {
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2000',
    title: 'Fachgerechte Sanierungen',
    subtitle: 'Erhaltung und Modernisierung Ihres Gebäudes',
  },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      const sections = navItems.map(item => item.href.substring(1))
      const scrollPosition = window.scrollY + 100
      
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetBottom = offsetTop + element.offsetHeight
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0">
              <h1 className={`text-2xl font-bold transition-colors ${scrolled ? 'text-primary' : 'text-white'}`}>
                Zimmerei Mustermann
              </h1>
            </div>

            <nav className="hidden md:flex space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`relative font-semibold text-sm tracking-wide transition-colors ${
                    scrolled 
                      ? `hover:text-primary ${activeSection === item.href.substring(1) ? 'text-primary' : 'text-foreground'}`
                      : `hover:text-white ${activeSection === item.href.substring(1) ? 'text-white' : 'text-white/90'}`
                  }`}
                >
                  {item.name}
                  {activeSection === item.href.substring(1) && (
                    <span className={`absolute -bottom-1 left-0 right-0 h-0.5 ${scrolled ? 'bg-primary' : 'bg-white'}`} />
                  )}
                </button>
              ))}
            </nav>

            <div className="md:hidden">
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className={scrolled ? '' : 'text-white hover:text-white'}>
                    <List className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px]">
                  <div className="flex flex-col space-y-4 mt-8">
                    {navItems.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => handleNavClick(item.href)}
                        className={`text-left px-4 py-3 rounded-lg font-semibold transition-colors ${
                          activeSection === item.href.substring(1)
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-muted'
                        }`}
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <section id="home" className="relative h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-primary/20 z-10" />
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${carouselSlides[currentSlide].image})`,
                }}
              />
            </div>

            <div className="relative z-20 h-full flex items-center justify-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                    {carouselSlides[currentSlide].title}
                  </h1>
                  <p className="text-lg sm:text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto drop-shadow-md">
                    {carouselSlides[currentSlide].subtitle}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      size="lg" 
                      className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6"
                      onClick={() => handleNavClick('#contact')}
                    >
                      Jetzt anfragen
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-6"
                      onClick={() => handleNavClick('#projects')}
                    >
                      Unsere Projekte
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all"
          aria-label="Vorheriges Bild"
        >
          <CaretLeft className="h-6 w-6" weight="bold" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all"
          aria-label="Nächstes Bild"
        >
          <CaretRight className="h-6 w-6" weight="bold" />
        </button>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          {carouselSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/50'
              }`}
              aria-label={`Zu Bild ${index + 1} wechseln`}
            />
          ))}
        </div>
      </section>
    </>
  )
}