import { fetchFromTMDB } from "../services/tmdb.service.js";
import { User } from "../models/user.model.js";

export const searchPerson = async (req, res) => {
  try {
    const { query } = req.params;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (data.results.length === 0) {
      return res.status(404).json({ message: "No results found" });
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          image: data.results[0].profile_path,
          title: data.results[0].name,
          searchType: "person",
          createdAt: new Date(),
        },
      },
    });

    return res.status(200).json({ success: true, content: data.results });
  } catch (err) {
    console.error("Error in searchPerson controller " + err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const searchMovie = async (req, res) => {
  try {
    const { query } = req.params;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    );
    if (data.results.length === 0) {
      return res.status(404).json({ message: "No results found" });
    }
    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          image: data.results[0].poster_path,
          title: data.results[0].title,
          searchType: "movie",
          createdAt: new Date(),
        },
      },
    });
    return res.status(200).json({ success: true, content: data.results });
  } catch (err) {
    console.error("Error in searchMovie controller " + err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const searchTv = async (req, res) => {
  try {
    const { query } = req.params;
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
    );

    if (data.results.length === 0) {
      return res.status(404).json({ message: "No results found" });
    }

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          image: data.results[0].poster_path,
          title: data.results[0].original_name,
          searchType: "tv",
          createdAt: new Date(),
        },
      },
    });

    return res.status(200).json({ success: true, content: data.results });
  } catch (err) {
    console.error("Error in searchTv controller " + err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getSearchHistory = async (req, res) => {
  try {
    res.status(200).json({ success: true, content: req.user.searchHistory });
  } catch (err) {
    console.error("Error in getSearchHistory controller " + err.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const removeItemFromSearchHistory = async (req, res) => {
  try {
    let { id } = req.params;
    id = parseInt(id);

    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        searchHistory: { id: id },
      },
    });
    
    return res
      .status(200)
      .json({ success: true, message: "Item removed from search history" });
  } catch (err) {
    console.error(
      "Error in removeItemFromSearchHistory controller " + err.message
    );
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
