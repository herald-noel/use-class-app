import { useRef, useEffect, useState } from 'react'
import { ChatInput } from '@/components/ui/chat/chat-input'
import {
    ExpandableChat,
    ExpandableChatHeader,
    ExpandableChatBody,
    ExpandableChatFooter,
} from '@/components/ui/chat/expandable-chat'
import { Button } from './button'
import { Send } from 'lucide-react'
import { Card, CardHeader, CardDescription } from '@/components/ui/card'
import ConvertViewModel from '@/viewModels/ConvertViewModel'
import { ScrollArea } from '@/components/ui/scroll-area'

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

    return (
        <Card
            className="border-secondary transition-all duration-200 hover:bg-secondary/50 cursor-pointer w-auto"
            onClick={() => onClick(description)}
        >
            <CardHeader>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
        </Card>
    )
}

interface ChatSupportProps {
    isMermaidOpen?: boolean
}

const ChatSupport: React.FC<ChatSupportProps> = ({ isMermaidOpen }) => {
    const [containerWidth, setContainerWidth] = useState(0)
    const containerRef = useRef(null)
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const [userPrompt, setUserPrompt] = useState('')

    useEffect(() => {
        const updateWidths = () => {
            if (containerRef.current) {
                const parentWidth =
                    containerRef.current.parentElement.offsetWidth
                setContainerWidth(parentWidth)
            }
        }

        updateWidths()

        const resizeObserver = new ResizeObserver(updateWidths)
        if (containerRef.current?.parentElement) {
            resizeObserver.observe(containerRef.current.parentElement)
        }

        return () => resizeObserver.disconnect()
    }, [])

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

    const isMobile = containerWidth < MOBILE_BREAKPOINT

    return (
        <ExpandableChat isMermaidOpen={isMermaidOpen} size="sm">
            <ExpandableChatHeader className="flex-col text-center justify-center">
                <h1 className="text-xl font-semibold">Generate new class diagram ✨</h1>
                <p>Type your idea you want to create.</p>
            </ExpandableChatHeader>
            <ExpandableChatBody>
                <ScrollArea className="h-full w-full">
                    <div ref={containerRef} className="mt-5">
                        <div
                            className={`grid gap-4 px-4 mb-6 transition-all duration-200 ${
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
                </ScrollArea>
            </ExpandableChatBody>
            <ExpandableChatFooter>
                <ScrollArea className="w-full">
                    <div className="flex gap-2 w-full">
                        <ChatInput
                            placeholder="Enter here."
                            value={userPrompt}
                            onChange={handleInputChange}
                            ref={textareaRef}
                        />
                        <Button
                            type="submit"
                            size="icon"
                            className="mt-4"
                            onClick={handleSubmit}
                            disabled={userPrompt === ''}
                        >
                            <Send className="size-4" />
                        </Button>
                    </div>
                </ScrollArea>
            </ExpandableChatFooter>
        </ExpandableChat>
    )
}

export default ChatSupport
