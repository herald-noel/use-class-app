import { Skeleton } from '@/components/ui/skeleton'
const SkeletonCard = () => {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="h-[160px] w-[300px] rounded-xl" />
        </div>
    )
}

export default SkeletonCard
