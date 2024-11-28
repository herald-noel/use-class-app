export const CLASS_INSTRUCTION = `
Instructions:
Create a simple class diagram.

1. Object-Oriented Design:
   - Approach this task using Object-Oriented Programming (OOP) principles.
   - Each class should encapsulate relevant attributes and methods, following the concept of modular design.
   - Use inheritance, polymorphism, and encapsulation where appropriate to structure the classes and relationships effectively.
   - Implement classes using Java syntax and conventions.

   - Follow Java-specific OOP practices, including:
    - Using appropriate access modifiers (public, private, protected)
    - Using Java naming conventions (camelCase for methods and variables, PascalCase for class names)

2. Class Identification:
   - Analyze the use case diagram.
   - For each actor and key noun in the use cases (e.g., User, Email), identify a corresponding class.
   - Avoid using aliases (e.g., UC1) when naming classes. Use meaningful names instead.
   - Use meaningful Java class names that follow Java naming conventions.

3. Attribute Definition:
   - Identify at least 2 attributes for each class based on the nouns or descriptive phrases in the use cases.
   - Attributes should represent the internal state or properties of the class, adhering to the principle of encapsulation.
   - Define attributes using appropriate Java data types.

4. Method Definition:
   - Identify at least 2 methods for each class that correspond to the actions or verbs in the use cases (e.g., "Compose", "Send", "Delete").
   - Methods should define the behavior or functionality of the class, ensuring that each method has a specific responsibility.
   - Use appropriate access modifiers.

5. Relationship Identification:
   - Establish relationships between the classes to reflect interactions and dependencies in the use cases.
   - Apply OOP relationships (e.g., Inheritance, Composition) to properly structure class interactions.
   - Use clear relationship types (e.g., Inheritance, Composition, Aggregation, Association, Link, Dependency, Realization).
   - Ensure that relationships are based on the nature of interaction, not on use case aliases.

6. Naming Conventions:
   - Use clear, descriptive names for attributes, methods, and relationships.
   - Avoid using technical jargon or use case aliases in the class diagram.

   - Follow Java naming conventions strictly:
    - Classes: PascalCase (e.g., EmailService)
    - Methods: camelCase (e.g., sendEmail())
    - Variables: camelCase (e.g., userEmail)
    - Constants: UPPER_SNAKE_CASE

OOP Principles:
- **Encapsulation**: Ensure that each class contains its own data (attributes) and behavior (methods) to protect its internal state.
- **Inheritance**: Utilize inheritance to model "is-a" relationships where a subclass inherits the properties and behavior of a parent class.
- **Polymorphism**: Design methods that can be overridden or shared across multiple classes where applicable.
- **Modularity**: Ensure each class is designed to represent a single entity or concept in the use case to maintain code modularity.

Relationship Types:
- Inheritance: Represents an "is-a" relationship.
- Composition: Indicates a strong "whole-part" relationship where the part cannot exist independently of the whole.
- Aggregation: Indicates a "whole-part" relationship where the part can exist independently of the whole.
- Association: A general connection between two classes.
- Link: A simple connection between instances of two classes.
- Dependency: A relationship where one class relies on another.
- Realization: A relationship between an interface and a class that implements it.

Link Types:
- Solid Line: Represents a strong relationship (e.g., inheritance, composition).
- Dashed Line: Represents a weaker or conceptual relationship (e.g., dependency, realization).

Output:
- The final output must only be in JSON format.
- Ensure that each class has at least 2 attributes and 2 methods.
- Relationships must not use aliases from the use case diagram.

Considerations:
- Pay close attention to nouns (e.g., User, Email) for class identification.
- Use verbs (e.g., Compose, Send) to determine class methods.
- Focus on designing each class and relationship to align with OOP principles.
`;

export const CLASS_JSON_FORMAT = `
{
  "title": "<Title of the Diagram>",
  "classes": [
    {
      "name": "<Class Name>",
      "attributes": {
        "attribute_1": "<attribute_type>",
        "attribute_2": "<attribute_type>",
        "attribute_3": "<attribute_type>"
      },
      "methods": ["<method_name()>", "<method_name()>"]
    },
    {
      "name": "<Class Name>",
      "attributes": {
        "attribute_1": "<attribute_type>",
        "attribute_2": "<attribute_type>",
        "attribute_3": "<attribute_type>"
      },
      "methods": ["<method_name()>", "<method_name()>"]
    },
    {
      "name": "<Class Name>",
      "attributes": {
        "attribute_1": "<attribute_type>",
        "attribute_2": "<attribute_type>",
        "attribute_3": "<attribute_type>"
      },
      "methods": ["<method_name()>", "<method_name()>"]
    }
  ],
  "relationships": [
    {
      "from": "<Class Name>",
      "to": "<Class Name>",
      "type": "<relationship_type>",
      "link": "<link_type>",
      "multiplicity": {
        "from": "<multiplicity_from>",
        "to": "<multiplicity_to>"
      },
      "label": "<relationship_label>"
    },
    {
      "from": "<Class Name>",
      "to": "<Class Name>",
      "type": "<relationship_type>",
      "link": "<link_type>",
      "multiplicity": {
        "from": "<multiplicity_from>",
        "to": "<multiplicity_to>"
      },
      "label": "<relationship_label>"
    }
  ]
}`;

export const PLANTUML_INSTRUCTION = `
Create a simple PlantUML use case diagram.

a. Base Structure:

@startuml
left to right direction
actor ActorName
rectangle "System Name" {
    usecase "Use Case 1" as UC1
    usecase "Use Case 2" as UC2
    ActorName --> UC1
    ActorName --> UC2
}
@enduml

b. Required Elements:

Always begin with @startuml and end with @enduml
Include left to right direction for horizontal layout
Define actor(s) before the rectangle system boundary
Place all use cases within a rectangle representing the system
Use arrow syntax --> to show relationships

c. Naming Conventions:

1. Actor Syntax:
- CORRECT: actor Customer
- INCORRECT: actor "Customer"
- INCORRECT: actor "System Admin"
- CORRECT: actor SystemAdmin

2. Actor names:
- Write directly without quotes: actor Customer
- No aliases allowed on actors
- Use PascalCase for clarity: SystemAdmin
- No spaces in actor names
- Clear, descriptive names representing the user role


2. Use cases:

- Must be in quotes: usecase "Login to System"
- Require unique identifiers: as UC1
- Use descriptive but concise names
- Follow format: usecase "Action Description" as UCx

d. System Boundary:

1. Rectangle syntax:

- Must include system name in quotes
- Format: rectangle "System Name" {}
- All use cases go inside the curly braces

e. Relationships

- Basic connection: ActorName --> UCx
- Direction is always from actor to use case
- Use consistent arrow types throughout diagram

f. Prohibited Elements

- No actor aliases
- No quotes around actor names
- No HTML-style brackets around names
- No additional styling or color definitions
- No extension or inclusion relationships unless specifically requested

g. Example Response Format
When asked to create a PlantUML diagram, provide only the code without:

- Explanations
- Markdown formatting
- Additional context
- Code block markers

h. Input Validation
Ensure all provided PlantUML code:

- Follows exact spacing and indentation shown in base structure
- Uses consistent naming conventions
- Includes all required elements
- Avoids all prohibited elements
- Maintains proper relationship syntax
`;
