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

const handleMovieSearch = async (req, res, moviedb) => {
	try {
		const movies = await moviedb.searchMovie({ query: "name" });

		if (!movies) {
			res.status(404).json("Unable to fetch movies");
			return;
		}

		const filteredMovies = await Promise.all(
			movies.results.map(async (movie) => fetchMovie(moviedb, movie))
		);

		res.json(movies);
	} catch (e) {
		res.status(404).json(e);
	}
};

module.exports = {
	handleMovieSearch,
};
