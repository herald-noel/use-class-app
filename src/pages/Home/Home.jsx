import { Box, CssBaseline } from '@mui/material';
import { observer } from 'mobx-react';
import HomeViewModel from '../../viewModels/HomeViewModel';
import { DrawerHeader } from './styles/layoutStyles';
import SideNav from './components/SideNav';
import TopNav from './components/TopNav';
import MainContent from './components/MainContent';

const Home = observer(() => {
  const open = HomeViewModel.isSideNavOpen;

  const handleDrawerOpen = () => {
    HomeViewModel.toggleSignInModal();
  };

  const handleDrawerClose = () => {
    HomeViewModel.toggleSignInModal();
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <TopNav open={open} handleDrawerOpen={handleDrawerOpen} />
        <SideNav open={open} handleDrawerClose={handleDrawerClose} />
        <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <MainContent />
        </Box>
      </Box>
    </>
  );
});

export default Home;
