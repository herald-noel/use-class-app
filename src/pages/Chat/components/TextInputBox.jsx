import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";

export default function TextInputBox() {
  return (
    <Box component="form" noValidate autoComplete="off" sx={{ width: "100%" }}>
      <TextField
        id="outlined-multiline-flexible"
        label=""
        multiline
        maxRows={5}
        sx={{ width: "100%" }}
        InputProps={{
          style: {
            fontSize: "14px", // Adjust font size as desired
          },
          endAdornment: (
            <IconButton type="submit" aria-label="send" edge="end">
              <SendIcon />
            </IconButton>
          ),
        }}
      />
    </Box>
  );
}
