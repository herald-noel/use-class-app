import plantumlEncoder from 'plantuml-encoder'
import { useEffect, useState } from 'react'

import ConvertViewModel from '@/viewModels/ConvertViewModel'

const PlantUMLPreview = () => {
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
        <div className={'min-h-[500px] overflow-y-auto'}>
            <img
                className="min-h-[500px] object-contain"
                src={imageSource}
                alt="PlantUML Diagram"
                onLoad={handleImageLoad}
            />
        </div>
    )
}

export default PlantUMLPreview
