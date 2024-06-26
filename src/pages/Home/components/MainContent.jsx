import React, { useEffect, useRef, useState } from "react";
import HomeViewModel from "../../../viewModels/HomeViewModel";
import PreviewButton from "./PreviewButton";
import ConvertButton from "./ConvertButton";
import { Editor } from "@monaco-editor/react";
import { observer } from "mobx-react";
import {
  DraggableBox,
  DraggableBoxContainer,
  DraggableDividerBar,
} from "../styles/draggableStyles";
import HorizDivide from "./HorizDivide";
import { Stack, Typography } from "@mui/material";
import parseUML from "../../../utils/parseUML";

const MainContent = observer(() => {
  const editorRef = useRef();

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const [dividerPosition, setDividerPosition] = useState(30); // Initial percentage of the divider position
  const containerRef = useRef(null);

  const handleMouseDown = (e) => {
    e.preventDefault();
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
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
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const handleConvert = async () => {
    if (parseUML(HomeViewModel.plantUMLSource).valid) {
      await HomeViewModel.covertToMermaidCD();
    } else {
      HomeViewModel.setParseErrors(
        parseUML(HomeViewModel.plantUMLSource).errors
      );
    }
  };

  const onHandleChange = (sourceCode) => {
    HomeViewModel.setPlantUMLSource(sourceCode);
  };

  return (
    <>
      <DraggableBoxContainer ref={containerRef}>
        <DraggableBox width={dividerPosition}>
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Typography variant="h6">PlantUML Use-Case</Typography>
            {<PreviewButton />}
          </Stack>
          <Editor
            height={"calc(100% - 70px)"}
            width={`${dividerPosition}vw - 16px`}
            theme="vs-light"
            defaultValue="// some comment"
            onMount={onMount}
            value={HomeViewModel.plantUMLSource}
            onChange={(value) => onHandleChange(value)}
            options={{ minimap: { enabled: false } }}
          />
          <ConvertButton handleConvert={handleConvert} />
        </DraggableBox>
        <DraggableDividerBar onMouseDown={handleMouseDown} />
        <DraggableBox width={100 - dividerPosition}>
          <HorizDivide />
        </DraggableBox>
      </DraggableBoxContainer>
    </>
  );
});

export default MainContent;
