import { List } from '@mui/material';
import NavItem from './NavItem';
import LogoutIcon from '@mui/icons-material/Logout';
import useLogout from '../hooks/useLogout';

const NavItemsBelow = () => {
  const { logoutUser } = useLogout();
  return (
    <List>
      <NavItem Icon={LogoutIcon} listName='Log out' handleClick={logoutUser} />
    </List>
  );
};

export default NavItemsBelow;
