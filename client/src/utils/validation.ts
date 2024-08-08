export const isTitleValid = (
    title: string,
    setTitle: (title: string) => void,
    toast: Function
): boolean => {
    if (!title || !title.trim()) {
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Invalid diagram name.',
        })
        setTitle('')
        return false
    } else if (title.length < 5 || title.length > 20) {
        toast({
            variant: 'destructive',
            title: 'Error',
            description:
                'Title must have more than 5 and less than 20 characters.',
        })
        return false
    }
    return true
}
