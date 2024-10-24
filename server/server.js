import "dotenv/config";
import cors from "cors";
import express from "express";
const app = express();

const PORT = process.env.PORT || 8080;

import userRoutes from "./routes/user-routes.js";
import petRoutes from "./routes/pet-routes.js";
import recordRoutes from "./routes/record-routes.js";

app.use("/pet_uploads", express.static("pet_uploads"));

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/pets", petRoutes);
app.use("/records", recordRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Doguments");
});

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});
