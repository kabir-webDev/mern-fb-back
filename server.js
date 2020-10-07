// importing stuffs
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import path from "path";
import pusher from "pusher";
import GridFsStorage from "multer-gridfs-storage";
import Grid from "gridfs-stream";
import bodyparser from "body-parser";

//R0VtUzrX2y7eiMPc

Grid.mongo = mongoose.mongo;

// app config
const app = express();
const port = process.env.PORT || 9000;

// middlewares
app.use(bodyparser.json());
app.use(cors());

// db config
const mongoURI =
  "mongodb+srv://admin:R0VtUzrX2y7eiMPc@cluster0.sady3.mongodb.net/fbdb?retryWrites=true&w=majority";

const conn = mongoose.createConnection(mongoURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connect(mongoURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("DB Connected");
});

conn.once("open", () => {
  console.log("DB Connected");
});

// api routes
app.get("/", (req, res) => {
  res.status(200).send("Hello Cool Cooders");
});

// listener
app.listen(port, () => console.log(`Listening on localhost: ${port}`));
