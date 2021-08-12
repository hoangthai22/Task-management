import express from "express";
import { connectDB, getDB } from "./src/config/mongodb.js";
import cors from "cors";
import { apiV1 } from "./src/routes/v1/index.js";
import path from 'path';
const port = 5000;

const __dirname = path.resolve()

// console.log( __dirname )
connectDB()
  .then(() => {
    console.log("Connected successfully to database server");
  })
  .then(() => bootServer())
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

const bootServer = () => {
  const app = express();
  // app.use(express.static(path.join(__dirname, "build")));

  // app.get("/*", (req, res) => {
  //   res.sendFile(path.join(__dirname, "build", "index.html"));
  // });
  
  const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  app.use(cors(corsOptions));
  //Enable req.body.data
  app.use(express.json());
  //Use Apis v1
  app.use("/v1", apiV1);

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
};
