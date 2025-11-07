import { useState, useEffect } from 'react'
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
import { ScrollToTop } from '@/components/ScrollToTop'
import { AdminDashboard } from '@/components/AdminDashboard'
import { ServicesAdmin } from '@/components/ServicesAdmin'
import { ContactAdmin } from '@/components/ContactAdmin'
import { ProjectsAdmin } from '@/components/ProjectsAdmin'
import { ReferencesAdmin } from '@/components/ReferencesAdmin'
import { AboutAdmin } from '@/components/AboutAdmin'

type Page = 'home' | 'impressum' | 'datenschutz' | 'agb' | 'admin' | 'admin-services' | 'admin-contacts' | 'admin-projects' | 'admin-references' | 'admin-about'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [isOwner, setIsOwner] = useState(false)

  useEffect(() => {
    const checkOwner = async () => {
      try {
        const user = await window.spark.user()
        if (user) {
          setIsOwner(user.isOwner)
        }
      } catch (error) {
        setIsOwner(false)
      }
    }
    checkOwner()
  }, [])

  const navigateToPage = (page: Page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (currentPage === 'admin' && isOwner) {
    return (
      <>
        <AdminDashboard 
          onBack={() => navigateToPage('home')}
          onNavigateToServices={() => navigateToPage('admin-services')}
          onNavigateToContacts={() => navigateToPage('admin-contacts')}
          onNavigateToProjects={() => navigateToPage('admin-projects')}
          onNavigateToReferences={() => navigateToPage('admin-references')}
          onNavigateToAbout={() => navigateToPage('admin-about')}
        />
        <ScrollToTop />
        <Toaster position="top-right" />
      </>
    )
  }

  if (currentPage === 'admin-services' && isOwner) {
    return (
      <>
        <ServicesAdmin onBack={() => navigateToPage('admin')} />
        <ScrollToTop />
        <Toaster position="top-right" />
      </>
    )
  }

  if (currentPage === 'admin-contacts' && isOwner) {
    return (
      <>
        <ContactAdmin onBack={() => navigateToPage('admin')} />
        <ScrollToTop />
        <Toaster position="top-right" />
      </>
    )
  }

  if (currentPage === 'admin-projects' && isOwner) {
    return (
      <>
        <ProjectsAdmin onBack={() => navigateToPage('admin')} />
        <ScrollToTop />
        <Toaster position="top-right" />
      </>
    )
  }

  if (currentPage === 'admin-references' && isOwner) {
    return (
      <>
        <ReferencesAdmin onBack={() => navigateToPage('admin')} />
        <ScrollToTop />
        <Toaster position="top-right" />
      </>
    )
  }

  if (currentPage === 'admin-about' && isOwner) {
    return (
      <>
        <AboutAdmin onBack={() => navigateToPage('admin')} />
        <ScrollToTop />
        <Toaster position="top-right" />
      </>
    )
  }

  if (currentPage === 'impressum') {
    return (
      <>
        <Impressum onBack={() => navigateToPage('home')} />
        <ScrollToTop />
        <Toaster position="top-right" />
      </>
    )
  }

  if (currentPage === 'datenschutz') {
    return (
      <>
        <Datenschutz onBack={() => navigateToPage('home')} />
        <ScrollToTop />
        <Toaster position="top-right" />
      </>
    )
  }

  if (currentPage === 'agb') {
    return (
      <>
        <AGB onBack={() => navigateToPage('home')} />
        <ScrollToTop />
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
        onNavigateToAdmin={isOwner ? () => navigateToPage('admin') : undefined}
      />
      <ScrollToTop />
      <Toaster position="top-right" />
    </div>
  )
}

export default App