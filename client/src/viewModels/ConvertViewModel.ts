import ConvertModel from '@/models/ConvertModel'

class ConvertViewModel {
    get plantUMLSource(): string {
        return ConvertModel.plantUMLSource
    }

    get mermaidSource(): string {
        return ConvertModel.mermaidSource
    }

    get isLoading(): boolean {
        return ConvertModel.isLoading
    }

    get savedDiagrams(): object[] {
        return ConvertModel.savedDiagrams
    }

    get parseErrors(): string[] {
        return ConvertModel.parseErrors
    }

    get title(): string {
        return ConvertModel.title
    }

    get id(): string {
        return ConvertModel.id
    }

    setTitle = (value: string): void => {
        ConvertModel.setTitle(value)
    }

    setId = (id: string): void => {
        ConvertModel.setId(id)
    }

    setPlantUMLSource = (value: string): void => {
        ConvertModel.setPlantUMLSource(value)
    }

    setMermaidSource = (value: string): void => {
        ConvertModel.setMermaidSource(value)
    }

    setParsedMermaidSource = (value: string): void => {
        ConvertModel.setParsedMermaidSource(value)
    }

    setUserRequest = (value: string): void => {
        ConvertModel.setUserRequest(value)
    }

    modifyMermaidCD = async (): Promise<void> => {
        await ConvertModel.modifyMermaidCD()
    }

    convertMermaidCodetoJSON = async (): Promise<void> => {
        await ConvertModel.convertMermaidCodetoJSON()
    }

    covertToMermaidCD = async (): Promise<void> => {
        await ConvertModel.covertToMermaidCD()
    }

    saveMermaidCode = async (): Promise<boolean> => {
        return await ConvertModel.saveMermaidCode()
    }

    updateSaveDiagram = async (
        id = this.id,
        title = this.title,
        plantUMLSource = this.plantUMLSource,
        mermaidSource = this.mermaidSource
    ) : Promise<boolean> => {
        return await ConvertModel.updateSavedDiagram(
            id,
            title,
            plantUMLSource,
            mermaidSource
        )
    }

    setSavedDiagrams = (value: object[]): void => {
        ConvertModel.setSavedDiagrams(value)
    }

    fetchSavedDiagrams = async (): Promise<void> => {
        await ConvertModel.fetchSavedDiagrams()
    }

    deleteSavedDiagram = async (diagramId: string): Promise<void> => {
        await ConvertModel.deleteSavedDiagram(diagramId)
    }

    setParseErrors = (value: string[]): void => {
        ConvertModel.setParseErrors(value)
    }

    newDiagram = (): void => {
        ConvertModel.newDiagram()
    }
}

export default new ConvertViewModel()
