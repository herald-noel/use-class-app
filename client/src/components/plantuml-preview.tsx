import plantumlEncoder from 'plantuml-encoder'
import { useEffect, useRef, useState } from 'react'

import ConvertViewModel from '@/viewModels/ConvertViewModel'
import { Button } from './ui/button'
import { Download, PlusIcon, MinusIcon, Maximize } from 'lucide-react'
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

    const toggleFullScreen = () => {
        if (imageRef.current) {
            if (!document.fullscreenElement) {
                imageRef.current.style.backgroundColor = 'white' // Set background color
                imageRef.current.requestFullscreen().catch((err) => {
                    console.error(
                        `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
                    )
                })
            } else {
                imageRef.current.style.backgroundColor = '' // Reset background color
                document.exitFullscreen()
            }
        }
    }

    return (
        <div
            className={
                'flex justify-center w-full min-h-[650px] min-w-[300px] overflow-hidden'
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
                    className={cn('absolute right-3  top-[50px]', {
                        hidden: !isDownload,
                    })}
                    variant="outline"
                    onClick={handleIncreaseZoom}
                >
                    <PlusIcon />
                </Button>
                <Button
                    size="xs"
                    className={cn('absolute right-3 top-[88px]', {
                        hidden: !isDownload,
                    })}
                    variant="outline"
                    onClick={handleDecreaseZoom}
                >
                    <MinusIcon />
                </Button>
                <Button
                    size="xs"
                    className={cn('absolute right-3 top-[126px]', {
                        hidden: !isDownload,
                    })}
                    variant="outline"
                    onClick={toggleFullScreen}
                >
                    <Maximize />
                </Button>
            </div>
            {loading && (
                <div className="flex items-center justify-center w-full h-full">
                    <span>Loading...</span>
                </div>
            )}

            <div
                className="overflow-auto"
                style={{
                    width: '100%',
                    height: '100%',
                }}
            >
                <img
                    ref={imageRef}
                    className="object-contain"
                    src={imageSource}
                    alt="PlantUML Diagram"
                    onLoad={handleImageLoad}
                    style={{
                        display: loading ? 'none' : 'block',
                        transform: `scale(${zoomLevel})`,
                        transformOrigin: 'top left',
                    }}
                />
            </div>
        </div>
    )
}

export default PlantUMLPreview
