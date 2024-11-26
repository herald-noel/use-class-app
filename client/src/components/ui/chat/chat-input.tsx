import * as React from 'react'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'

interface ChatInputProps
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const ChatInput = React.forwardRef<HTMLTextAreaElement, ChatInputProps>(
    ({ className, ...props }, ref) => (
        <ScrollArea className="w-full">
            <Textarea
                autoComplete="off"
                ref={ref}
                name="message"
                className={cn(
                    'min-h-[40px] max-h-[200px] px-4 py-3 bg-background text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 w-full rounded-md flex items-center resize-none',
                    className
                )}
                {...props}
            />
        </ScrollArea>
    )
)
ChatInput.displayName = 'ChatInput'

export { ChatInput }
