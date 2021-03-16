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

const handlePersonSearch = async (req, res, moviedb) => {
	try {
		const movies = await moviedb.searchPerson({ query: "robert" });

		if (!movies) {
			res.status(404).json("Unable to fetch movies");
			return;
		}

		// const filteredMovies = await Promise.all(
		// 	movies.results.map(async (movie) => fetchMovie(moviedb, movie))
		// );

		res.json(movies);
	} catch (e) {
		res.status(404).json(e);
	}
};

module.exports = {
	handlePersonSearch,
};
