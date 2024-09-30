import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@radix-ui/react-accordion";
import DocsEditor from "@/components/docs-editor"

const Documentation = () => {
  const basicStructure = `@startuml
left to right direction
actor ActorName
rectangle "System Name" {
  usecase "Use Case 1" as UC1
  usecase "Use Case 2" as UC2
  ActorName --> UC1
  ActorName --> UC2
}
@enduml`;

  const emailSystem = `@startuml
left to right direction
actor User
rectangle "Email System" {
usecase "Compose Email" as UC1
usecase "Send Email" as UC2
usecase "Receive Email" as UC3
usecase "Delete Email" as UC4
User --> UC1
User --> UC2
User --> UC3
User --> UC4
}
@enduml`;

  const librarySystem = `@startuml
left to right direction
actor Librarian
actor Patron
rectangle "Library Management System" {
  usecase "Add Book" as UC1
  usecase "Borrow Book" as UC2
  usecase "Return Book" as UC3
  Librarian --> UC1
  Librarian --> UC2
  Patron --> UC2
  Patron --> UC3
}
@enduml`;

  const bookstoreSystem = `@startuml
left to right direction
actor User
rectangle "Bookstore System" {
  usecase "Search Books" as UC1
  usecase "Add to Cart" as UC2
  usecase "Checkout" as UC3
  usecase "View Order History" as UC4
  User --> UC1
  User --> UC2
  User --> UC3
  User --> UC4
}
@enduml`;

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Creating Use Case Diagrams with PlantUML</h1>
      <p className="mb-6">PlantUML is a powerful tool for creating various types of UML diagrams, including use case diagrams. This guide will walk you through the process of creating use case diagrams using PlantUML syntax.</p>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Basic Structure</CardTitle>
        </CardHeader>
        <CardContent>
          <DocsEditor value={basicStructure} />
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Step-by-Step Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {[
              { title: "Start and End the Diagram", content: "Begin your diagram with `@startuml` and end it with `@enduml`." },
              { title: "Set the Direction", content: "Use `left to right direction` to set the orientation of the diagram." },
              { title: "Define Actors", content: "Create actors using the `actor` keyword followed by the actor's name:\n```\nactor ActorName\n```" },
              { title: "Create the System Rectangle", content: "Enclose your use cases within a rectangle representing the system:\n```\nrectangle \"System Name\" {\n  // Use cases go here\n}\n```" },
              { title: "Define Use Cases", content: "Create use cases using the `usecase` keyword:\n```\nusecase \"Use Case Description\" as UCx\n```\nWhere `UCx` is a unique identifier for the use case." },
              { title: "Connect Actors to Use Cases", content: "Use arrows to connect actors to their associated use cases:\n```\nActorName --> UCx\n```" }
            ].map((item, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{`${index + 1}. ${item.title}`}</AccordionTrigger>
                <AccordionContent>
                  <pre className="whitespace-pre-wrap">{item.content}</pre>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="email">
            <TabsList className="mb-4">
              <TabsTrigger value="email">Email System</TabsTrigger>
              <TabsTrigger value="library">Library Management System</TabsTrigger>
              <TabsTrigger value="bookstore">Bookstore System</TabsTrigger>
            </TabsList>
            <TabsContent value="email">
              <DocsEditor value={emailSystem} />
            </TabsContent>
            <TabsContent value="library">
              <DocsEditor value={librarySystem} />
            </TabsContent>
            <TabsContent value="bookstore">
              <DocsEditor value={bookstoreSystem} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            <li>Use meaningful names for actors and use cases to make your diagram easy to understand.</li>
            <li>Keep use case descriptions concise but descriptive.</li>
            <li>Use unique identifiers (e.g., UC1, UC2) for each use case to make connections easier.</li>
            <li>You can add multiple actors to a single diagram if needed.</li>
            <li>PlantUML allows for more advanced features like inheritance between actors or inclusion relationships between use cases. Explore the PlantUML documentation for more advanced options.</li>
          </ul>
        </CardContent>
      </Card>

      <p className="mt-6">By following this guide, you can create clear and informative use case diagrams using PlantUML syntax.</p>
    </div>
  );
}

export default Documentation