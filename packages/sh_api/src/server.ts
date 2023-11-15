import "module-alias/register";
import express, { NextFunction } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./routes";
import { HandleGlobalErrors } from "./utils/error";

const app = express();
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());

app.use("/api", router);

app.use(HandleGlobalErrors);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
