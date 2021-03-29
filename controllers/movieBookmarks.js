const fetchMovieWithId = async (moviedb, movie_id) => {
	try {
		const response = await moviedb.movieInfo({
			id: movie_id,
			append_to_response: "credits",
		});

		return response;
	} catch (e) {
		return null;
	}
};

const handleMovieBookmarks = async (req, res, moviedb) => {
	const { movieIds } = req.body;

	try {
		if (!movieIds) {
			res.status(400).json("Unable to fetch movies");
			return;
		}

		const movies = await Promise.all(
			movieIds.map(async (movieId) => fetchMovieWithId(moviedb, movieId))
		);

		const filteredMovies = movies.filter((movie) => movie != null);

		res.json(filteredMovies);
	} catch (e) {
		res.status(400).json(e);
	}
};

module.exports = {
	handleMovieBookmarks,
};
