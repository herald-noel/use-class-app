import ContentBuilder from './ContentBuilder'

export default function generateUMLFromJSON(jsonObject) {
    const contentBuilder = new ContentBuilder()

    contentBuilder.addTitle(jsonObject.title)
    .addClasses(jsonObject.classes)
    .addRelationships(jsonObject.relationships)

    return contentBuilder.build()
}
