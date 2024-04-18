import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

const ChatForms = (props) => {
  const { children } = props;

  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => setWindowHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const adjustedHeight = windowHeight - (300 + 30.5); // Subtract header height

  return <Box sx={{ height: `${adjustedHeight}px` }}>{children}</Box>;
};

export default ChatForms;

ChatForms.propTypes = {
  children: PropTypes.object.isRequired,
};
