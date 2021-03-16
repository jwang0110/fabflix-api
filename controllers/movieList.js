const fetchMovies = async (req, moviedb) => {
	const { id } = req.params;
	const { query, page, sort, order } = req.query;

	const params = {
		language: "en-US",
		page: page ? page : 1,
	};

	let response = null;

	try {
		switch (id) {
			case "now_playing":
				response = await moviedb.movieNowPlaying(params);
				break;
			case "upcoming":
				response = await moviedb.upcomingMovies(params);
				break;
			case "popular":
				response = await moviedb.moviePopular(params);
				break;
			case "top_rated":
				response = await moviedb.movieTopRated(params);
				break;

			case "browse":
				response = await moviedb.discoverMovie(params);
				break;
			default:
				if (query) {
					response = await moviedb.searchMovie({ ...params, query });
				} else if (sort && order) {
					response = await moviedb.discoverMovie({
						...params,
						sort_by: `${sort}.${order}`,
					});
				} else {
					response = null;
				}
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
