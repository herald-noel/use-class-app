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
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <TopNav open={open} handleDrawerOpen={handleDrawerOpen} />
      <SideNav open={open} handleDrawerClose={handleDrawerClose} />
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Stack direction={'row'}>
          <Form component={'form'}>
            {/* CONTENT --------------------------------------------- */}
            {<PreviewButton />}
            <Stack
              direction={'column'}
              sx={{
                width: '100%',
                height: '100%',
              }}
            >
              <textarea
                style={{
                  height: '100%',
                  fontSize: '1rem',
                  resize: 'none',
                  padding: '5px',
                }}
                cols={30}
                placeholder='Enter PlantUML Use Case Diagram'
                onChange={(e) =>
                  HomeViewModel.setPlantUMLSource(e.target.value)
                }
              />
              <ConvertButton />
            </Stack>
            {/* END OF CONTENT --------------------------------------------- */}
          </Form>
          <Box
            sx={{
              height: 'inherit',
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              overflow: 'auto',
            }}
          >
            <ClassDiagram source={mermaidSource} />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
});

export default Home;
