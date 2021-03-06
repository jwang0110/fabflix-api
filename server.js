const express = require("express");
const cors = require("cors");
const { MovieDb } = require("moviedb-promise");

const movieLatest = require("./controllers/movieLatest.js");
const movieNowPlaying = require("./controllers/movieNowPlaying.js");
const moviePopular = require("./controllers/moviePopular.js");
const movieTopRated = require("./controllers/movieTopRated.js");
const movieUpcoming = require("./controllers/movieUpcoming.js");

const moviedb = new MovieDb(process.env.TMDB_API_KEY);

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
	res.send("fabflix-api is working");
});

app.get("/movie/latest", async (req, res) => {
	movieLatest.handleMovieLatest(req, res, moviedb);
});

app.get("/movie/now_playing", async (req, res) => {
	movieNowPlaying.handleMovieNowPlaying(req, res, moviedb);
});

app.get("/movie/popular", async (req, res) => {
	moviePopular.handleMoviePopular(req, res, moviedb);
});

app.get("/movie/top_rated", async (req, res) => {
	movieTopRated.handleMovieTopRated(req, res, moviedb);
});

app.get("/movie/upcoming", async (req, res) => {
	movieUpcoming.handleMovieUpcoming(req, res, moviedb);
});

app.listen(process.env.PORT || 3001, () => {
	console.log("fabflix-api is running");
});
