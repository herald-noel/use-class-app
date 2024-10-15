export const CLASS_INSTRUCTION = `
Instructions:
1. Object-Oriented Design:
   - Approach this task using Object-Oriented Programming (OOP) principles.
   - Each class should encapsulate relevant attributes and methods, following the concept of modular design.
   - Use inheritance, polymorphism, and encapsulation where appropriate to structure the classes and relationships effectively.

2. Class Identification:
   - Analyze the use case diagram.
   - For each actor and key noun in the use cases (e.g., User, Email), identify a corresponding class.
   - Avoid using aliases (e.g., UC1) when naming classes. Use meaningful names instead.

3. Attribute Definition:
   - Identify at least 2 attributes for each class based on the nouns or descriptive phrases in the use cases.
   - Attributes should represent the internal state or properties of the class, adhering to the principle of encapsulation.

4. Method Definition:
   - Identify at least 2 methods for each class that correspond to the actions or verbs in the use cases (e.g., "Compose", "Send", "Delete").
   - Methods should define the behavior or functionality of the class, ensuring that each method has a specific responsibility.

5. Relationship Identification:
   - Establish relationships between the classes to reflect interactions and dependencies in the use cases.
   - Apply OOP relationships (e.g., inheritance, composition) to properly structure class interactions.
   - Use clear relationship types (e.g., Inheritance, Composition, Aggregation, Association, Link, Dependency, Realization).
   - Ensure that relationships are based on the nature of interaction, not on use case aliases.

6. Naming Conventions:
   - Use clear, descriptive names for attributes, methods, and relationships.
   - Avoid using technical jargon or use case aliases in the class diagram.

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
  title: "<Title of the Diagram>",
  classes: [
    {
      name: "<Class Name>",
      attributes: {
        attribute_1: "<attribute_type>",
        attribute_2: "<attribute_type>",
        attribute_3: "<attribute_type>",
      },
      methods: ["<method_name()>", "<method_name()>"],
    },
    {
      name: "<Class Name>",
      attributes: {
        attribute_1: "<attribute_type>",
        attribute_2: "<attribute_type>",
        attribute_3: "<attribute_type>",
      },
      methods: ["<method_name()>", "<method_name()>"],
    },
    {
      name: "<Class Name>",
      attributes: {
        attribute_1: "<attribute_type>",
        attribute_2: "<attribute_type>",
        attribute_3: "<attribute_type>",
      },
      methods: ["<method_name()>", "<method_name()>"],
    },
  ],
  relationships: [
    {
      from: "<Class Name>",
      to: "<Class Name>",
      type: "<relationship_type>",
      link: "<link_type>",
      multiplicity: {
        from: "<multiplicity_from>",
        to: "<multiplicity_to>",
      },
      label: "<relationship_label>",
    },
    {
      from: "<Class Name>",
      to: "<Class Name>",
      type: "<relationship_type>",
      link: "<link_type>",
      multiplicity: {
        from: "<multiplicity_from>",
        to: "<multiplicity_to>",
      },
      label: "<relationship_label>",
    },
  ],
}`;
