export default function parseUML(uml) {
  const lines = uml
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line);

  const result = {
    direction: null,
    actors: [],
    system: null,
    useCases: [],
    relationships: [],
  };

  let startUMLCount = 0;
  let endUMLCount = 0;
  let insideRectangle = false;

  for (const line of lines) {
    if (line === "@startuml") {
      startUMLCount++;
    } else if (line === "@enduml") {
      endUMLCount++;
    } else if (
      line.startsWith("left to right direction") ||
      line.startsWith("top to bottom direction")
    ) {
      result.direction = line;
    } else if (line.startsWith("actor")) {
      const actor = line.split(" ")[1];
      result.actors.push(actor);
    } else if (line.startsWith("rectangle")) {
      result.system = line.match(/"([^"]+)"/)[1];
      insideRectangle = true;
    } else if (line.startsWith("}")) {
      insideRectangle = false;
    } else if (insideRectangle && line.startsWith("usecase")) {
      const useCase = {
        id: line.match(/as (UC\d+)/)[1],
        name: line.match(/"([^"]+)"/)[1],
      };
      result.useCases.push(useCase);
    } else if (line.includes("-->")) {
      const parts = line.split("-->");
      const actor = parts[0].trim();
      const useCase = parts[1].trim();
      result.relationships.push({ actor, useCase });
    }
  }

  // Validation checks
  const errors = [];

  if (startUMLCount !== 1) {
    errors.push("Exactly one '@startuml' tag must be present.");
  }

  if (endUMLCount !== 1) {
    errors.push("Exactly one '@enduml' tag must be present.");
  }

  if (!result.direction) {
    errors.push("Direction not specified (e.g., 'left to right direction').");
  }

  if (!result.actors.length) {
    errors.push("No actors defined.");
  }

  if (!result.system) {
    errors.push("System name not defined.");
  }

  if (!result.useCases.length) {
    errors.push("No use cases defined.");
  }

  if (!result.relationships.length) {
    errors.push("No relationships defined.");
  }

  // Ensure all actors and use cases mentioned in relationships are defined
  const validActorNames = new Set(result.actors);
  const validUseCaseIds = new Set(result.useCases.map((uc) => uc.id));

  result.relationships.forEach((rel) => {
    if (!validActorNames.has(rel.actor)) {
      errors.push(`Actor '${rel.actor}' in relationship not defined.`);
    }
    if (!validUseCaseIds.has(rel.useCase)) {
      errors.push(`Use case '${rel.useCase}' in relationship not defined.`);
    }
  });

  return {
    valid: errors.length === 0,
    errors,
    result: errors.length === 0 ? result : null,
  };
}
