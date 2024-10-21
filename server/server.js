import "dotenv/config";
import express from "express";
const app = express();

const PORT = process.env.PORT || 8080;

import userRoutes from "./routes/user-routes.js";
import petRoutes from "./routes/pet-routes.js";
import recordRoutes from "./routes/record-routes.js";

app.use("/users", userRoutes);
app.use("/pets", petRoutes);
app.use("/records", recordRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to my API");
});

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});