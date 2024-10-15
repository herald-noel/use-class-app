import mermaid from 'mermaid'
import html2canvas from 'html2canvas'
import { Button } from '@/components/ui/button'
import { useEffect, useRef } from 'react'
import ErrorMessage from './error-message'
import { Download } from 'lucide-react'
import { cn } from '@/lib/utils'

const ClassDiagram = ({ source, isDownload }) => {
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

    return (
        <>
            <ErrorMessage />
            <Button
                size="sm"
                className={cn('absolute right-3 top-3', {
                    hidden: !isDownload,
                })}
                variant="outline"
                onClick={handleExport}
            >
                <Download />
            </Button>
            <div
                className="flex justify-center items-center min-w-[500px] min-h-[500px]"
                ref={containerRef}
            />
        </>
    )
}

export default ClassDiagram
