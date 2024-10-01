import plantumlEncoder from 'plantuml-encoder'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import ConvertViewModel from '@/viewModels/ConvertViewModel'

const PreviewButton = () => {
    const [imageSource, setImageSource] = useState('')
    const [imageHeight, setImageHeight] = useState(0)

    useEffect(() => {
        const encodedSource = plantumlEncoder.encode(
            ConvertViewModel.plantUMLSource
        )
        setImageSource(`https://www.plantuml.com/plantuml/png/${encodedSource}`)
    }, [ConvertViewModel.plantUMLSource])

    const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
        setImageHeight(event.currentTarget.naturalHeight)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Preview</Button>
            </DialogTrigger>
            <DialogContent
                className="sm:max-w-md max-h-[80vh]"
                style={{ overflowY: imageHeight > 500 ? 'scroll' : 'hidden' }}
            >
                <DialogHeader>
                    <DialogTitle>PlantUML Preview Code</DialogTitle>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <img
                        src={imageSource}
                        alt="PlantUML Diagram"
                        className="w-full"
                        onLoad={handleImageLoad}
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default PreviewButton
