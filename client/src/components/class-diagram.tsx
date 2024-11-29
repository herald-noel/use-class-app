import mermaid from 'mermaid'
import html2canvas from 'html2canvas'
import { Button } from '@/components/ui/button'
import { useEffect, useRef, useState } from 'react'
import { Download, PlusIcon, MinusIcon, Minimize, Maximize } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useFullscreen } from '../hooks/useFullscreen'

const ClassDiagram = ({ source, isDownload }) => {
    const [dimensions, setDimensions] = useState({
        minWidth: 500,
        minHeight: 500,
    })
    const containerRef = useRef(null)
    const toggleFullscreen = useFullscreen(containerRef)

    useEffect(() => {
        mermaid.initialize({ startOnLoad: false, theme: 'neutral' })
    }, [])

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.removeAttribute('data-processed')
            containerRef.current.innerHTML = source.trim()
            const titleElement = containerRef.current.querySelector(
                '.classTitleText'
            ) as HTMLElement
            if (titleElement) {
                titleElement.style.fill = 'white'
            }
            mermaid.init(undefined, containerRef.current)
        }
    }, [source])

    const handleExport = async () => {
        if (containerRef.current) {
            const originalWidth = containerRef.current.style.width
            const originalHeight = containerRef.current.style.height

            containerRef.current.style.width = 'auto'
            containerRef.current.style.height = 'auto'

            const titleElement = document.querySelector(
                '.classTitleText'
            ) as HTMLElement

            if (titleElement) {
                titleElement.classList.add('blackClassTitleText')
            }

            const canvas = await html2canvas(containerRef.current)
            const dataUrl = canvas.toDataURL('image/png')

            containerRef.current.style.width = originalWidth
            containerRef.current.style.height = originalHeight

            if (titleElement) {
                titleElement.classList.remove('blackClassTitleText')
            }

            const link = document.createElement('a')
            link.href = dataUrl
            link.download = 'mermaid-diagram.png'
            link.click()
        }
    }

    const handleIncreaseSize = () => {
        setDimensions((prev) => ({
            minWidth: Math.min(prev.minWidth + 100, 1000),
            minHeight: Math.min(prev.minHeight + 100, 1000),
        }))
    }

    const handleDecreaseSize = () => {
        setDimensions((prev) => ({
            minWidth: Math.max(prev.minWidth - 100, 10),
            minHeight: Math.max(prev.minHeight - 100, 10),
        }))
    }

    return (
        <>
            <div className="flex-col fixed right-3 top-3 mt-16 mr-4">
                <Button
                    size="xs"
                    className={cn('absolute right-3 top-3', {
                        hidden: !isDownload,
                    })}
                    variant="outline"
                    onClick={handleExport}
                >
                    <Download />
                </Button>
                <Button
                    size="xs"
                    className={cn('absolute right-3 top-[50px]', {
                        hidden: !isDownload,
                    })}
                    variant="outline"
                    onClick={handleIncreaseSize}
                >
                    <PlusIcon />
                </Button>
                <Button
                    size="xs"
                    className={cn('absolute right-3 top-[88px]', {
                        hidden: !isDownload,
                    })}
                    variant="outline"
                    onClick={handleDecreaseSize}
                >
                    <MinusIcon />
                </Button>
                <Button
                    size="xs"
                    className={cn('absolute right-3 top-[126px]', {
                        hidden: !isDownload,
                    })}
                    variant="outline"
                    onClick={toggleFullscreen}
                >
                    <Maximize />
                </Button>
            </div>

            <div
                className="flex justify-center items-center pr-10 text-black"
                style={{
                    minWidth: `${dimensions.minWidth}px`,
                    minHeight: `${dimensions.minHeight}px`,
                }}
                ref={containerRef}
            />
        </>
    )
}

export default ClassDiagram
