import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import ChatRoute from "./routes/ChatRoute";

dotenv.config();
const PORT = process.env.PORT;
const app = express();

// Configure CORS
app.use(cors());

app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const version = "/api/v1";
app.use(`${version}/chat`, ChatRoute);

app
  .listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
  })
  .on("error", (error) => {
    throw new Error(error.message);
  });