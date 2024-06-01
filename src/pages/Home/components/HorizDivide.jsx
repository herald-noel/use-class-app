import React, { useState, useRef, useEffect } from 'react';
import { Box, Paper, Typography, styled } from '@mui/material';
import {
  DraggableBoxContainer,
  DraggableBox,
  DraggableDividerBar,
} from '../styles/horizStyle';
import ClassDiagram from './Mermaid/ClassDiagram';

const mermaidSource = `
classDiagram
  Animal <|-- Duck
  Animal <|-- Fish
  Animal <|-- Zebra
  Animal : +int age
  Animal : +String gender
  Animal: +isMammal()
  Animal: +mate()
  class Duck {
    +String beakColor
    +swim()
    +quack()
  }
  class Fish {
    -int sizeInFeet
    -canEat()
  }
  class Zebra {
    +bool isCool
    +run()
  }
`;

const HorizDivide = () => {
  const [dividerPosition, setDividerPosition] = useState(70);
  const containerRef = useRef(null);

  const handleMouseDown = (e) => {
    e.preventDefault();
    const startY = e.clientY;
    const startPosition = dividerPosition;

    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const containerHeight = containerRef.current.offsetHeight;
        const newDividerPosition =
          startPosition + ((e.clientY - startY) / containerHeight) * 100;
        setDividerPosition(Math.max(0, Math.min(100, newDividerPosition)));
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const containerHeight = containerRef.current.offsetHeight;
        const startY = e.clientY;
        const startPosition = dividerPosition;
        const handleMouseMoveInternal = (e) => {
          const newDividerPosition =
            startPosition + ((e.clientY - startY) / containerHeight) * 100;
          setDividerPosition(Math.max(0, Math.min(100, newDividerPosition)));
        };
        document.addEventListener('mousemove', handleMouseMoveInternal);
        document.addEventListener('mouseup', handleMouseUp);
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dividerPosition]);

  return (
    <DraggableBoxContainer ref={containerRef}>
      <DraggableBox height={dividerPosition}>
        <ClassDiagram source={mermaidSource} />
      </DraggableBox>
      <DraggableDividerBar
        dividerPosition={dividerPosition}
        onMouseDown={handleMouseDown}
      />
      <DraggableBox height={100 - dividerPosition}>
        {/* <Typography variant='h6'>Output</Typography> */}
        {/* Output component */}
      </DraggableBox>
    </DraggableBoxContainer>
  );
};

export default HorizDivide;
