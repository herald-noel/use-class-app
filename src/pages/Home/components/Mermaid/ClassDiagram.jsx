import mermaid from 'mermaid';
import React, { useEffect, useRef } from 'react';
import './styles/mermaid.css';

const ClassDiagram = ({ source }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    mermaid.initialize({ startOnLoad: false });
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.removeAttribute('data-processed');
      containerRef.current.innerHTML = source;
      mermaid.init(undefined, containerRef.current);
    }
  }, [source]);

  return <div className='mermaid-container mermaid' ref={containerRef} />;
};

export default ClassDiagram;
