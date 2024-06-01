import { Box, CssBaseline } from '@mui/material';
import { observer } from 'mobx-react';
import HomeViewModel from '../../viewModels/HomeViewModel';
import { DrawerHeader } from './styles/layoutStyles';
import SideNav from './components/SideNav';
import TopNav from './components/TopNav';
import MainContent from './components/MainContent';

const Home = observer(() => {
  const open = HomeViewModel.isSideNavOpen;

  const handleDrawerClick = () => {
    HomeViewModel.toggleSignInModal();
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <TopNav open={open} handleDrawerOpen={handleDrawerClick} />
        <SideNav open={open} handleDrawerClose={handleDrawerClick} />
        <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <MainContent />
        </Box>
      </Box>
    </>
  );
});

export default Home;
