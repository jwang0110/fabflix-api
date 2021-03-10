const express = require("express");
const cors = require("cors");
const { MovieDb } = require("moviedb-promise");

const configuration = require("./controllers/configuration.js");
const imageUrl = require("./controllers/imageUrl.js");
const movie = require("./controllers/movie.js");
const movieLatest = require("./controllers/movieLatest.js");
const movieList = require("./controllers/movieList.js");
const genreList = require("./controllers/genreList.js");

const moviedb = new MovieDb(process.env.TMDB_API_KEY);

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
	res.send("fabflix-api is working");
});

app.get("/configuration", (req, res) => {
	configuration.handleConfiguration(req, res, moviedb);
});

app.get("/imageUrl", (req, res) => {
	imageUrl.handleImageUrl(req, res, moviedb);
});

app.get("/movie/:movie_id", async (req, res) => {
	movie.handleMovie(req, res, moviedb);
});

app.get("/latest", async (req, res) => {
	movieLatest.handleMovieLatest(req, res, moviedb);
});

app.get("/movielist/:sorted", async (req, res) => {
	movieList.handleMovieList(req, res, moviedb);
});

app.get("/genrelist", async (req, res) => {
	genreList.handleGenreList(req, res, moviedb);
});

app.listen(process.env.PORT || 3001, () => {
	console.log("fabflix-api is running");
});
