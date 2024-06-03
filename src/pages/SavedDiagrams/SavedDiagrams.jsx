import * as React from 'react';
import { observer } from 'mobx-react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import LaunchIcon from '@mui/icons-material/Launch';
import Typography from '@mui/material/Typography';
import HomeViewModel from '../../viewModels/HomeViewModel';
import {
  Box,
  Grid,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
const SavedDiagrams = observer(() => {
  React.useEffect(() => {
    HomeViewModel.fetchSavedDiagrams();
  }, []);

  const handleDeleteDiagram = (diagramId) => {
    HomeViewModel.deleteSavedDiagram(diagramId);
  };

  const handleOpenDiagram = (plantUMLCode, mermaidCode) => {
    HomeViewModel.setPlantUMLSource(plantUMLCode);
    HomeViewModel.setMermaidSource(mermaidCode);
    HomeViewModel.setCurrentPage(0);
  };

  const borderColor = '#c2b1ee';

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h4'>Saved Diagrams</Typography>
        </Grid>
        <Grid item xs={12} container spacing={2}>
          <Grid item xs={12} md={6} sx={{ mt: 1 }}>
            <Typography variant='body1' gutterBottom>
              Discover Recent Updates
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              "Explore your stored diagrams for valuable insights."
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            display='flex'
            justifyContent='flex-end'
            alignItems='center'
            sx={{ mt: 1 }}
          ></Grid>
        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
      <TableContainer
        component={Paper}
        sx={{ border: `2px solid ${borderColor}` }}
      >
        <Table aria-label='saved diagrams table'>
          <TableHead sx={{ backgroundColor: '#ececff' }}>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align='right'>Date Created</TableCell>

              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(HomeViewModel.savedDiagrams).length > 0 ? (
              Object.entries(HomeViewModel.savedDiagrams).map(
                ([key, value]) => (
                  <TableRow key={key}>
                    <TableCell
                      component='th'
                      scope='row'
                      sx={{ borderTop: `2px solid ${borderColor}` }}
                    >
                      {value.title}
                    </TableCell>
                    <TableCell
                      align='right'
                      sx={{ borderTop: `2px solid ${borderColor}` }}
                    >
                      {value.dateCreated}
                    </TableCell>
                    <TableCell
                      align='right'
                      sx={{ borderTop: `2px solid ${borderColor}` }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Box>
                          <IconButton
                            aria-label='open'
                            onClick={() =>
                              handleOpenDiagram(
                                value.plantUMLCode,
                                value.mermaidCode
                              )
                            }
                          >
                            <LaunchIcon />
                          </IconButton>
                        </Box>
                        <Box>
                          <IconButton
                            aria-label='delete'
                            onClick={() => handleDeleteDiagram(key)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    </TableCell>
                  </TableRow>
                )
              )
            ) : (
              <TableRow>
                <TableCell colSpan={3} align='center'>
                  No saved diagrams
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
});

export default SavedDiagrams;
