import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { observer } from "mobx-react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Grid, Divider } from "@mui/material";

// Mock data for saved diagrams
const savedDiagrams = [
  { id: 1, title: "Diagram 1", dateCreated: "2023-05-01" },
  { id: 2, title: "Diagram 2", dateCreated: "2023-04-15" },
  { id: 3, title: "Diagram 3", dateCreated: "2023-03-20" },
  { id: 4, title: "Diagram 4", dateCreated: "2023-02-28" },
  { id: 5, title: "Diagram 5", dateCreated: "2023-01-10" },
];

const SavedDiagrams = observer(() => {
  const handleDeleteDiagram = (diagramId) => {
    // Add your logic to handle the deletion of the diagram here
    console.log("Deleting diagram with ID:", diagramId);
  };

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">Saved Diagrams</Typography>
        </Grid>
        <Grid item xs={12} container spacing={2}>
          <Grid item xs={12} md={6} sx={{ mt: 1 }}>
            <Typography variant="body1" gutterBottom>
              Discover Recent Updates
            </Typography>
            <Typography variant="body2" color="text.secondary">
              "Explore your stored diagrams for valuable insights."
            </Typography>
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            display="flex"
            justifyContent="flex-end"
            alignItems="center"
            sx={{ mt: 1 }}
          ></Grid>
        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
      <TableContainer component={Paper}>
        <Table aria-label="saved diagrams table">
          <TableHead sx={{ backgroundColor: "silver" }}>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Date Created</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {savedDiagrams.map((diagram) => (
              <TableRow key={diagram.id}>
                <TableCell component="th" scope="row">
                  {diagram.title}
                </TableCell>
                <TableCell align="right">{diagram.dateCreated}</TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="delete"
                    onClick={() => handleDeleteDiagram(diagram.id)}
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
