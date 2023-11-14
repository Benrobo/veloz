import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import router from "routes";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
