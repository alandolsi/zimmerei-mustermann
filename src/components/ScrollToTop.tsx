import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Button } from '@/components/ui/button'

    const toggleVisibility = ()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
    }
      } else {
        setIsVisible(false)
      }
  }

      {isVisible && (

          size="ic
        >
     
    </>






  }



      {isVisible && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 h-12 w-12 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          size="icon"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} weight="bold" />
        </Button>
      )}
    </>
  )
}
