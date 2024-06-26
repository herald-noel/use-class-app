import { Modal, Box, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import React from 'react';
import HomeViewModel from '../../../../viewModels/HomeViewModel';
import Diagram from './Diagram';

const Preview = observer(({ isPreviewOpen }) => {
  const handlePreviewClose = () => {
    HomeViewModel.setIsPreviewOpen(false);
  };

  return (
    <Modal
      open={isPreviewOpen}
      onClose={handlePreviewClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Diagram source={HomeViewModel.plantUMLSource} />
      </Box>
    </Modal>
  );
});

export default Preview;
