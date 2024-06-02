import { List, Box } from '@mui/material';
import NavItem from './components/NavItem';
import LogoutIcon from '@mui/icons-material/Logout';
import LayersIcon from '@mui/icons-material/Layers';
import useLogout from '../../hooks/useLogout';
import HomeIcon from '@mui/icons-material/Home';
import HomeViewModel from '../../../../viewModels/HomeViewModel';

const NavItemsBelow = () => {
  const { logoutUser } = useLogout();
  const handleHome = () => {
    console.log('test');
    HomeViewModel.setCurrentPage(0);
  };

  const handleSave = () => {
    HomeViewModel.setCurrentPage(1);
  };

  return (
    <List
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
      }}
    >
      <Box>
        <NavItem Icon={HomeIcon} listName='Home' handleClick={handleHome} />
        <NavItem Icon={LayersIcon} listName='Saved' handleClick={handleSave} />
      </Box>
      <NavItem Icon={LogoutIcon} listName='Log out' handleClick={logoutUser} />
    </List>
  );
};

export default NavItemsBelow;
