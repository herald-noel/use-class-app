import React from 'react';
import { AppBar } from '../styles/layoutStyles';
import { BRAND_NAME } from '../../../data/config.constants';
import { IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const TopNav = (props) => {
  const { open, handleDrawerOpen } = props;
  return (
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
  );
};

export default TopNav;
