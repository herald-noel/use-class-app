export default function parseUML(uml) {
    const lines = uml
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line)
    const result = {
        direction: null,
        actors: [],
        system: null,
        useCases: [],
        relationships: [],
    }
    let startUMLCount = 0
    let endUMLCount = 0
    let insideRectangle = false
    for (const line of lines) {
        if (line === '@startuml') {
            startUMLCount++
        } else if (line === '@enduml') {
            endUMLCount++
        } else if (
            line.startsWith('left to right direction') ||
            line.startsWith('top to bottom direction')
        ) {
            result.direction = line
        } else if (line.startsWith('actor')) {
            const actor = line.split(' ')[1]
            result.actors.push(actor)
        } else if (line.startsWith('rectangle')) {
            result.system = line.match(/"([^"]+)"/)[1]
            insideRectangle = true
        } else if (line === '}') {
            insideRectangle = false
        } else if (line.startsWith('usecase')) {
            const useCase = {
                id: line.match(/as (UC\d+)/)[1],
                name: line.match(/"([^"]+)"/)[1],
            }
            result.useCases.push(useCase)
        } else if (
            line.includes('--') ||
            line.includes('-->') ||
            line.includes('<--')
        ) {
            let [left, right] = ['', '']
            if (line.includes('-->')) {
                ;[left, right] = line.split('-->').map((part) => part.trim())
            } else if (line.includes('<--')) {
                ;[right, left] = line.split('<--').map((part) => part.trim())
            } else if (line.includes('--')) {
                ;[left, right] = line.split('--').map((part) => part.trim())
                result.relationships.push({ actor: right, useCase: left })
            }
            result.relationships.push({ actor: left, useCase: right })
        }
    }
    // Validation checks
    const errors = []
    if (startUMLCount !== 1) {
        errors.push("Exactly one '@startuml' tag must be present.")
    }
    if (endUMLCount !== 1) {
        errors.push("Exactly one '@enduml' tag must be present.")
    }
    if (!result.direction) {
        errors.push(
            "Direction not specified (e.g., 'left to right direction')."
        )
    }
    if (!result.actors.length) {
        errors.push('No actors defined.')
    }
    if (!result.system) {
        errors.push('System name not defined.')
    }
    if (!result.useCases.length) {
        errors.push('No use cases defined.')
    }
    if (!result.relationships.length) {
        errors.push('No relationships defined.')
    }
    // Ensure all actors and use cases mentioned in relationships are defined
    const validActorNames = new Set(result.actors)
    const validUseCaseIds = new Set(result.useCases.map((uc) => uc.id))
    result.relationships.forEach((rel) => {
        if (
            !validActorNames.has(rel.actor) &&
            !validUseCaseIds.has(rel.actor)
        ) {
            errors.push(
                `Actor or use case '${rel.actor}' in relationship not defined.`
            )
        }
        if (
            !validActorNames.has(rel.useCase) &&
            !validUseCaseIds.has(rel.useCase)
        ) {
            errors.push(
                `Actor or use case '${rel.useCase}' in relationship not defined.`
            )
        }
    })
    return {
        valid: errors.length === 0,
        errors,
        result: errors.length === 0 ? result : null,
    }
}
