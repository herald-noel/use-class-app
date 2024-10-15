import mermaid from 'mermaid'
import html2canvas from 'html2canvas'
import { Button } from '@/components/ui/button'
import { useEffect, useRef, useState } from 'react'
import ErrorMessage from './error-message'
import { Download, PlusIcon, MinusIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

const ClassDiagram = ({ source, isDownload }) => {
    const [dimensions, setDimensions] = useState({
        minWidth: 500,
        minHeight: 500,
    })
    const containerRef = useRef(null)

    useEffect(() => {
        mermaid.initialize({ startOnLoad: false, theme: 'dark' })
    }, [])

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.removeAttribute('data-processed')
            containerRef.current.innerHTML = source.trim()
            mermaid.init(undefined, containerRef.current)
        }
    }, [source])

    const handleExport = async () => {
        if (containerRef.current) {
            const originalWidth = containerRef.current.style.width
            const originalHeight = containerRef.current.style.height
            const originalBackgroundColor =
                containerRef.current.style.backgroundColor

            containerRef.current.style.width = 'auto'
            containerRef.current.style.height = 'auto'
            containerRef.current.style.backgroundColor = 'black'

            const canvas = await html2canvas(containerRef.current)
            const dataUrl = canvas.toDataURL('image/png')

            containerRef.current.style.width = originalWidth
            containerRef.current.style.height = originalHeight
            containerRef.current.style.backgroundColor = originalBackgroundColor

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
            <ErrorMessage />
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
                    className={cn('absolute right-3 top-14', {
                        hidden: !isDownload,
                    })}
                    variant="outline"
                    onClick={handleIncreaseSize}
                >
                    <PlusIcon />
                </Button>
                <Button
                    size="xs"
                    className={cn('absolute right-3 top-24', {
                        hidden: !isDownload,
                    })}
                    variant="outline"
                    onClick={handleDecreaseSize}
                >
                    <MinusIcon />
                </Button>
            </div>

            <div
                className="flex justify-center items-center pr-10"
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
