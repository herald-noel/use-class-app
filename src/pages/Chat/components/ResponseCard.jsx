import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";
import IconButton from "@mui/material/IconButton";
import FitbitOutlinedIcon from "@mui/icons-material/FitbitOutlined";

export default function ResponseCard() {
  return (
    <Card
      sx={{
        minWidth: 500,
        height: 120,
        borderColor: "#A5ABBD",
        borderWidth: 1,
        backgroundColor: "#F5F9FF",
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <FitbitOutlinedIcon />
          <Typography variant="body2" sx={{ ml: 1 }}>
            Sample Response.
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <IconButton aria-label="paste">
          <ContentPasteOutlinedIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}
