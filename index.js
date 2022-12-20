import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import morgan from "morgan";
import userRouter from "./routes/user.js";
import tourRouter from "./routes/tour.js";
import path from "path";
import dotenv from "dotenv";
const app = express();
dotenv.config();
const __dirname1 = path.resolve();

app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(
  "/public/uploads",
  express.static(path.join(__dirname1, "/public/uploads"))
);

app.use("/users", userRouter);
app.use("/tours", tourRouter);
const port = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(port, () => console.log(`Server started on port ${port}`));
  })
  .catch((error) => console.log(`${error}`));
