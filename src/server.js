import express from "express";
import { connectDB } from "*/config/mongodb";
import { env } from "*/config/environment";

const app = express();

const hostname = "localhost";
const port = 8017;

connectDB().catch(console.log);

app.get("/", (req, res) => {
  res.end(`<h1>Hello world<h1/>, I'm running at ${env.HOST}:${env.PORT}/`);
});

app.listen(env.PORT, env.HOST, () => {
  console.log(`Hello Tuan,I'm running at ${env.HOST}:${env.PORT}/`);
});
