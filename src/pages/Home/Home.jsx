import { useTheme } from '@mui/material/styles';
import {
  Box,
  Toolbar,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  Stack,
  Button,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { BRAND_NAME } from '../../data/config.constants';
import NavItemsBelow from './components/NavItemsBelow';
import Form from './components/Form';
import ConvertButton from './components/ConvertButton';
import { observer } from 'mobx-react';
import HomeViewModel from '../../viewModels/HomeViewModel';
import { useEffect, useState } from 'react';
import { DrawerHeader, AppBar, Drawer } from './styles/layoutStyles';

const Home = observer(() => {
  const theme = useTheme();
  const isOpen = HomeViewModel.isSideNavOpen;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleDrawerOpen = () => {
    HomeViewModel.toggleSignInModal();
  };

  const handleDrawerClose = () => {
    HomeViewModel.toggleSignInModal();
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position='fixed' open={open}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' noWrap component='div'>
            {BRAND_NAME}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant='permanent' open={isOpen}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <NavItemsBelow />
      </Drawer>
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Stack direction={'row'}>
          <Form component={'form'}>
            {/* CONTENT --------------------------------------------- */}
            <Box
              width='100%'
              display='flex'
              justifyContent='flex-end'
              marginBottom={'3px'}
            >
              <Button variant='outlined' size='small'>
                Preview
              </Button>
            </Box>
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
              justifyContent: 'center', // Center horizontally
              alignItems: 'center', // Center vertically
            }}
          >
            <img src='mermaid.png' height={'500px'} />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
});

export default Home;
