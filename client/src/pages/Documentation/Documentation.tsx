import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import DocsEditor from '@/components/docs-editor'
import { Link } from 'react-router-dom'
import { PageUrl } from '@/data/pages.constants'
import PlantUMLSection from '@/components/plantuml-section'

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
  @enduml`

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
  @enduml`

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
  @enduml`

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
  @enduml`

    return (
        <>
            <div className="container flex max-w-screen-2xl items-center justify-between h-[8vh]">
                <div className="mr-4 hidden md:flex">
                    <Link
                        className="mr-4 flex items-center space-x-2 lg:mr-6"
                        to={PageUrl.HOME}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            className="h-6 w-6"
                        >
                            <path
                                d="M278.5 215.6L23 471c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l57-57 68 0c49.7 0 97.9-14.4 139-41c11.1-7.2 5.5-23-7.8-23c-5.1 0-9.2-4.1-9.2-9.2c0-4.1 2.7-7.6 6.5-8.8l81-24.3c2.5-.8 4.8-2.1 6.7-4l22.4-22.4c10.1-10.1 2.9-27.3-11.3-27.3l-32.2 0c-5.1 0-9.2-4.1-9.2-9.2c0-4.1 2.7-7.6 6.5-8.8l112-33.6c4-1.2 7.4-3.9 9.3-7.7C506.4 207.6 512 184.1 512 160c0-41-16.3-80.3-45.3-109.3l-5.5-5.5C432.3 16.3 393 0 352 0s-80.3 16.3-109.3 45.3L139 149C91 197 64 262.1 64 330l0 55.3L253.6 195.8c6.2-6.2 16.4-6.2 22.6 0c5.4 5.4 6.1 13.6 2.2 19.8z"
                                fill="currentColor"
                            />
                        </svg>
                        <span className="hidden font-bold lg:inline-block">
                            useClass
                        </span>
                    </Link>
                    <nav className="flex items-center gap-4 text-sm lg:gap-6">
                        <Link
                            className="transition-colors hover:text-foreground/80 text-foreground/60"
                            to={PageUrl.DOCUMENTATION}
                        >
                            Docs
                        </Link>
                    </nav>
                </div>
            </div>
            <div className="bg-[#1e1e1e]">
                <div className="container mx-auto py-20 max-w-4xl">
                    <h1 className="text-3xl font-bold mb-6">
                        Creating Use Case Diagrams with PlantUML
                    </h1>
                    <p className="mb-6">
                        PlantUML is a powerful tool for creating various types
                        of UML diagrams, including use case diagrams. This guide
                        will walk you through the process of creating use case
                        diagrams using PlantUML syntax.
                    </p>

                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>Basic Structure</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <PlantUMLSection code={basicStructure} />
                        </CardContent>
                    </Card>

                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>Step-by-Step Guide</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ol className="list-decimal list-inside space-y-4">
                                <li>
                                    <strong>Start and End the Diagram</strong>
                                    <p>
                                        Begin your diagram with `@startuml` and
                                        end it with `@enduml`.
                                    </p>
                                </li>
                                <li>
                                    <strong>Set the Direction</strong>
                                    <p>
                                        Use `left to right direction` to set the
                                        orientation of the diagram.
                                    </p>
                                </li>
                                <li>
                                    <strong>Define Actors</strong>
                                    <p>
                                        Create actors using the `actor` keyword
                                        followed by the actor's name:
                                    </p>
                                    <pre className="bg-[#1e1e1e] p-2 rounded-md mt-2">
                                        actor ActorName
                                    </pre>
                                </li>
                                <li>
                                    <strong>Create the System Rectangle</strong>
                                    <p>
                                        Enclose your use cases within a
                                        rectangle representing the system:
                                    </p>
                                    <pre className="bg-[#1e1e1e] p-2 rounded-md mt-2">
                                        {`rectangle "System Name" {
  // Use cases go here
}`}
                                    </pre>
                                </li>
                                <li>
                                    <strong>Define Use Cases</strong>
                                    <p>
                                        Create use cases using the `usecase`
                                        keyword:
                                    </p>
                                    <pre className="bg-[#1e1e1e] p-2 rounded-md mt-2">
                                        usecase "Use Case Description" as UCx
                                    </pre>
                                    <p>
                                        Where `UCx` is a unique identifier for
                                        the use case.
                                    </p>
                                </li>
                                <li>
                                    <strong>Connect Actors to Use Cases</strong>
                                    <p>
                                        Use arrows to connect actors to their
                                        associated use cases:
                                    </p>
                                    <pre className="bg-[#1e1e1e] p-2 rounded-md mt-2">
                                        ActorName --{'>'} UCx
                                    </pre>
                                </li>
                            </ol>
                        </CardContent>
                    </Card>

                    <Card className="mb-6">
                        <CardHeader>
                            <CardTitle>Examples</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Tabs defaultValue="email">
                                <TabsList className="mb-4">
                                    <TabsTrigger
                                        value="email"
                                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                                    >
                                        Email System
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="library"
                                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                                    >
                                        Library Management System
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="bookstore"
                                        className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                                    >
                                        Bookstore System
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="email">
                                    <PlantUMLSection code={emailSystem} />
                                </TabsContent>
                                <TabsContent value="library">
                                    <PlantUMLSection code={librarySystem} />
                                </TabsContent>
                                <TabsContent value="bookstore">
                                    <PlantUMLSection code={bookstoreSystem} />
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
                                <li>
                                    Use meaningful names for actors and use
                                    cases to make your diagram easy to
                                    understand.
                                </li>
                                <li>
                                    Keep use case descriptions concise but
                                    descriptive.
                                </li>
                                <li>
                                    Use unique identifiers (e.g., UC1, UC2) for
                                    each use case to make connections easier.
                                </li>
                                <li>
                                    You can add multiple actors to a single
                                    diagram if needed.
                                </li>
                                <li>
                                    PlantUML allows for more advanced features
                                    like inheritance between actors or inclusion
                                    relationships between use cases. Explore the
                                    PlantUML documentation for more advanced
                                    options.
                                </li>
                            </ul>
                        </CardContent>
                    </Card>

                    <p className="mt-6">
                        By following this guide, you can create clear and
                        informative use case diagrams using PlantUML syntax.
                    </p>
                </div>
            </div>
        </>
    )
}

export default Documentation
