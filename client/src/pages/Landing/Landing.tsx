import { ButtonLink } from '@/components/buttonLink'
import { PageUrl } from '@/data/pages.constants'
import { observer } from 'mobx-react'

const LandingPage = observer(() => {
    return (
        <div className="h-[80vh] text-center p-8">
            <header className="container flex h-14 max-w-screen-2xl items-center">
                <div className="mr-4 hidden md:flex">
                    <a
                        className="mr-4 flex items-center space-x-2 lg:mr-6"
                        href="/"
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
                    </a>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <ButtonLink
                        className="border-foreground"
                        variant="outline"
                        to={PageUrl.LOGIN}
                    >
                        Log in
                    </ButtonLink>
                    <ButtonLink
                        className="border-primary"
                        variant="outline"
                        to={PageUrl.REGISTER}
                    >
                        Join
                    </ButtonLink>
                </div>
            </header>
            <main className="flex flex-col justify-center items-center h-full gap-9">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                    <span className="text-primary">From User Stories to</span>
                    <span className="block">Object-Oriented Design</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-[500px]">
                    Translate use cases into class diagrams with PlantUML's
                    syntax. Simplify your design process and bridge the gap
                    between user needs and software architecture.
                </p>
                <ButtonLink to={PageUrl.REGISTER}>Get Started</ButtonLink>
            </main>
        </div>
    )
})

export default LandingPage
