import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { ArrowUp } from 'lucide-react'
import { Input } from './ui/input'
import { Button } from '@/components/ui/button'

const SuggestionCard = () => {
    return (
        <Card className="w-[200px] border-secondary">
            <CardHeader>
                {/* <CardTitle>
                    <Lightbulb />
                </CardTitle> */}
                <CardDescription>
                    <div className="font-bold text-gray-300">
                        Deploy your new{' '}
                    </div>
                    project in one-click.
                </CardDescription>
            </CardHeader>
        </Card>
    )
}

const ChatPlantuml = () => {
    return (
        <>
            <div className="flex justify-center gap-2">
                <SuggestionCard />
                <SuggestionCard />
                <SuggestionCard />
            </div>
            <div className="flex-col item-center justify-center">
                <h1 className="text-2xl text-center">What can I help with?</h1>
                <Input className="focus:outline-none border-none" />
                <Button variant="outline" size="icon" className="rounded-full">
                    <ArrowUp />
                </Button>
            </div>
        </>
    )
}

export default ChatPlantuml
