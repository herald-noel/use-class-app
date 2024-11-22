import { useRef, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardHeader, CardDescription } from '@/components/ui/card'
import { ArrowUp } from 'lucide-react'
import ConvertViewModel from '@/viewModels/ConvertViewModel'
import { observer } from 'mobx-react'

const MOBILE_BREAKPOINT = 400

const suggestions = [
    {
        description: 'Create a class diagram Email system',
    },
    {
        description: 'Create a class diagram E-commerce system',
    },
    {
        description: 'Create a class diagram library management system',
    },
]

const SuggestionCard = ({ width, description, onClick }) => {
    const isMobile = width < MOBILE_BREAKPOINT
    const cardWidth = isMobile ? width - 32 : Math.min(300, width / 3.5)

    return (
        <Card
            className="border-secondary transition-all duration-200 hover:bg-secondary/50 cursor-pointer"
            style={{ width: cardWidth }}
            onClick={() => onClick(description)}
        >
            <CardHeader>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
        </Card>
    )
}

const ChatPlantuml = observer(() => {
    const [containerWidth, setContainerWidth] = useState(0)
    const [inputWidth, setInputWidth] = useState('500px')
    const containerRef = useRef(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)

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

    const isMobile = containerWidth < MOBILE_BREAKPOINT
    const [userPrompt, setUserPrompt] = useState('')

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserPrompt(e.target.value)
    }

    const handleSubmit = () => {
        ConvertViewModel.convertPlantUMLUsingPrompt(userPrompt)
        setUserPrompt('')
        textareaRef.current?.blur()
    }

    const handleSuggestionClick = (text: string) => {
        setUserPrompt(text)
    }

    return (
        <div className="mt-5">
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
                        value={userPrompt}
                        onChange={handleInputChange}
                        ref={textareaRef}
                    />
                    <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full mx-2 hover:bg-primary hover:text-primary-foreground"
                        onClick={handleSubmit}
                        disabled={userPrompt === '' ? true : false}
                    >
                        <ArrowUp className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <div
                className={`mt-5 grid gap-4 px-4 mb-6 transition-all duration-200 ${
                    isMobile ? 'grid-cols-1' : 'grid-cols-3'
                }`}
            >
                {suggestions.map((suggestion, index) => (
                    <SuggestionCard
                        key={index}
                        width={containerWidth}
                        description={suggestion.description}
                        onClick={handleSuggestionClick}
                    />
                ))}
            </div>
        </div>
    )
})

export default ChatPlantuml
