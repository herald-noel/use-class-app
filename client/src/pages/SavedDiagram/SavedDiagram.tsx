import { Button } from '@/components/ui/button'
import { ButtonLink } from '@/components/buttonLink'
import { observer } from 'mobx-react'
import { Separator } from '@/components/ui/separator'
import { CircleUser, ArrowLeft } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import useLogout from '@/hooks/useLogout'
import SavedCard from '@/components/save-card'
import { PageUrl } from '@/data/pages.constants'
import { useEffect } from 'react'
import ConvertViewModel from '@/viewModels/ConvertViewModel'
import { Link } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import AuthLoginViewModel from '@/viewModels/AuthLoginViewModel'
import SkeletonCard from '@/components/skeleton-card'

const SavedDiagram = observer(() => {
    const { logoutUser } = useLogout()

    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
        if (user) {
            AuthLoginViewModel.setUser(user)
        }
    })

    useEffect(() => {
        const fetchData = async () => {
            await ConvertViewModel.fetchSavedDiagrams()
        }

        fetchData()
    }, [AuthLoginViewModel.user])

    return (
        <>
            <div className="container flex h-14 max-w-screen-2xl items-center justify-between  ">
                <div className="mr-4 hidden md:flex">
                    <Link
                        className="mr-4 flex items-center space-x-2 lg:mr-6"
                        to={PageUrl.HOME}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            className="h-6 w-6"
                        >
                            <path
                                d="M278.5 215.6L23 471c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l57-57 68 0c49.7 0 97.9-14.4 139-41c11.1-7.2 5.5-23-7.8-23c-5.1 0-9.2-4.1-9.2-9.2c0-4.1 2.7-7.6 6.5-8.8l81-24.3c2.5-.8 4.8-2.1 6.7-4l22.4-22.4c10.1-10.1 2.9-27.3-11.3-27.3l-32.2 0c-5.1 0-9.2-4.1-9.2-9.2c0-4.1 2.7-7.6 6.5-8.8l112-33.6c4-1.2 7.4-3.9 9.3-7.7C506.4 207.6 512 184.1 512 160c0-41-16.3-80.3-45.3-109.3l-5.5-5.5C432.3 16.3 393 0 352 0s-80.3 16.3-109.3 45.3L139 149C91 197 64 262.1 64 330l0 55.3L253.6 195.8c6.2-6.2 16.4-6.2 22.6 0c5.4 5.4 6.1 13.6 2.2 19.8z"
                                fill="currentColor"
                            />
                        </svg>
                        <span className="hidden font-bold lg:inline-block">
                            useClass
                        </span>
                    </Link>
                    <nav className="flex items-center gap-4 text-sm lg:gap-6">
                        <Link
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                            to={PageUrl.SAVED_DIAGRAM}
                        >
                            Saved Diagram
                        </Link>
                    </nav>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="secondary"
                            size="icon"
                            className="rounded-full"
                        >
                            <CircleUser className="h-5 w-5" />
                            <span className="sr-only">Toggle user menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={logoutUser}>
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <Separator />
            <div className="container">
                <ButtonLink to={PageUrl.HOME} className="mt-4" variant="ghost">
                    <ArrowLeft className="h-4 w-4" />
                </ButtonLink>
                <h1 className="text-3xl my-4">Saved Diagram</h1>
                <div className="flex flex-wrap items-center gap-7">
                    {ConvertViewModel.isLoading ? (
                        Array.from({ length: 4 }, (_, index) => (
                            <SkeletonCard key={index} />
                        ))
                    ) : ConvertViewModel.savedDiagrams &&
                      Object.entries(ConvertViewModel.savedDiagrams).length >
                          0 ? (
                        Object.entries(ConvertViewModel.savedDiagrams).map(
                            ([key, value]) => (
                                <SavedCard key={key} id={key} value={value} />
                            )
                        )
                    ) : (
                        <div>No saved Diagrams</div>
                    )}
                </div>
            </div>
        </>
    )
})

export default SavedDiagram
