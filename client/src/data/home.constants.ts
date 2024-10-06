const HOME_DATA = {
    defaultPlantUMLSource: `@startuml
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
@enduml`,
    defaultMermaidSource: `---
title: Email System Class Diagram
---
classDiagram
class User {
    username: String
    emailAddress: String
    login()
    logout()
}
class Email {
    subject: String
    body: String
    sender: String
    createEmail()
    deleteEmail()
}
User "1" --> "*" Email : Sends/Receives`,
}

export default HOME_DATA
