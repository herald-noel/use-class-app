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
import { orange } from "@mui/material/colors";
import Typography from "@mui/material/Typography";

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
      <Typography variant="h3" gutterBottom>
        Saved Diagrams
      </Typography>
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
