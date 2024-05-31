import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { Button } from '@mui/material';

const ConvertButton = () => {
  return (
    <Button
      variant='contained'
      startIcon={<AutoAwesomeIcon />}
      sx={{ width: '100%' }}
    >
      Convert
    </Button>
  );
};

export default ConvertButton;
