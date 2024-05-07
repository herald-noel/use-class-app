import PropTypes from "prop-types";
import NavBar from "../pages/LandingPage/components/Navbar";
import { Box } from "@mui/material";

const Mainlayout = (props) => {
  const { children } = props;
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <NavBar />
        <Box component='main'>{children}</Box>
      </Box>
    </>
  );
};

export default Mainlayout;

Mainlayout.propTypes = {
  children: PropTypes.object.isRequired,
};
