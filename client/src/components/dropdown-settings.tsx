import { Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import ConvertViewModel from '@/viewModels/ConvertViewModel'
import React from 'react'
import { DIAGRAMS } from '@/data/diagrams.constants'

interface DropdownMenuDiagramProps {
    type: DIAGRAMS
}

export function DropdownMenuDiagram({ type }: DropdownMenuDiagramProps) {
    const handleCodeDownload = () => {
        const diagramCode =
            type == DIAGRAMS.plantUML
                ? ConvertViewModel.plantUMLSource
                : ConvertViewModel.mermaidSource
        const element = document.createElement('a')
        const file = new Blob([diagramCode], {
            type: 'text/plain',
        })
        element.href = URL.createObjectURL(file)
        element.download = 'diagram.txt'
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file && file.type === 'text/plain') {
            const reader = new FileReader()
            reader.onload = (e) => {
                type == DIAGRAMS.plantUML
                    ? ConvertViewModel.setPlantUMLSource(
                          e.target?.result as string
                      )
                    : ConvertViewModel.setMermaidSource(
                          e.target?.result as string
                      )
            }
            reader.readAsText(file)
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline">
                    <Settings />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuGroup>
                    <div
                        className="relative flex cursor-default select-none items-center
                rounded-sm px-2 py-1.5 text-sm outline-none transition-colors
                focus:bg-accent focus:text-accent-foreground
                data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                    >
                        <span>
                            <label
                                htmlFor="file-upload"
                                className="cursor-pointer"
                            >
                                Import
                                <input
                                    id="file-upload"
                                    type="file"
                                    accept=".txt"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </label>
                        </span>
                    </div>
                    <div
                        className="relative flex select-none items-center
                rounded-sm px-2 py-1.5 text-sm outline-none transition-colors
                focus:bg-accent focus:text-accent-foreground
                data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer"
                        onClick={handleCodeDownload}
                    >
                        <span>Export</span>
                    </div>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
