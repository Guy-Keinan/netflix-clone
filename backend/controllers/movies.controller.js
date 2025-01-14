import { fetchFromTMDB } from "../services/tmdb.service.js";

export const getTrendingMovie = async (req, res) => {
  try {
    const data = await fetchFromTMDB(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    );
    const randomMovie =
      data.results[Math.floor(Math.random() * data.results?.length)];
    res.status(200).json({ success: true, content: randomMovie });
  } catch (err) {
    console.error("Error in getTrendingMovie controller: " + err.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getMovieTrailers = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
    );
    res.status(200).json({ success: true, trailers: data.results });
  } catch (err) {
    if (err.message.includes("404")) {
      res.status(404).send(null);
    }
    console.error("Error in getMovieTrailers controller: " + err.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getMovieDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`
    );
    res.status(200).json({ success: true, content: data });
  } catch (err) {
    if (err.message.includes("404")) {
      res.status(404).send(null);
    }
    console.error("Error in getMovieDetails controller: " + err.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getSimilarMovies = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`
    );
    res.status(200).json({ success: true, content: data.results });
  } catch (err) {
    console.error("Error in getSimilarMovies controller: " + err.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getMoviesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`
    );
    res.status(200).json({ success: true, content: data.results });
  } catch (err) {
    console.error("Error in getMoviesByCategory controller: " + err.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
