import { useState } from "react";
import parseUseCaseDiagram from "../../utils/parseUseCase";

const Main = () => {
  const [title, setTitle] = useState("");
  const [actors, setActors] = useState([]);
  const [useCases, setUseCases] = useState([]);
  const [relationships, setRelationships] = useState([]);
  const [value, setValue] = useState("");
  const test = `
@startuml
left to right direction
actor Customer as C
actor Administrator as A
rectangle "Online Bookstore" {
  usecase "Place Order" as UC1
  usecase "Update Inventory" as UC2
  usecase "Manage Accounts" as UC3
  C --> UC1
  A --> UC2
  A --> UC3
}
@enduml
  `;

  const handleSubmit = (event) => {
    event.preventDefault();
    const res = parseUseCaseDiagram(value);
    console.log(res);
    setTitle(res.title);
    setActors(res.actors);
    setUseCases(res.useCases);
    setRelationships(res.relationships);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <main style={{ display: "flex" }}>
        <form onSubmit={handleSubmit}>
          <textarea
            id="w3review"
            name="w3review"
            rows="30"
            cols="50"
            value={value}
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
        <div>
          <h1>Title</h1>
          <p>{title}</p>
          <h1>Actor</h1>
          {actors.map((actor, index) => (
            <div key={index}>
              <p>
                {actor.type} {actor.name}
              </p>
            </div>
          ))}

          <h1>Use Case</h1>
          {useCases.map((useCase, index) => (
            <div key={index}>
              <p>
                {useCase.name} {useCase.alias}
              </p>
            </div>
          ))}

          <h1>Relationship</h1>
          {relationships.map((relationship, index) => (
            <div key={index}>
              <p>
                {relationship.left} {relationship.arrow}
                {relationship.right} {relationship.label}
              </p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Main;
