import plantumlEncoder from 'plantuml-encoder'

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
    const encodedSource = plantumlEncoder.encode(
        ConvertViewModel.plantUMLSource
    )
    const imageSource = `https://www.plantuml.com/plantuml/png/${encodedSource}`
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Preview</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>PlantUML Preview Code</DialogTitle>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <img
                        src={imageSource}
                        alt="PlantUML Diagram"
                        className="w-full"
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default PreviewButton
