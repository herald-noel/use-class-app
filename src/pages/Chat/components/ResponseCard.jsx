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
    <Box sx={{ display: "flex", alignItems: "flex-start", margin: 3 }}>
      <FitbitOutlinedIcon sx={{ margin: 3 }} />

      <Card sx={{ flex: "0 1 auto" }}>
        <CardContent>
          <Typography variant="body2" sx={{ ml: 1 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sed
            turpis sem. Proin eu dictum dui. Proin sagittis ultricies elementum.
            Phasellus sodales augue sit amet neque suscipit, at euismod tellus
            semper. Pellentesque ut neque sit amet diam varius euismod. Quisque
            ultrices nunc quis purus sollicitudin auctor. Suspendisse iaculis
            libero a ipsum pulvinar blandit at ut justo. Etiam vitae orci
            feugiat, fermentum lacus in, sagittis nulla. Proin mi massa, lacinia
            eget risus nec, fringilla laoreet nisl. Curabitur sed laoreet ex.
            Donec felis justo, tincidunt vel risus eu, sollicitudin feugiat
            nisi. In sit amet convallis quam. Nulla ultrices ultrices nibh. Ut
            et augue quam. Praesent vitae ex at lectus feugiat sodales a ut
            nisi. Mauris eget pretium ipsum. Etiam magna arcu, fermentum eget
            tempus ut, commodo sit amet sapien. Morbi feugiat sodales augue eu
            lacinia. Morbi metus metus, tempor eu sagittis vitae, congue a eros.
            Pellentesque vitae dictum massa, vitae scelerisque lorem. Cras elit
            nunc, tristique id sagittis at, pretium in quam. Aenean placerat,
            purus a interdum sagittis, arcu felis condimentum magna, sit amet
            ornare mauris sapien malesuada dolor. Integer sit amet ornare est.
            Quisque in gravida risus. Sed venenatis pharetra maximus. Etiam et
            porta quam. Donec efficitur consectetur arcu. Cras maximus, quam
            eget condimentum dignissim, massa nibh bibendum sem, eget suscipit
            neque tellus quis magna. Vestibulum egestas odio id ante tincidunt
            viverra. Ut eu leo neque. In fringilla bibendum justo eget volutpat.
            Donec consequat enim elit, vel cursus tellus maximus vel.
            Pellentesque ac fringilla ipsum. Etiam id commodo lectus. Ut sem
            enim, laoreet eu lectus id, dictum consectetur magna. Duis vel
            sodales enim. Curabitur fringilla non felis et dignissim. Aliquam
            erat volutpat. Proin nec dolor enim. Praesent imperdiet mi dictum
            lacus bibendum, at efficitur ligula viverra. Etiam porttitor sapien
            ac diam cursus, nec mollis felis varius. Class aptent taciti
            sociosqu ad litora torquent per conubia nostra, per inceptos
            himenaeos. Aliquam mauris urna, euismod vel velit eget, lacinia
            auctor orci. Praesent nulla augue, egestas id molestie lobortis,
            finibus vel elit. Nam viverra, justo sit amet hendrerit luctus, nibh
            orci egestas nisi, eu convallis erat sem consectetur massa
          </Typography>
        </CardContent>
        {/* <CardActions>
          <IconButton aria-label="paste">
            <ContentPasteOutlinedIcon />
          </IconButton>
        </CardActions> */}
      </Card>
    </Box>
  );
}
