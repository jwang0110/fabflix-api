const express = require("express");
const cors = require("cors");
const { MovieDb } = require("moviedb-promise");

const movieLatest = require("./controllers/movieLatest.js");
const movieList = require("./controllers/movieList.js");

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

app.get("/movielist/:sorted", async (req, res) => {
	movieList.handleMovieList(req, res, moviedb);
});

app.listen(process.env.PORT || 3001, () => {
	console.log("fabflix-api is running");
});
