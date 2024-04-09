function parseUseCaseDiagram(plantumlCode) {
  let title;
  const actors = [];
  const useCases = [];
  const relationships = [];

  // Regular expressions to match actors, use cases, and relationships
  // const actorPattern = /actor\s+(\w+)\s+as\s+(\w+)/g;
  const titlePattern = /rectangle\s+"([^"]+)"/g;
  const actorPattern = /actor\s+(\w+)(?:\s+as\s+(\w+))?/g;
  const useCasePattern = /usecase\s+"([^"]+)"\s+as\s+(\w+)/g;
  const relationshipPattern = /(\w+)\s+-->\s+(\w+)/g;

  let match;
  // Find the title of the use case
  if ((match = titlePattern.exec(plantumlCode)) !== null) {
    title = match[1];
  }
  // Find all actors in the PlantUML code
  while ((match = actorPattern.exec(plantumlCode)) !== null) {
    actors.push({
      type: match[1],
      name: match[2],
    });
  }

  // Find all use cases in the PlantUML code
  while ((match = useCasePattern.exec(plantumlCode)) !== null) {
    useCases.push({
      name: match[1],
      alias: match[2],
    });
  }

  // Find all relationships in the PlantUML code
  while ((match = relationshipPattern.exec(plantumlCode)) !== null) {
    relationships.push({
      source: match[1],
      target: match[2],
    });
  }

  return {
    title: title,
    actors: actors,
    useCases: useCases,
    relationships: relationships,
  };
}

export default parseUseCaseDiagram;
