import React, { useEffect, useRef, useState } from 'react';
import HomeViewModel from '../../../viewModels/HomeViewModel';
import PreviewButton from './PreviewButton';
import ConvertButton from './ConvertButton';
import { Editor } from '@monaco-editor/react';
import { observer } from 'mobx-react';
import { Box, Paper, Stack, Typography, styled } from '@mui/material';
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

const DraggableBoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '83vh',
}));

const DraggableBox = styled(Paper)(({ theme, width }) => ({
  flex: `${width}%`,
  overflow: 'auto',
}));

const DraggableDividerBar = styled('div')(({ theme }) => ({
  width: '8px',
  backgroundColor: theme.palette.grey[300],
  cursor: 'col-resize',
}));

const MainContent = observer(() => {
  const editorRef = useRef();

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const [dividerPosition, setDividerPosition] = useState(30); // Initial percentage of the divider position
  const containerRef = useRef(null);

  // Event handlers
  const handleMouseDown = (e) => {
    e.preventDefault();
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const newDividerPosition =
        ((e.clientX - containerRef.current.offsetLeft) / containerWidth) * 100;
      setDividerPosition(newDividerPosition);
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      <DraggableBoxContainer ref={containerRef}>
        <DraggableBox width={dividerPosition}>
          {<PreviewButton />}
          <Editor
            height={'calc(100% - 70px)'}
            width={`${dividerPosition}vw - 16px`}
            theme='vs-light'
            defaultValue='// some comment'
            onMount={onMount}
            value={HomeViewModel.plantUMLSource}
            onChange={(value) => HomeViewModel.setPlantUMLSource(value)}
            options={{ minimap: { enabled: false } }}
          />
          <ConvertButton />
        </DraggableBox>
        <DraggableDividerBar onMouseDown={handleMouseDown} />
        <DraggableBox width={100 - dividerPosition}>
          <ClassDiagram source={mermaidSource} />
        </DraggableBox>
      </DraggableBoxContainer>
    </>
  );
});

export default MainContent;
