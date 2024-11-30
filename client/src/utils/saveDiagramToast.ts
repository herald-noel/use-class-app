export function SaveDiagramToast(isSuccess: boolean, toast: Function) {
    if (isSuccess) {
        toast({
            title: 'Diagram Saved',
            description: 'Your diagram has been successfully saved.',
            duration: 3000,
            className: 'bg-green-700 text-white border-none',
        })
    } else {
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'There was a problem saving your diagram.',
            className: 'bg-primary text-white border-none',
        })
    }
}
