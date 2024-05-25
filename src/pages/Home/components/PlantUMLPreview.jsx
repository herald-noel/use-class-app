import { Modal, Box, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import React from 'react';
import HomeViewModel from '../../../viewModels/HomeViewModel';

const PlantUMLPreview = observer(({ isPreviewOpen }) => {
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
        <img src='https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg' />
      </Box>
    </Modal>
  );
});

export default PlantUMLPreview;
