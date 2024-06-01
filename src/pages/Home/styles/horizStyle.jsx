import { Box, Paper, styled } from '@mui/material';

export const DraggableBoxContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  position: 'relative',
}));

export const DraggableBox = styled(Paper)(({ theme, height }) => ({
  padding: theme.spacing(2),
  height: `${height}%`,
  overflow: 'auto',
}));

export const DraggableDividerBar = styled('div')(
  ({ theme, dividerPosition }) => ({
    height: '8px',
    backgroundColor: theme.palette.grey[300],
    cursor: 'row-resize',
    position: 'absolute',
    left: 0,
    right: 0,
    top: `${dividerPosition}%`,
    zIndex: 1,
  })
);
