import { List, Box } from "@mui/material";
import NavItem from "./components/NavItem";
import LogoutIcon from "@mui/icons-material/Logout";
import LayersIcon from "@mui/icons-material/Layers";
import useLogout from "../../hooks/useLogout";
import HomeIcon from "@mui/icons-material/Home";

const NavItemsBelow = () => {
  const { logoutUser } = useLogout();
  return (
    <List
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <Box>
        <NavItem Icon={HomeIcon} listName="Home" />
        <NavItem Icon={LayersIcon} listName="Saved" />
      </Box>
      <NavItem Icon={LogoutIcon} listName="Log out" handleClick={logoutUser} />
    </List>
  );
};

export default NavItemsBelow;
