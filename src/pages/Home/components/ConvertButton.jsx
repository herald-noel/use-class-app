import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { Button } from '@mui/material';

const ConvertButton = () => {
  return (
    <Button variant='contained' startIcon={<AutoAwesomeIcon />}>
      Convert
    </Button>
  );
};

export default ConvertButton;
