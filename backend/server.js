import express from "express";
import authRoutes from "./routes/auth.route.js";
import moviesRoutes from "./routes/movies.route.js";
import tvRoutes from "./routes/tv.route.js";
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import { protectRoute } from "./middleware/protectRoute.js";
import searchRoute from "./routes/search.route.js";

const app = express();
const PORT = ENV_VARS.PORT;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/movie", protectRoute, moviesRoutes);
app.use("/api/tv", protectRoute, tvRoutes);
app.use("/api/search", protectRoute, searchRoute);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  connectDB();
});
