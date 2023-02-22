import express from "express";
import cors from "cors";
import { corsOptions } from "*/config/cors";
import { connectDB } from "*/config/mongodb";
import { env } from "*/config/environment";
import { apiV1 } from "*/routes/v1/index";

connectDB()
  .then(() => console.log("Connected succesfully database server"))
  .then(() => bootServer())
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

const bootServer = () => {
  const app = express();

  // const corsOptions = {
  //   origin: "http://localhost:3000",
  //   optionsSuccessStatus: 200,
  // };

  app.use(cors(corsOptions));

  // enable req.body data
  app.use(express.json());

  // use APIs v1
  app.use("/v1", apiV1);

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`Hello Tuan,I'm running at ${env.APP_HOST}:${env.APP_PORT}/`);
  });
};
