class MermaidParser {
    private lines: string[];
    private currentIndex: number;
    private diagram: {
        title: string;
        classes: { name: string, attributes: string[], methods: string[] }[];
        relationships: {
            from: string,
            to: string,
            type: string,
            link: string,
            multiplicity: {
                from: string,
                to: string
            },
            label: string
        }[];
    };

    private relationTypeMap: { [key: string]: string } = {
        '<|': 'Inheritance',
        '*': 'Composition',
        'o': 'Aggregation',
        '>': 'Association',
        '|>': 'Realization'
    };

    private linkTypeMap: { [key: string]: string } = {
        '--': 'Solid',
        '..': 'Dashed'
    };

    constructor(code: string) {
        this.lines = code.split('\n').map(line => line.trim()).filter(line => line !== '');
        this.currentIndex = 0;
        this.diagram = {
            title: '',
            classes: [],
            relationships: []
        };
    }

    parse(): void {
        this.parseTitle();
        this.parseDiagram();
    }

    private parseTitle(): void {
        if (this.lines[this.currentIndex] === '---') {
            this.currentIndex++;
            while (this.lines[this.currentIndex] !== '---') {
                const titleLine = this.lines[this.currentIndex];
                if (titleLine.startsWith('title:')) {
                    this.diagram.title = titleLine.split(':')[1].trim();
                }
                this.currentIndex++;
            }
            this.currentIndex++; // Skip the closing '---'
        }
    }

    private parseDiagram(): void {
        while (this.currentIndex < this.lines.length) {
            const line = this.lines[this.currentIndex];
            if (line === 'classDiagram') {
                this.currentIndex++;
                continue;
            }
            if (line.startsWith('class')) {
                this.parseClass();
            } else if (this.isRelationship(line)) {
                this.parseRelationship();
            } else {
                this.currentIndex++;
            }
        }
    }

    private isRelationship(line: string): boolean {
        return line.includes('--') || line.includes('..');
    }

    private parseClass(): void {
        const classDeclaration = this.lines[this.currentIndex];
        const className = classDeclaration.split(' ')[1];
        const attributes: string[] = [];
        const methods: string[] = [];

        this.currentIndex++;
        while (this.lines[this.currentIndex] !== '}') {
            const line = this.lines[this.currentIndex].trim();
            if (line.includes('(')) {
                methods.push(line);
            } else {
                attributes.push(line);
            }
            this.currentIndex++;
        }

        this.diagram.classes.push({ name: className, attributes, methods });
        this.currentIndex++; // Skip the closing '}'
    }

    private parseRelationship(): void {
        const line = this.lines[this.currentIndex];
        const [relationshipPart, label] = line.split(':').map(s => s.trim());
        
        const relationshipRegex = /^(\w+)\s+"([^"]+)"\s+(<?-+>?|\.+)\s*([<|*o>|]+)\s+"([^"]+)"\s+(\w+)$/;
        const match = relationshipPart.match(relationshipRegex);

        if (match) {
            const [_, from, fromMultiplicity, linkSymbol, relationSymbol, toMultiplicity, to] = match;
            const type = this.getRelationshipType(relationSymbol);
            const link = this.getLinkType(linkSymbol);
            
            this.diagram.relationships.push({
                from,
                to,
                type,
                link,
                multiplicity: {
                    from: fromMultiplicity,
                    to: toMultiplicity
                },
                label
            });
        }
        this.currentIndex++;
    }

    private getRelationshipType(symbol: string): string {
        return this.relationTypeMap[symbol] || 'Association';
    }

    private getLinkType(symbol: string): string {
        return this.linkTypeMap[symbol] || 'Solid';
    }

    getDiagram() {
        return this.diagram;
    }
}

export default MermaidParser;