import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import HomeViewModel from "../../../../../viewModels/HomeViewModel";

const Save = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    HomeViewModel.setTitle(title);
    HomeViewModel.saveMermaidCode();
    setOpen(false);
  };

  return (
    <>
      <Button
        startIcon={<SaveOutlinedIcon />}
        variant="outlined"
        onClick={handleClickOpen}
      >
        Save
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Save Diagram</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Diagram Title"
            type="text"
            fullWidth
            variant="standard"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ width: 250 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Save;
