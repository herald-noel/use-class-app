import { useState } from 'react';
import './App.css';
import parseUseCaseDiagram from './utils/parseUseCase';

function App() {
  const [actors, setActors] = useState([]);
  const [useCases, setUseCases] = useState([]);
  const [relationships, setRelationships] = useState([]);
  const value = `
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
    setActors(res.actors);
    setUseCases(res.useCases);
    setRelationships(res.relationships);
  };
  return (
    <>
      <main style={{ display: 'flex' }}>
        <form onSubmit={handleSubmit}>
          <textarea
            id='w3review'
            name='w3review'
            rows='50'
            cols='50'
            value={value}
          />
          <button type='submit'>Submit</button>
        </form>
        <div>
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
                {relationship.source} --{'>'} {relationship.target}
              </p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
