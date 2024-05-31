import React from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { DrawerHeader, AppBar, Drawer } from '../styles/layoutStyles';
import { Divider, IconButton } from '@mui/material';
import { useTheme } from '@emotion/react';
import NavItemsBelow from './NavItemsBelow/NavItemsBelow';

const SideNav = (props) => {
  const { open, handleDrawerClose } = props;
  const theme = useTheme();
  return (
    <Drawer variant='permanent' open={open}>
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
  );
};

export default SideNav;
