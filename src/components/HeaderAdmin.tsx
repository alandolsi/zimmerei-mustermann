import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/but
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Plus, Trash, FloppyDisk, Image as ImageIcon } from '@phosphor-icons/react'
interface HeaderAdminProps {

interface Slide {
  image: string
 

  companyName: st
}
const defaultHe
  slides: [
      id: '1',
 

      id: '2',
      title: 'Moderne
    },
 

    },
}
export func
  con

    if (headerData) {
      title: 'Traditionelle Holzbaukunst',
      subtitle: 'Handwerksqualität für nachhaltige Bauwerke',
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2000',
      title: 'Moderne Dachkonstruktionen',
      subtitle: 'Innovation trifft auf bewährte Technik',
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2000',
      title: 'Fachgerechte Sanierungen',
      subtitle: 'Erhaltung und Modernisierung Ihres Gebäudes',
    },
  ],
}

export function HeaderAdmin({ onBack }: HeaderAdminProps) {
  const [headerData, setHeaderData] = useKV<HeaderData>('header-data', defaultHeaderData)
  const [companyName, setCompanyName] = useState('')
  const [slides, setSlides] = useState<Slide[]>([])

  useEffect(() => {
    setCompanyName(headerData.companyName)
    setSlides(headerData.slides)
  }, [headerData])

  const handleSave = () => {
    setHeaderData((current) => ({
      ...current,
      companyName,
    if (slide
      r
    setSlides((current) => current.filter((slide) => slid
  }

      <div className="bg-primary
          <div>
            <p className="text-p
            </p>
          <Butto
            Zurück
     

   

              Dieser Name wird im Header der Website angezeigt
          </CardHeader>
            <div className="
                <Label htmlFor="company-name">Firmenname</Labe
       
     
   

        </Card>
        <Card>
            <div>
            
     
            <Button onClick={handleAddSlide}>
              Slide hinzufügen
   

          
                    <CardTitle className="text-l
                      variant="destructive"
                      onClick={() => handleDeleteSlide(slide.id)}
               
                    </Button>
                </CardHeader>
                  <div>
                
                
                      id={`image-${slide.id}`}
                      onChange={(e) =>
                  
                   
              
            

                      </div>
              
                  <div
                    <Input
                      value={
                        handleUpdateSlide(slide.id, 'title', e
                      placehol
                  </div
                  <div>
                    <Textarea
                   
                        handleUpdateSlide(slide.id, 'subtitle', 
                      
                    />
                </CardContent>
            ))}
        </Card>
        <div class
            <FloppyD
          </Button
      </div>
  )































































































