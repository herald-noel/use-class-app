import plantumlEncoder from 'plantuml-encoder'
import { useEffect, useRef, useState } from 'react'

import ConvertViewModel from '@/viewModels/ConvertViewModel'
import { Button } from './ui/button'
import { Download } from 'lucide-react'
import { cn } from '@/lib/utils'

const PlantUMLPreview = ({ isDownload }) => {
    const [imageSource, setImageSource] = useState('')
    const [imageHeight, setImageHeight] = useState(0)
    const imageRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        const encodedSource = plantumlEncoder.encode(
            ConvertViewModel.plantUMLSource
        )
        setImageSource(`https://www.plantuml.com/plantuml/png/${encodedSource}`)
    }, [ConvertViewModel.plantUMLSource])

    const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
        setImageHeight(event.currentTarget.naturalHeight)
    }

    const handleDownload = async () => {
        const response = await fetch(imageSource, {
            mode: 'cors',
        })
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)

        const link = document.createElement('a')
        link.href = url
        link.download = 'PlantUMLDiagram.png'
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        // Release the object URL after downloading
        URL.revokeObjectURL(url)
    }

    return (
        <div
            className={
                'flex justify-center w-full min-h-[350px] min-w-[300px] overflow-y-auto'
            }
        >
            <Button
                size="sm"
                className={cn('absolute right-3 top-3', {
                    hidden: !isDownload,
                })}
                variant="outline"
                onClick={handleDownload}
            >
                <Download />
            </Button>
            <img
                ref={imageRef}
                className="min-h-[350px] min-w-[300px] object-contain"
                src={imageSource}
                alt="PlantUML Diagram"
                onLoad={handleImageLoad}
            />
        </div>
    )
}

export default PlantUMLPreview
