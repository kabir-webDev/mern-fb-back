// importing stuffs
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import path, { resolve } from "path";
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
let gfs;
conn.once("open", () => {
  console.log("DB Connected");
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("images");
});

const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      {
        const filename = `image-${Date.now()}${path.extname(
          file.originalname
        )}`;
        const fileInfo = {
          filename: filename,
          bucketName: "image",
        };
        resolve(fileInfo);
      }
    });
  },
});

const upload = multer({ storage });

// api routes
app.get("/", (req, res) => {
  res.status(200).send("Hello Cool Cooders");
});

app.post("/upload/image", upload.single("file"), (req, res) => {
  res.status(201).send(req.file);
});

// listener
app.listen(port, () => console.log(`Listening on localhost: ${port}`));
