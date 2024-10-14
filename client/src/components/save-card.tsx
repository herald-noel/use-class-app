import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from './ui/card'
import { Button } from './ui/button'
import { Trash2, Check, Pencil } from 'lucide-react'
import ConvertViewModel from '@/viewModels/ConvertViewModel'
import { useNavigate } from 'react-router-dom'
import { Input } from './ui/input'
import { useState } from 'react'
import { isTitleValid } from '@/utils/validation'
import { useToast } from './ui/use-toast'
import { SaveDiagramToast } from '@/utils/saveDiagramToast'

const SavedCard = ({ id, value }) => {
    const navigate = useNavigate()
    const { title, plantUMLCode, mermaidCode, dateCreated } = value

    const [isEditTitle, setIsEditTitle] = useState(false)
    const [newTitle, setNewTitle] = useState(title)
    const [currTitle, setCurrTitle] = useState(title)
    const { toast } = useToast()

    const handleOpenDiagram = (
        id: string,
        title: string,
        plantUMLCode: string,
        mermaidCode: string
    ) => {
        ConvertViewModel.setParseErrors([])
        ConvertViewModel.setId(id)
        ConvertViewModel.setTitle(title)
        ConvertViewModel.setPlantUMLSource(plantUMLCode)
        ConvertViewModel.setMermaidSource(mermaidCode)
        navigate('/home')
    }

    const handleDeleteDiagram = async (diagramId: string) => {
        if (diagramId === ConvertViewModel.id) {
            ConvertViewModel.newDiagram()
        }
        await ConvertViewModel.deleteSavedDiagram(diagramId)
    }

    const handleEditTitle = async () => {
        const validateTitle = isTitleValid(newTitle, setNewTitle, toast)
        if (!validateTitle) return
        const isSuccess = await ConvertViewModel.updateSaveDiagram(
            id,
            newTitle,
            plantUMLCode,
            mermaidCode
        )
        SaveDiagramToast(isSuccess, toast)
        if (!isSuccess) return
        setCurrTitle(newTitle)
        setIsEditTitle(false)
    }

    return (
        <Card className="w-[300px]">
            <CardHeader>
                <CardTitle>
                    {!isEditTitle ? (
                        <div className="flex justify-between items-center">
                            {currTitle}
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                    setIsEditTitle(true)
                                }}
                            >
                                <Pencil className="h-4 w-4" />
                            </Button>
                        </div>
                    ) : (
                        <div className="flex">
                            <Input
                                id="name"
                                placeholder="e.g best diagram"
                                value={newTitle}
                                onChange={(e) => {
                                    setNewTitle(e.target.value)
                                }}
                                required
                            />
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={handleEditTitle}
                            >
                                <Check className="h-4 w-4" />
                            </Button>
                        </div>
                    )}
                </CardTitle>
                <CardDescription>{dateCreated}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center gap-2">
                    <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => {
                            handleOpenDiagram(
                                id,
                                title,
                                plantUMLCode,
                                mermaidCode
                            )
                        }}
                    >
                        Open Diagram
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="bg-primary"
                        onClick={() => {
                            handleDeleteDiagram(id)
                        }}
                    >
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default SavedCard
