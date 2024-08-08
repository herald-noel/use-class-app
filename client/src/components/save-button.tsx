import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import ConvertViewModel from '@/viewModels/ConvertViewModel'
import { DialogClose } from '@radix-ui/react-dialog'
import { observer } from 'mobx-react'
import { useToast } from '@/components/ui/use-toast'
import { isTitleValid } from '@/utils/validation'
import { SaveDiagramToast } from '@/utils/saveDiagramToast'

const SaveButton = observer(() => {
    const { toast } = useToast()

    const validateTitle = () => {
        return isTitleValid(
            ConvertViewModel.title,
            ConvertViewModel.setTitle,
            toast
        )
    }

    const showStatusToast = (isSuccess: boolean) => {
        SaveDiagramToast(isSuccess, toast)
    }

    const isEdit = async () => {
        if (!ConvertViewModel.id) return false
        const isSuccess: boolean = await ConvertViewModel.updateSaveDiagram()
        showStatusToast(isSuccess)
        return true
    }

    const handleSubmit = async () => {
        if (await isEdit()) return
        if (!validateTitle()) return
        const isSuccess: boolean = await ConvertViewModel.saveMermaidCode()
        showStatusToast(isSuccess)
        return isSuccess
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Save</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Save</DialogTitle>
                    {ConvertViewModel.id && (
                        <DialogDescription>
                            Are you sure you want to save the diagram?
                        </DialogDescription>
                    )}
                </DialogHeader>
                {!ConvertViewModel.id && (
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Title
                            </Label>
                            <Input
                                id="name"
                                placeholder="e.g best diagram"
                                className="col-span-3"
                                value={ConvertViewModel.title}
                                onChange={(e) => {
                                    ConvertViewModel.setTitle(e.target.value)
                                }}
                                required
                            />
                        </div>
                    </div>
                )}
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">
                            Close
                        </Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button onClick={handleSubmit} type="submit">
                            Save changes
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
})

export default SaveButton
