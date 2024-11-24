import plantumlEncoder from 'plantuml-encoder'
import { useEffect, useRef, useState } from 'react'

import ConvertViewModel from '@/viewModels/ConvertViewModel'
import { Button } from './ui/button'
import { Download, PlusIcon, MinusIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const PlantUMLPreview = ({ isDownload }) => {
    const [imageSource, setImageSource] = useState('')
    const [imageHeight, setImageHeight] = useState(0)
    const [loading, setLoading] = useState(true)
    const imageRef = useRef<HTMLImageElement>(null)
    const [zoomLevel, setZoomLevel] = useState(1)

    useEffect(() => {
        const encodedSource = plantumlEncoder.encode(
            ConvertViewModel.plantUMLSource
        )
        setImageSource(`https://www.plantuml.com/plantuml/png/${encodedSource}`)
        setLoading(true)
    }, [ConvertViewModel.plantUMLSource])

    const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
        setImageHeight(event.currentTarget.naturalHeight)
        setLoading(false)
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

    const handleIncreaseZoom = () => {
        setZoomLevel((prev) => Math.min(prev + 0.1, 2))
    }

    const handleDecreaseZoom = () => {
        setZoomLevel((prev) => Math.max(prev - 0.1, 0.5))
    }

    return (
        <div
            className={
                'flex justify-center w-full min-h-[650px] min-w-[300px] overflow-y-auto'
            }
        >
            <div className="fixed right-3 top-3 flex flex-col mt-16 mr-4">
                <Button
                    size="xs"
                    className={cn('absolute right-3 top-3', {
                        hidden: !isDownload,
                    })}
                    variant="outline"
                    onClick={handleDownload}
                >
                    <Download />
                </Button>
                <Button
                    size="xs"
                    className={cn('absolute right-3 top-14', {
                        hidden: !isDownload,
                    })}
                    variant="outline"
                    onClick={handleIncreaseZoom}
                >
                    <PlusIcon />
                </Button>
                <Button
                    size="xs"
                    className={cn('absolute right-3 top-24', {
                        hidden: !isDownload,
                    })}
                    variant="outline"
                    onClick={handleDecreaseZoom}
                >
                    <MinusIcon />
                </Button>
            </div>
            {loading && (
                <div className="flex items-center justify-center w-full h-full">
                    <span>Loading...</span>
                </div>
            )}

            <img
                ref={imageRef}
                className="min-h-[350px] min-w-[300px] object-contain"
                src={imageSource}
                alt="PlantUML Diagram"
                onLoad={handleImageLoad}
                style={{
                    display: loading ? 'none' : 'block',
                    transform: `scale(${zoomLevel})`,
                }}
            />
        </div>
    )
}

export default PlantUMLPreview
