const handleMovieNowPlaying = async (req, res, moviedb) => {
	const params = {
		language: "en-US",
	};

	try {
		const response = await moviedb.movieNowPlaying(params);
		res.json(response);
	} catch (e) {
		res.status(404).json(e);
	}
};

module.exports = {
	handleMovieNowPlaying,
};
