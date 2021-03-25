const express = require("express");
const cors = require("cors");
const { MovieDb } = require("moviedb-promise");

const configuration = require("./controllers/configuration.js");
const person = require("./controllers/person.js");
const movie = require("./controllers/movie.js");
const movieLatest = require("./controllers/movieLatest.js");
const movieList = require("./controllers/movieList.js");
const movieSearch = require("./controllers/movieSearch.js");
const genreList = require("./controllers/genreList.js");
const signup = require("./controllers/signup");
const signin = require("./controllers/signin");

const moviedb = new MovieDb(process.env.TMDB_API_KEY);

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
	res.send("fabflix-api is working");
});

// General

app.post("/signup", async (req, res) => {
	signup.handleSignUp(req, res);
});

app.post("/signin", async (req, res) => {
	signin.handleSignIn(req, res);
});

app.get("/configuration", (req, res) => {
	configuration.handleConfiguration(req, res, moviedb);
});

app.get("/genrelist", async (req, res) => {
	genreList.handleGenreList(req, res, moviedb);
});

//Movie or Person

app.get("/person/:person_id", async (req, res) => {
	person.handlePerson(req, res, moviedb);
});

app.get("/movie/:movie_id", async (req, res) => {
	movie.handleMovie(req, res, moviedb);
});

app.get("/latest", async (req, res) => {
	movieLatest.handleMovieLatest(req, res, moviedb);
});

app.get("/movielist", async (req, res) => {
	movieList.handleMovieList(req, res, moviedb);
});

app.get("/movielist/:id", async (req, res) => {
	movieList.handleMovieList(req, res, moviedb);
});

app.get("/movielist/:id", async (req, res) => {
	movieList.handleMovieList(req, res, moviedb);
});

app.get("/random/:id", async (req, res) => {
	movieList.handleMovieRandom(req, res, moviedb);
});

//Search

app.get("/movieSearch", async (req, res) => {
	movieSearch.handleMovieSearch(req, res, moviedb);
});

//Listening

app.listen(process.env.PORT || 3001, () => {
	console.log("fabflix-api is running");
});
