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
import { AdminLogin } from '@/components/AdminLogin'
import { AdminDashboard } from '@/components/AdminDashboard'
import { AdminSettings } from '@/components/AdminSettings'
import { ServicesAdmin } from '@/components/ServicesAdmin'
import { ContactAdmin } from '@/components/ContactAdmin'
import { ProjectsAdmin } from '@/components/ProjectsAdmin'
import { ReferencesAdmin } from '@/components/ReferencesAdmin'
import { AboutAdmin } from '@/components/AboutAdmin'

type Page = 'home' | 'impressum' | 'datenschutz' | 'agb' | 'admin-login' | 'admin' | 'admin-settings' | 'admin-services' | 'admin-contacts' | 'admin-projects' | 'admin-references' | 'admin-about'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const [isOwner, setIsOwner] = useState(false)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false)

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

  useEffect(() => {
    const migrateOldData = async () => {
      try {
        const oldEmail = await window.spark.kv.get<string>('admin-email')
        const oldPassword = await window.spark.kv.get<string>('admin-password')
        
        if (oldEmail || oldPassword) {
          const existingUser = await window.spark.kv.get<{ email: string; password: string }>('user')
          
          if (!existingUser && oldEmail && oldPassword) {
            await window.spark.kv.set('user', { email: oldEmail, password: oldPassword })
          }
          
          await window.spark.kv.delete('admin-email')
          await window.spark.kv.delete('admin-password')
        }
      } catch (error) {
        console.error('Migration error:', error)
      }
    }
    migrateOldData()
  }, [])

  const navigateToPage = (page: Page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleLogout = () => {
    setIsAdminAuthenticated(false)
    navigateToPage('home')
  }

  const handleLoginSuccess = () => {
    setIsAdminAuthenticated(true)
    navigateToPage('admin')
  }

  if (currentPage === 'admin-login') {
    return (
      <>
        <AdminLogin 
          onLoginSuccess={handleLoginSuccess}
          onBack={() => navigateToPage('home')}
        />
        <ScrollToTop />
        <Toaster position="top-right" />
      </>
    )
  }

  if (currentPage === 'admin' && isAdminAuthenticated) {
    return (
      <>
        <AdminDashboard 
          onBack={() => navigateToPage('home')}
          onLogout={handleLogout}
          onNavigateToServices={() => navigateToPage('admin-services')}
          onNavigateToContacts={() => navigateToPage('admin-contacts')}
          onNavigateToProjects={() => navigateToPage('admin-projects')}
          onNavigateToReferences={() => navigateToPage('admin-references')}
          onNavigateToAbout={() => navigateToPage('admin-about')}
          onNavigateToSettings={() => navigateToPage('admin-settings')}
        />
        <ScrollToTop />
        <Toaster position="top-right" />
      </>
    )
  }

  if (currentPage === 'admin-settings' && isAdminAuthenticated) {
    return (
      <>
        <AdminSettings onBack={() => navigateToPage('admin')} />
        <ScrollToTop />
        <Toaster position="top-right" />
      </>
    )
  }

  if (currentPage === 'admin-services' && isAdminAuthenticated) {
    return (
      <>
        <ServicesAdmin onBack={() => navigateToPage('admin')} />
        <ScrollToTop />
        <Toaster position="top-right" />
      </>
    )
  }

  if (currentPage === 'admin-contacts' && isAdminAuthenticated) {
    return (
      <>
        <ContactAdmin onBack={() => navigateToPage('admin')} />
        <ScrollToTop />
        <Toaster position="top-right" />
      </>
    )
  }

  if (currentPage === 'admin-projects' && isAdminAuthenticated) {
    return (
      <>
        <ProjectsAdmin onBack={() => navigateToPage('admin')} />
        <ScrollToTop />
        <Toaster position="top-right" />
      </>
    )
  }

  if (currentPage === 'admin-references' && isAdminAuthenticated) {
    return (
      <>
        <ReferencesAdmin onBack={() => navigateToPage('admin')} />
        <ScrollToTop />
        <Toaster position="top-right" />
      </>
    )
  }

  if (currentPage === 'admin-about' && isAdminAuthenticated) {
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
        <About />
        <Projects />
        <Services />
        <References />
        <Contact />
      </main>
      <Footer 
        onNavigateToImpressum={() => navigateToPage('impressum')}
        onNavigateToDatenschutz={() => navigateToPage('datenschutz')}
        onNavigateToAGB={() => navigateToPage('agb')}
        onNavigateToAdmin={isOwner ? () => navigateToPage('admin-login') : undefined}
      />
      <ScrollToTop />
      <Toaster position="top-right" />
    </div>
  )
}

export default App