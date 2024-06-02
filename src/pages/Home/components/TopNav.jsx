import React from "react";
import { AppBar } from "../styles/layoutStyles";
import { BRAND_NAME } from "../../../data/config.constants";
import {
  IconButton,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import useLogout from "../hooks/useLogout";
import UserActionMenu from "./UserMenu/UserActionMenu";

const TopNav = (props) => {
  const { logoutUser } = useLogout();
  const { open, handleDrawerOpen } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handlePopoverClose();
    logoutUser();
  };

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {BRAND_NAME}
          </Typography>
        </Box>
        <UserActionMenu anchorEl={anchorEl} handlePopoverOpen={handlePopoverOpen} handlePopoverClose={handlePopoverClose} handleLogout={handleLogout}/>
      </Toolbar>
    </AppBar>
  );
};

export default TopNav;
