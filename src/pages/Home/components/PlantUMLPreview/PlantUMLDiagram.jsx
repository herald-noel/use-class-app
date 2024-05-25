import React from 'react';
import plantumlEncoder from 'plantuml-encoder';

const PlantUMLDiagram = ({ source }) => {
  const encodedSource = plantumlEncoder.encode(source);
  const imageSource = `https://www.plantuml.com/plantuml/png/${encodedSource}`;

  return <img src={imageSource} alt='PlantUML Diagram' />;
};

export default PlantUMLDiagram;
