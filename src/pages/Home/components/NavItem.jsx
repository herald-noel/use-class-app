import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useSelector } from 'react-redux';
const NavItem = (props) => {
  const { Icon, listName, handleClick } = props;
  const open = useSelector((state) => state.homePage.isOpen);

  const handleNavItem = () => {
    console.log('button click');
    handleClick();
  };
  return (
    <ListItem disablePadding sx={{ display: 'block' }}>
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5,
        }}
        onClick={handleNavItem}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : 'auto',
            justifyContent: 'center',
          }}
        >
          <Icon />
        </ListItemIcon>
        <ListItemText primary={listName} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </ListItem>
  );
};

NavItem.propTypes = {
  Icon: PropTypes.object.isRequired,
  listName: PropTypes.string.isRequired,
  handleClick: PropTypes.any.isRequired,
};

export default NavItem;
