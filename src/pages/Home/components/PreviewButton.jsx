import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import PlantUMLPreview from './PlantUMLPreview/PlantUMLPreview';
import HomeViewModel from '../../../viewModels/HomeViewModel';
import { observer } from 'mobx-react';

const PreviewButton = observer(() => {
  const handleOpenPreview = () => {
    HomeViewModel.setIsPreviewOpen(true);
  };

  return (
    <React.Fragment>
      <Box
        width='100%'
        display='flex'
        justifyContent='flex-end'
        marginBottom={'3px'}
      >
        <Button variant='outlined' size='small' onClick={handleOpenPreview}>
          Preview
        </Button>
      </Box>

      <PlantUMLPreview isPreviewOpen={HomeViewModel.isPreviewOpen} />
    </React.Fragment>
  );
});

export default PreviewButton;
