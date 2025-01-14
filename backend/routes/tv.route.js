import express from "express";
import {
  getTVDetails,
  getTrendingTV,
  getTVTrailers,
  getSimilarTVs,
  getTVsByCategory,
} from "../controllers/tv.controller.js";

const router = express.Router();

router.get("/trending", getTrendingTV);
router.get("/:id/trailers", getTVTrailers);
router.get("/:id/details", getTVDetails);
router.get("/:id/similar", getSimilarTVs);
router.get("/:category", getTVsByCategory);

export default router;
