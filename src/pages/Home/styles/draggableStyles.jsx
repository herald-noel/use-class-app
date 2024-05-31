import { Box, Paper, styled } from '@mui/material';

export const DraggableBoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '83vh',
}));

export const DraggableBox = styled(Paper)(({ theme, width }) => ({
  flex: `${width}%`,
  overflow: 'auto',
}));

export const DraggableDividerBar = styled('div')(({ theme }) => ({
  width: '8px',
  backgroundColor: theme.palette.grey[300],
  cursor: 'col-resize',
}));
