import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

const Container = (props) => {
  const { children } = props;

  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const adjustedHeight = windowHeight - 112; // Subtract header height

  return <Box sx={{ height: `${adjustedHeight}px` }}>{children}</Box>;
};

export default Container;

Container.propTypes = {
  children: PropTypes.object.isRequired,
};
