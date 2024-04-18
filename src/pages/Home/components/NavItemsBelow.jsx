import { List } from "@mui/material";
import NavItem from "./NavItem";
import LogoutIcon from "@mui/icons-material/Logout";
import useLogout from "../hooks/useLogout";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import { useNavigate } from "react-router-dom"; // Import for navigation
import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";

const NavItemsBelow = () => {
  const { logoutUser } = useLogout();
  const navigate = useNavigate();
  const handleChatClick = () => {
    navigate("/chat"); // Navigate to the Chat route
  };
  const handleHomeClick = () => {
    navigate("/home"); // Navigate to the Chat route
  };

  return (
    <List>
      <NavItem
        Icon={AccountTreeOutlinedIcon}
        listName="Convert"
        handleClick={handleHomeClick}
      />
      <NavItem
        Icon={AutoAwesomeOutlinedIcon}
        listName="Chat"
        handleClick={handleChatClick}
      />

      <NavItem Icon={LogoutIcon} listName="Log out" handleClick={logoutUser} />
    </List>
  );
};

export default NavItemsBelow;
