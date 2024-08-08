import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { MessageCircle, CornerDownLeft, X } from 'lucide-react'
import { Textarea } from './ui/textarea'
import ConvertViewModel from '@/viewModels/ConvertViewModel'

export function ChatPopover() {
    const [message, setMessage] = useState('')
    const [isOpen, setIsOpen] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        // Handle message submission logic here

        await ConvertViewModel.convertMermaidCodetoJSON()
        ConvertViewModel.setUserRequest(message)
        await ConvertViewModel.modifyMermaidCD()

        setMessage('')
        setIsOpen(false)
    }

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
                <Button className="rounded-full shadow-md hover:shadow-lg transition-shadow">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    Modify
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 mr-[40px] mb-[10px] shadow-xl">
                <div className="p-3 bg-primary rounded-t-md text-primary-foreground flex justify-between items-center">
                    <div>
                        <h3 className="font-semibold text-lg">
                            Modify Mermaid
                        </h3>
                        <p className="text-sm opacity-90">
                            Change diagram properties
                        </p>
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsOpen(false)}
                        className="text-primary-foreground hover:bg-primary/90"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </div>
                <form onSubmit={handleSubmit} className="p-4">
                    <div className="space-y-4">
                        <div>
                            <Label
                                htmlFor="message"
                                className="text-sm font-medium mb-1 block"
                            >
                                Modification
                            </Label>
                            <Textarea
                                id="message"
                                placeholder="Type your changes here..."
                                className="mt-1 h-[100px] min-h-[100px] resize-none border-gray-300 border-primary"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center justify-end">
                        <Button
                            type="submit"
                            size="sm"
                            className="gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground"
                        >
                            Apply
                            <CornerDownLeft className="h-4 w-4" />
                        </Button>
                    </div>
                </form>
            </PopoverContent>
        </Popover>
    )
}
