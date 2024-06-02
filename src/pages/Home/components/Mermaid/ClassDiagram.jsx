import mermaid from 'mermaid';
import React, { useEffect, useRef } from 'react';
import './styles/mermaid.css';
import html2canvas from 'html2canvas';
import DownloadIcon from '@mui/icons-material/Download';
import { Box, Button } from '@mui/material';

const ClassDiagram = ({ source }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    mermaid.initialize({ startOnLoad: false });
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.removeAttribute('data-processed');
      containerRef.current.innerHTML = source.trim();
      mermaid.init(undefined, containerRef.current);
    }
  }, [source]);

  const handleExport = async () => {
    if (containerRef.current) {
      const originalWidth = containerRef.current.style.width;
      const originalHeight = containerRef.current.style.height;

      containerRef.current.style.width = 'auto';
      containerRef.current.style.height = 'auto';

      const canvas = await html2canvas(containerRef.current);
      const dataUrl = canvas.toDataURL('image/png');

      containerRef.current.style.width = originalWidth;
      containerRef.current.style.height = originalHeight;

      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'mermaid-diagram.png';
      link.click();
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          position: 'fixed',
          right: 50,
        }}
      >
        <Button
          startIcon={<DownloadIcon />}
          variant='outlined'
          onClick={handleExport}
        >
          Export
        </Button>
      </Box>
      <div className='mermaid-container mermaid' ref={containerRef} />
    </>
  );
};

export default ClassDiagram;
