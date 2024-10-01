import DocsEditor from '@/components/docs-editor'
import plantumlEncoder from 'plantuml-encoder'

const PlantUMLSection = ({ code }) => {
    const generatePlantUMLImage = (code: string) => {
        const encodedSource = plantumlEncoder.encode(code)
        return `https://www.plantuml.com/plantuml/png/${encodedSource}`
    }

    return (
        <div className="flex-col justify-center items-center w-full">
            <img
                src={generatePlantUMLImage(code)}
                alt="PlantUML Diagram"
                className="w-[500px] h-[300px] mt-4 mx-auto"
            />
            <div className="mt-6">
                <DocsEditor value={code} />
            </div>
        </div>
    )
}

export default PlantUMLSection
