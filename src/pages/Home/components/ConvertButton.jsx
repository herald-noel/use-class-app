import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { Button } from '@mui/material';

const ConvertButton = ({handleConvert}) => {
  return (
    <Button
      onClick={handleConvert}
      variant='contained'
      startIcon={<AutoAwesomeIcon />}
      sx={{ width: '100%' }}
    >
      Convert
    </Button>
  );
};

export default ConvertButton;
