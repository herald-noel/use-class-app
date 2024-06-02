import { CssBaseline, Box } from '@mui/material';
import TopNav from '../pages/Home/components/TopNav';
import HomeViewModel from '../viewModels/HomeViewModel';
import SideNav from '../pages/Home/components/SideNav';
import { DrawerHeader } from '../pages/Home/styles/layoutStyles';
import { observer } from 'mobx-react';

const AuthLayout = observer((props) => {
  const { children } = props;
  const open = HomeViewModel.isSideNavOpen;

  const handleDrawerClick = () => {
    HomeViewModel.toggleSignInModal();
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline open={open} handleDrawerOpen={handleDrawerClick} />
        <TopNav open={open} handleDrawerOpen={handleDrawerClick} />
        <SideNav open={open} handleDrawerClose={handleDrawerClick} />

        <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          {children}
        </Box>
      </Box>
    </>
  );
});

export default AuthLayout;
