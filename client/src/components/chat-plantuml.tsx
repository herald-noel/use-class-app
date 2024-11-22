import { useRef, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardHeader, CardDescription } from '@/components/ui/card'
import { ArrowUp } from 'lucide-react'

const SuggestionCard = ({ width }) => {
    const cardWidth = Math.max(160, Math.min(300, width / 3.5))

    return (
        <Card
            className="border-secondary transition-all duration-200 hover:bg-secondary/50 cursor-pointer"
            style={{ width: cardWidth }}
        >
            <CardHeader>
                <CardDescription>
                    <span className="font-bold text-gray-300">
                        Deploy your new
                    </span>
                    <br />
                    project in one-click.
                </CardDescription>
            </CardHeader>
        </Card>
    )
}

const ChatInterface = () => {
    const [containerWidth, setContainerWidth] = useState(0)
    const [inputWidth, setInputWidth] = useState('500px')
    const containerRef = useRef(null)

    useEffect(() => {
        const updateWidths = () => {
            if (containerRef.current) {
                const parentWidth =
                    containerRef.current.parentElement.offsetWidth
                setContainerWidth(parentWidth)

                // Calculate input width
                const newInputWidth = Math.min(
                    Math.max(300, parentWidth - 40),
                    800
                )
                setInputWidth(`${newInputWidth}px`)
            }
        }

        updateWidths()

        const resizeObserver = new ResizeObserver(updateWidths)
        if (containerRef.current?.parentElement) {
            resizeObserver.observe(containerRef.current.parentElement)
        }

        return () => resizeObserver.disconnect()
    }, [])

    return (
        <>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
                {[1, 2, 3].map((i) => (
                    <SuggestionCard key={i} width={containerWidth} />
                ))}
            </div>

            <h1 className="text-2xl text-center my-6">What can I help with?</h1>

            <div
                ref={containerRef}
                className="flex items-center justify-center"
                style={{ width: '100%' }}
            >
                <div
                    className="flex items-center justify-center bg-secondary rounded-full mx-auto"
                    style={{ width: inputWidth }}
                >
                    <Textarea
                        placeholder="Message UseClass"
                        className="bg-secondary resize-none h-[45px] ml-3 my-[3px] focus-visible:ring-0 focus-visible:ring-offset-0 border-none"
                    />
                    <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full mx-2 hover:bg-primary hover:text-primary-foreground"
                    >
                        <ArrowUp className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </>
    )
}

export default ChatInterface
