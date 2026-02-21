import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./modules/auth/auth.routes";
import { authenticate } from "./middlewares/auth.middleware";


const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.get("/api/v1/protected", authenticate, (req, res) => {
  res.json({ message: "You are authenticated" });
});

app.use("/api/v1/auth", authRoutes);

export default app;
