const params = {
	language: "en-US",
};

const fetchMovies = async (req, moviedb) => {
	const { list } = req.params;

	let response = null;

	try {
		switch (list) {
			case "now_playing":
				response = await moviedb.movieNowPlaying(params);
				break;
			case "popular":
				response = await moviedb.moviePopular(params);
				break;
			case "top_rated":
				response = await moviedb.movieTopRated(params);
				break;
			case "upcoming":
				response = await moviedb.upcomingMovies(params);
				break;
			case "discover":
				response = await moviedb.discoverMovie();
				break;
			default:
				response = null;
		}

		return response;
	} catch (e) {
		throw e;
	}
};

const fetchMovie = async (moviedb, movie) => {
	try {
		const credits = await moviedb.movieCredits(movie.id);

		return {
			...movie,
			credits: credits,
		};
	} catch (e) {
		return { ...movie, credits: null };
	}
};

const handleMovieList = async (req, res, moviedb) => {
	try {
		const movies = await fetchMovies(req, moviedb);

		if (!movies) {
			res.status(404).json("Unable to fetch movies");
			return;
		}

		const filteredMovies = await Promise.all(
			movies.results.map(async (movie) => fetchMovie(moviedb, movie))
		);

		res.json(filteredMovies);
	} catch (e) {
		res.status(404).json(e);
	}
};

module.exports = {
	handleMovieList,
};
