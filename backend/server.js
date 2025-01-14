import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import authRoutes from "./routes/auth.route.js";
import moviesRoutes from "./routes/movies.route.js";
import tvRoutes from "./routes/tv.route.js";
import searchRoute from "./routes/search.route.js";
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import { protectRoute } from "./middleware/protectRoute.js";

const app = express();
const PORT = ENV_VARS.PORT;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/movie", protectRoute, moviesRoutes);
app.use("/api/tv", protectRoute, tvRoutes);
app.use("/api/search", protectRoute, searchRoute);

if (ENV_VARS.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  connectDB();
});
