import { makeObservable, observable, action } from 'mobx'
import axiosInstance from '@/../axiosInstance'
import generateUMLFromJSON from '@/utils/generateUMLFromJSON'

import {
    deleteMermaidCode,
    getUserMermaidCodes,
    saveDiagram,
    updateDiagram,
} from '../services/firebase/user/userActions'
import MermaidParser from '@/utils/MermaidParser'
import HOME_DATA from '@/data/home.constants'

const defaultMermaidSource = HOME_DATA.defaultMermaidSource
class ConvertModel {
    id = ''
    title = ''
    plantUMLSource = HOME_DATA.defaultPlantUMLSource
    mermaidSource = defaultMermaidSource
    parsedMermaidSource = ''
    userRequest = ''
    isLoading = false
    savedDiagrams: object[] = []
    parseErrors: string[] = []

    constructor() {
        makeObservable(this, {
            id: observable,
            title: observable,
            plantUMLSource: observable,
            mermaidSource: observable,
            parsedMermaidSource: observable,
            userRequest: observable,
            isLoading: observable,
            savedDiagrams: observable,
            parseErrors: observable,

            setId: action,
            setTitle: action,
            setPlantUMLSource: action,
            setMermaidSource: action,
            setParsedMermaidSource: action,
            setIsLoading: action,
            convertToMermaidCD: action,
            convertMermaidCodetoJSON: action,
            saveMermaidCode: action,
            setSavedDiagrams: action,
            deleteSavedDiagram: action,
            setParseErrors: action,
            newDiagram: action,
            convertPlantUMLUsingPrompt: action,
        })
    }

    setId = (id: string): void => {
        this.id = id
    }

    setTitle = (value: string): void => {
        this.title = value
    }

    setPlantUMLSource = (value: string): void => {
        this.plantUMLSource = value
    }

    setMermaidSource = (value: string): void => {
        this.mermaidSource = value
    }

    setParsedMermaidSource = (value: string) => {
        this.parsedMermaidSource = value
    }

    setIsLoading = (value: boolean): void => {
        this.isLoading = value
    }

    setSavedDiagrams = (value: object[]): void => {
        this.savedDiagrams = value
    }

    setParseErrors = (value: string[]): void => {
        this.parseErrors = value
    }

    setUserRequest = (value: string): void => {
        this.userRequest = value
    }

    convertToMermaidCD = async (): Promise<void> => {
        this.setIsLoading(true)
        try {
            const response = await axiosInstance.post(
                '/api/v1/chat/convert',
                this.plantUMLSource
            )

            const mermaidSourceCode = generateUMLFromJSON(
                JSON.parse(response.data)
            )
            this.setMermaidSource(mermaidSourceCode)
        } catch (error) {
            console.error(error)
        } finally {
            this.setIsLoading(false)
        }
    }

    convertMermaidCodetoJSON = async (): Promise<void> => {
        const parser = new MermaidParser(this.mermaidSource)
        parser.parse()
        this.setParsedMermaidSource(
            JSON.stringify(parser.getDiagram(), null, 2)
        )
    }

    saveMermaidCode = async (): Promise<boolean> => {
        const isSuccess = await saveDiagram(
            this.title,
            this.plantUMLSource,
            this.mermaidSource
        )
        this.setTitle('')
        return isSuccess
    }

    updateSavedDiagram = async (
        id: string,
        title: string,
        plantUMLSource: string,
        mermaidSource: string
    ): Promise<boolean> => {
        const isSuccess = await updateDiagram(
            id,
            title,
            plantUMLSource,
            mermaidSource
        )
        return isSuccess
    }

    fetchSavedDiagrams = async (): Promise<void> => {
        this.setIsLoading(true)
        const codes = await getUserMermaidCodes()
        this.setSavedDiagrams(codes)
        this.setIsLoading(false)
    }

    deleteSavedDiagram = async (diagramId: string): Promise<void> => {
        await deleteMermaidCode(diagramId)
        this.fetchSavedDiagrams()
    }

    newDiagram = (): void => {
        this.id = ''
        this.title = ''
        this.plantUMLSource = HOME_DATA.defaultPlantUMLSource
        this.mermaidSource = defaultMermaidSource
    }

    convertPlantUMLUsingPrompt = async (userPrompt: string) => {
        this.setIsLoading(true)
        try {
            const response = await axiosInstance.post(
                '/api/v1/chat/plantuml',
                userPrompt
            )
            this.setPlantUMLSource(response.data.plantUML)

            const mermaidSourceCode = generateUMLFromJSON(
                JSON.parse(response.data.mermaid)
            )
            this.setMermaidSource(mermaidSourceCode)
        } catch (error) {
            console.error(error)
        } finally {
            this.setIsLoading(false)
        }
    }
}

export default new ConvertModel()
