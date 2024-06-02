import React from "react";
import { Box, IconButton, Popover, ListItemText, ListItemButton, List} from "@mui/material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

const UserActionMenu = ({anchorEl, handlePopoverOpen, handlePopoverClose, handleLogout}) => {
  return (
    <Box>
      <IconButton color="inherit" onClick={handlePopoverOpen}>
        <AccountCircleRoundedIcon />
      </IconButton>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        slotProps={{
          sx: { padding: 0, boxShadow: 3, borderRadius: 1, width: 200 },
        }}
      >
        <List component="nav" aria-label="main mailbox folders">
          <ListItemButton onClick={handleLogout}>
            <ListItemText primary="Log out" />
          </ListItemButton>
        </List>
      </Popover>
    </Box>
  );
};

export default UserActionMenu;
