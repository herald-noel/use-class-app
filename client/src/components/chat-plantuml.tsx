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
            <div className="flex justify-center items-center space-x-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="h-6 w-6"
                >
                    <path
                        d="M278.5 215.6L23 471c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l57-57 68 0c49.7 0 97.9-14.4 139-41c11.1-7.2 5.5-23-7.8-23c-5.1 0-9.2-4.1-9.2-9.2c0-4.1 2.7-7.6 6.5-8.8l81-24.3c2.5-.8 4.8-2.1 6.7-4l22.4-22.4c10.1-10.1 2.9-27.3-11.3-27.3l-32.2 0c-5.1 0-9.2-4.1-9.2-9.2c0-4.1 2.7-7.6 6.5-8.8l112-33.6c4-1.2 7.4-3.9 9.3-7.7C506.4 207.6 512 184.1 512 160c0-41-16.3-80.3-45.3-109.3l-5.5-5.5C432.3 16.3 393 0 352 0s-80.3 16.3-109.3 45.3L139 149C91 197 64 262.1 64 330l0 55.3L253.6 195.8c6.2-6.2 16.4-6.2 22.6 0c5.4 5.4 6.1 13.6 2.2 19.8z"
                        fill="currentColor"
                    />
                </svg>
                <span className="hidden font-bold lg:inline-block">
                    useClass
                </span>
            </div>
            <h1 className="text-2xl text-center my-6">
                Create Use Case Diagram
            </h1>

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
                        placeholder="Generate use case diagram in plantuml here."
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
