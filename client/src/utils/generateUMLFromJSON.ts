import ContentBuilder from './ContentBuilder'

export default function generateUMLFromJSON(jsonData) {
    const contentBuilder = new ContentBuilder()

    // Add title
    contentBuilder.addTitle(jsonData.title)

    // Add classes
    jsonData.classes.forEach((classData) => {
        const { name, attributes, methods } = classData
        const attributeList = attributes
            ? Object.entries(attributes).map(
                  ([key, value]) => `${key}: ${value}`
              )
            : []
        contentBuilder.addClass(name, attributeList, methods)
    })

    // Add relationships
    jsonData.relationships.forEach((relationshipData) => {
        const { from, to, type, link, multiplicity, label } = relationshipData
        const relationType = `${type}_${link === 'Solid' ? '' : 'reverse'}`
        const fromMultiplicity = multiplicity.from
        const toMultiplicity = multiplicity.to
        contentBuilder.addRelationship(
            from,
            to,
            relationType,
            label,
            fromMultiplicity,
            toMultiplicity,
            link
        )
    })

    return contentBuilder.build()
}
