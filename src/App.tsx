import { useState } from 'react'
import { Toaster } from '@/components/ui/sonner'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Services } from '@/components/Services'
import { Projects } from '@/components/Projects'
import { About } from '@/components/About'
import { References } from '@/components/References'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { Impressum } from '@/components/Impressum'
import { Datenschutz } from '@/components/Datenschutz'
import { AGB } from '@/components/AGB'

type Page = 'home' | 'impressum' | 'datenschutz' | 'agb'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')

  const navigateToPage = (page: Page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (currentPage === 'impressum') {
    return (
      <>
        <Impressum onBack={() => navigateToPage('home')} />
        <Toaster position="top-right" />
      </>
    )
  }

  if (currentPage === 'datenschutz') {
    return (
      <>
        <Datenschutz onBack={() => navigateToPage('home')} />
        <Toaster position="top-right" />
      </>
    )
  }

  if (currentPage === 'agb') {
    return (
      <>
        <AGB onBack={() => navigateToPage('home')} />
        <Toaster position="top-right" />
      </>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Services />
        <Projects />
        <About />
        <References />
        <Contact />
      </main>
      <Footer 
        onNavigateToImpressum={() => navigateToPage('impressum')}
        onNavigateToDatenschutz={() => navigateToPage('datenschutz')}
        onNavigateToAGB={() => navigateToPage('agb')}
      />
      <Toaster position="top-right" />
    </div>
  )
}

export default App