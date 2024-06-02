import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { Button } from '@mui/material';
import HomeViewModel from '../../../viewModels/HomeViewModel';
import { observer } from 'mobx-react';

const ConvertButton = observer(({ handleConvert }) => {
  return (
    <Button
      disabled={HomeViewModel.isLoading}
      onClick={handleConvert}
      variant='contained'
      startIcon={<AutoAwesomeIcon />}
      sx={{ width: '100%' }}
    >
      Convert
    </Button>
  );
});

export default ConvertButton;
