class ContentBuilder {
  constructor() {
    this.stringBuilder = []; 
    this.hasDiagram = false;
    this.numSpaces = 4;
    this.relationTypeMap = {
      "Inheritance": "<|",
      "Composition": "*",
      "Aggregation": "o",
      "Association": ">",
      "Realization": "|>",
    };
    this.linkTypeMap = {
      "Solid": "--",
      "Dashed": ".."
    };
  }

  getIndent(numSpaces) {
    return " ".repeat(numSpaces);
  }

  addLine(line) {
    this.stringBuilder.push(line);
  }

  addTitle(title) {
    this.addLine(`---\ntitle: ${title}\n---\n`);
    return this;
  }

  addClass(className, properties, methods) {
    if (!this.hasDiagram) {
      this.addLine("classDiagram\n");
      this.hasDiagram = true;
    }
    this.addLine(`class ${className} {\n`);

    // Handle potential undefined or empty properties and methods 
    if (properties && properties.length) {
      this.addLine(
        `${this.getIndent(this.numSpaces)}${properties.join(
          `\n${this.getIndent(this.numSpaces)}`
        )}\n`
      );
    }
    if (methods && methods.length) {
      this.addLine(
        `${this.getIndent(this.numSpaces)}${methods.join(
          `\n${this.getIndent(this.numSpaces)}`
        )}\n`
      );
    }
    this.addLine("}\n");
    return this;
  }

  addRelationship(from, to, relationType, label, fromMultiplicity, toMultiplicity, linkType = "Solid") {
    if (!this.hasDiagram) {
      this.addLine("classDiagram\n");
      this.hasDiagram = true;
    }

    const relationSymbol = this.relationTypeMap[relationType] || ">";
    const linkSymbol = this.linkTypeMap[linkType] || "--";
    const arrowDirection = `${from} "${fromMultiplicity}" ${linkSymbol}${relationSymbol} "${toMultiplicity}" ${to}` 

    this.addLine(`${arrowDirection} : ${label}\n`);
    return this;
  }

  build() {
    return this.stringBuilder.join(""); 
  }
}

export default ContentBuilder;