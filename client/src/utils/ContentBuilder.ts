class ContentBuilder {
    stringBuilder: string[]
    hasDiagram: boolean
    numSpaces: number
    relationTypeMap: Record<string, string>
    linkTypeMap: Record<string, string>

    constructor() {
        this.stringBuilder = []
        this.hasDiagram = false
        this.numSpaces = 4
        this.relationTypeMap = {
            Inheritance: '<|',
            Composition: '*',
            Aggregation: 'o',
            Association: '>',
            Realization: '|>',
        }
        this.linkTypeMap = {
            Solid: '--',
            Dashed: '..',
        }
    }

    getIndent(numSpaces: number): string {
        return ' '.repeat(numSpaces)
    }

    addLine(line: string): void {
        this.stringBuilder.push(line)
    }

    addTitle(title: string): ContentBuilder {
        this.addLine(`---\ntitle: ${title}\n---\n`)
        return this
    }

    addClasses(classes: any[]): ContentBuilder {
        if (!this.hasDiagram) {
            this.addLine('classDiagram\n')
            this.hasDiagram = true
        }

        classes.forEach(({ name, attributes, methods }) => {
            this.addLine(`class ${name} {\n`)
            const properties = Object.entries(attributes).map(
                ([key, type]) => `+${type} ${key}`
            )
            const classMethods = methods.map((method: string) => `+${method}`)

            if (properties.length) {
                this.addLine(
                    `${this.getIndent(this.numSpaces)}${properties.join(
                        `\n${this.getIndent(this.numSpaces)}`
                    )}\n`
                )
            }
            if (classMethods.length) {
                this.addLine(
                    `${this.getIndent(this.numSpaces)}${classMethods.join(
                        `\n${this.getIndent(this.numSpaces)}`
                    )}\n`
                )
            }
            this.addLine('}\n')
        })

        return this
    }

    addRelationships(relationships: any[]): ContentBuilder {
        relationships.forEach(
            ({
                from,
                to,
                type: relationType,
                label,
                multiplicity: { from: fromMultiplicity, to: toMultiplicity },
                link,
            }) => {
                const relationSymbol = this.relationTypeMap[relationType] || '>'
                const linkSymbol = this.linkTypeMap[link] || '--'
                const arrowDirection = `${from} "${fromMultiplicity}" ${linkSymbol}${relationSymbol} "${toMultiplicity}" ${to}`

                const relationshipLine = label
                    ? `${arrowDirection} : ${label}\n`
                    : `${arrowDirection}\n`

                this.addLine(relationshipLine)
            }
        )

        return this
    }

    build(): string {
        return this.stringBuilder.join('')
    }
}

export default ContentBuilder
