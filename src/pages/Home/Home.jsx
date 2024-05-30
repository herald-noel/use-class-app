import { Box, CssBaseline, Stack } from '@mui/material';

import Form from './components/Form';
import ConvertButton from './components/ConvertButton';
import { observer } from 'mobx-react';
import HomeViewModel from '../../viewModels/HomeViewModel';
import { DrawerHeader } from './styles/layoutStyles';
import PreviewButton from './components/PreviewButton';
import ClassDiagram from './components/Mermaid/ClassDiagram';
import SideNav from './components/SideNav';
import TopNav from './components/TopNav';
import MainContent from './components/MainContent';

const Home = observer(() => {
  const mermaidSource = `
classDiagram
  Animal <|-- Duck
  Animal <|-- Fish
  Animal <|-- Zebra
  Animal : +int age
  Animal : +String gender
  Animal: +isMammal()
  Animal: +mate()
  class Duck {
    +String beakColor
    +swim()
    +quack()
  }
  class Fish {
    -int sizeInFeet
    -canEat()
  }
  class Zebra {
    +bool isCool
    +run()
  }
`;
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
