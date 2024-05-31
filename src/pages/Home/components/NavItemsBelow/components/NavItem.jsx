import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

const NavItem = (props) => {
  const { Icon, listName, handleClick } = props;

  const handleNavItem = () => {
    handleClick();
  };

  return (
    <ListItem disablePadding sx={{ display: 'block' }}>
      <ListItemButton
        sx={{
          minHeight: 48,
          px: 2.5,
        }}
        onClick={handleNavItem}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: 3,
            justifyContent: 'center',
          }}
        >
          <Icon />
        </ListItemIcon>
        <ListItemText primary={listName} sx={{ opacity: 1 }} />
      </ListItemButton>
    </ListItem>
  );
};

export default NavItem;
