import { Button } from '@/components/ui/button'
import parseUML from '@/utils/parseUML'
import ConvertViewModel from '@/viewModels/ConvertViewModel'
import { Editor } from '@monaco-editor/react'
import { observer } from 'mobx-react'
import { useEffect, useRef, useState } from 'react'
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from '@/components/ui/resizable'
import { Separator } from '@/components/ui/separator'
import ClassDiagram from '@/components/class-diagram'
import { CircleHelp, CircleUser, Download, Loader2 } from 'lucide-react'
import PreviewButton from '@/components/preview-button'
import SaveButton from '@/components/save-button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import useLogout from '@/hooks/useLogout'
import { Link } from 'react-router-dom'
import { PageUrl } from '@/data/pages.constants'
// import { ChatPopover } from '@/components/chat-popover'
import { DropdownMenuDiagram } from '@/components/dropdown-settings'
import { DIAGRAMS } from '@/data/diagrams.constants'
import Joyride, { STATUS, Step } from 'react-joyride'
import HOME_DATA from '@/data/home.constants'

const Home = observer(() => {
    const editorRef = useRef()
    const { logoutUser } = useLogout()

    const [joyrideState, setJoyrideState] = useState({
        run: false,
        steps: [
            {
                content: (
                    <>
                        <h2>Learn the basics!</h2>
                        <p>
                            Complete this quick tutorial to learn how to convert
                            your first plantUML Use-case Code to Mermaid's class
                            diagram.
                        </p>
                    </>
                ),
                locale: {
                    skip: <h1 aria-label="skip">skip</h1>,
                },
                placement: 'center',
                target: 'body',
            },
            {
                target: '.docs',
                content:
                    'You can check how to build your use-case diagram here using plantUML.',
            },
            {
                target: '.editor-container',
                content:
                    'This is where you can input your PlantUML Use-case code.',
            },
            {
                target: '.op-button',
                content:
                    'You can import/export your plantUML use-case code in .txt format here.',
            },
            {
                target: '.convert-button',
                content:
                    'Click here to convert your use-case diagram to class diagram.',
            },
            {
                target: '.preview-button',
                content: 'You can visually check your plantUML code here',
            },
            {
                target: '.save-button',
                content: 'This is where you save your diagram.',
            },
            {
                target: '.op-mermaid-button',
                content:
                    'You can import/export your mermaid class diagram code in .txt format here.',
            },
        ] as Step[],
    })

    useEffect(() => {
        const hasCompletedTour = localStorage.getItem('hasCompletedTour')

        if (!hasCompletedTour) {
            setJoyrideState((prevState) => ({
                ...prevState,
                run: true,
            }))
        }
    }, [])

    const handleTourEnd = () => {
        localStorage.setItem('hasCompletedTour', 'true')
        setJoyrideState((prevState) => ({
            ...prevState,
            run: false,
        }))
    }

    const handleClickStart = () => {
        setJoyrideState((prevState) => ({
            ...prevState,
            run: true,
        }))
    }

    const onMount = (editor) => {
        editorRef.current = editor
        editor.focus()
    }

    const handleJoyrideCallback = (data: any) => {
        const { status } = data
        const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED]

        if (finishedStatuses.includes(status)) {
            handleTourEnd()
        }
    }

    const handleConvert = async () => {
        if (parseUML(ConvertViewModel.plantUMLSource).valid) {
            await ConvertViewModel.covertToMermaidCD()
        } else {
            ConvertViewModel.setParseErrors(
                parseUML(ConvertViewModel.plantUMLSource).errors
            )
        }
    }
    return (
        <>
            {/* Joyride component */}
            <Joyride
                steps={joyrideState.steps}
                run={joyrideState.run}
                callback={handleJoyrideCallback}
                continuous
                showSkipButton
                showProgress
            />

            <div className="container flex max-w-screen-2xl items-center justify-between h-[8vh]">
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
                            className="transition-colors hover:text-foreground/80 text-foreground/60 docs"
                            to={PageUrl.DOCUMENTATION}
                        >
                            Docs
                        </Link>
                        <Link
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                            to={PageUrl.SAVED_DIAGRAM}
                        >
                            Saved Diagram
                        </Link>
                    </nav>
                </div>
                <div className="flex gap-2">
                    <Button
                        className="convert-button"
                        variant="outline"
                        disabled={ConvertViewModel.isLoading}
                        onClick={handleConvert}
                    >
                        {ConvertViewModel.isLoading && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Convert
                    </Button>
                    <div className="preview-button">
                        <PreviewButton />
                    </div>
                    <div className="save-button">
                        <SaveButton />
                    </div>
                </div>
                <div className="flex gap-1">
                    <Button
                        variant="secondary"
                        size="icon"
                        className="rounded-full"
                        onClick={handleClickStart}
                    >
                        <CircleHelp className="h-5 w-5" />
                        <span className="sr-only">Toggle tour</span>
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="secondary"
                                size="icon"
                                className="rounded-full"
                            >
                                <CircleUser className="h-5 w-5" />
                                <span className="sr-only">
                                    Toggle user menu
                                </span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={logoutUser}>
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="h-[91vh]">
                <Separator />
                <ResizablePanelGroup
                    direction="horizontal"
                    className="border-none"
                >
                    <ResizablePanel defaultSize={30}>
                        <div className="bg-secondary flex items-center justify-between editor-container">
                            <div className="flex items-center space-x-2 px-8 py-2">
                                <img
                                    src="plantuml.svg"
                                    className="w-7 h-7 pb-1"
                                />
                                <h4 className="text-sm text-foreground font-medium">
                                    PlantUML Code
                                </h4>
                            </div>
                            <div className="pr-8 flex">
                                <div className="op-button">
                                    <DropdownMenuDiagram
                                        type={DIAGRAMS.plantUML}
                                    />
                                </div>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={ConvertViewModel.newDiagram}
                                >
                                    New
                                </Button>
                            </div>
                        </div>
                        <Editor
                            height="100%"
                            className="editor-container"
                            theme="vs-dark"
                            defaultLanguage="java"
                            defaultValue={HOME_DATA.defaultPlantUMLSource}
                            value={ConvertViewModel.plantUMLSource}
                            options={{
                                minimap: { enabled: false },
                                language: 'java',
                                quickSuggestions: false,
                                parameterHints: { enabled: false },
                            }}
                            onChange={(value) =>
                                ConvertViewModel.setPlantUMLSource(value)
                            }
                            onMount={onMount}
                        />
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={70}>
                        <ResizablePanelGroup direction="vertical">
                            <ResizablePanel
                                defaultSize={60}
                                className="!overflow-auto relative"
                            >
                                <ClassDiagram
                                    source={ConvertViewModel.mermaidSource}
                                />
                            </ResizablePanel>
                            <ResizableHandle withHandle />
                            <ResizablePanel defaultSize={40}>
                                <div className="bg-secondary flex items-center justify-between">
                                    <div className="flex items-center space-x-2 px-8 py-2">
                                        <img
                                            src="mermaid.svg"
                                            className="w-4 h-6 pb-1 pt-1"
                                        />
                                        <h4 className="text-sm text-foreground font-medium">
                                            Mermaid Code
                                        </h4>
                                    </div>
                                    <div className="pr-8 op-mermaid-button">
                                        <DropdownMenuDiagram
                                            type={DIAGRAMS.mermaid}
                                        />
                                    </div>
                                </div>
                                <Editor
                                    theme="vs-dark"
                                    defaultLanguage="kotlin"
                                    value={ConvertViewModel.mermaidSource}
                                    options={{
                                        minimap: { enabled: false },
                                        language: 'kotlin',
                                        quickSuggestions: false,
                                        parameterHints: { enabled: false },
                                    }}
                                    onChange={(value) =>
                                        ConvertViewModel.setMermaidSource(value)
                                    }
                                />
                            </ResizablePanel>
                        </ResizablePanelGroup>
                    </ResizablePanel>
                </ResizablePanelGroup>
                {/* <div className="absolute bottom-6 right-6">
                    <div>
                        <ChatPopover />
                    </div>
                </div> */}
            </div>
        </>
    )
})

export default Home
