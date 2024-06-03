import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { observer } from 'mobx-react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Grid, Divider } from '@mui/material';
import { deleteMermaidCode } from '../../services/firebase/user/userActions';
import HomeViewModel from '../../viewModels/HomeViewModel';

const SavedDiagrams = observer(() => {
  React.useEffect(() => {
    HomeViewModel.fetchSavedDiagrams();
  }, []);

  const handleDeleteDiagram = (diagramId) => {
    deleteMermaidCode(diagramId);
    console.log('Deleting diagram with ID:', diagramId);
  };

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
      <TableContainer component={Paper}>
        <Table aria-label='saved diagrams table'>
          <TableHead sx={{ backgroundColor: 'silver' }}>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align='right'>Date Created</TableCell>
              <TableCell align='right'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(HomeViewModel.savedDiagrams).map(([key, value]) => (
              <TableRow key={key}>
                <TableCell component='th' scope='row'>
                  {value.title}
                </TableCell>
                <TableCell align='right'>{value.dateCreated}</TableCell>
                <TableCell align='right'>
                  <IconButton
                    aria-label='delete'
                    onClick={() => handleDeleteDiagram(key)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
});

export default SavedDiagrams;
