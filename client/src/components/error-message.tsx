import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import ConvertViewModel from '@/viewModels/ConvertViewModel'
import { useToast } from '@/components/ui/use-toast'

const ErrorMessage = observer(() => {
    const { toast } = useToast()

    useEffect(() => {
        if (ConvertViewModel.parseErrors.length > 0) {
            const errorMessages = ConvertViewModel.parseErrors
                .map((error, index) => `${index + 1}. ${error}`)
                .join('<br />')

            const isLongMessage = ConvertViewModel.parseErrors.length > 20

            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong.',
                description: (
                    <div
                        style={{
                            maxHeight: '100px',
                            overflowY: isLongMessage ? 'scroll' : 'hidden',
                        }}
                        dangerouslySetInnerHTML={{ __html: errorMessages }}
                    />
                ),
            })
        }
    }, [ConvertViewModel.parseErrors, toast])

    return null
})

export default ErrorMessage
