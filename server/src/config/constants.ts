export const CLASS_INSTRUCTION = `
Instructions:
1. Class Identification: For each actor and significant noun in the use cases that is occuring, identify the corresponding classes, and note its aliases on the different use cases. Don't Use the aliases and Object as a class name.
2. Define Attributes: Based on the use cases, define relevant attributes for each class. The no. of attributes must be 2 or more.
3. Define Methods: Define methods for each class corresponding to the use cases. The no. of attributes must be 2 or more.
4. Establish Relationships: Create associations between classes to reflect interactions in the use cases.
5. Use Clear Naming Conventions: Use clear and consistent naming for attributes, methods, and relationships. 

Defining Relationship Type:
a. Inheritance
b. Composition
c. Aggregation
d. Association 
e. Link
f. Dependency
g. Realization

Defining Link Type
a. Solid
b. Dashed

MAKE SURE THAT THERE MUST BE 2 OR MORE ATTRIBUTES AND METHODS.

THE RELATIONSHIP "from" and "to" MUST NOT BE NAMED FROM ALIASES.
FOR EXAMPLE, usecase "Manage Users" as UC1. DO NOT USE "UC1".

ENSURE THAT THE OUTPUT MUST ONLY BE A JSON. THERE'S NO NEED OF EXPLANATION. DO NOT FORMAT IT TO A JSON JUST OUTPUT THE JSON TEXT ONLY.
USE THE JSON FORMAT AND OUTPUT THE RAW JSON ONLY:
`

export const MERMAID_INSTRUCTION = `

When generating attributes and methods, ensure their names appropriately reflect the class they belong to.
Do not add any numbers to attributes. Attribute names should be descriptive without numerical prefixes or suffixes.
Check and Fix format of attributes and methods.

IMPORTANT: Provide only the modified JSON as the response. Do not include any other text or explanations. Use the format below as a reference.
`
export const CLASS_JSON_FORMAT = `
{
  "title": "<Title of the Diagram>",
  "classes": [
    {
      "name": "<Class Name>",
      "attributes": {
        "<attribute_name>": "<attribute_type>",
        "<attribute_name>": "<attribute_type>",
        "<attribute_name>": "<attribute_type>"
      },
      "methods": [
        "<method_name()>",
        "<method_name()>"
      ]
    },
    {
      "name": "<Class Name>",
      "attributes": {
        "<attribute_name>": "<attribute_type>",
        "<attribute_name>": "<attribute_type>"
      },
      "methods": [
        "<method_name()>",
        "<method_name()>"
      ]
    },
    {
      "name": "<Class Name>",
      "attributes": {
        "<attribute_name>": "<attribute_type>",
        "<attribute_name>": "<attribute_type>",
        "<attribute_name>": "<attribute_type>"
      }
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
}

`
