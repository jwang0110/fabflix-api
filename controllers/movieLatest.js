const handleMovieLatest = async (req, res, moviedb) => {
	const params = {
		language: "en-US",
	};

	try {
		const response = await moviedb.movieLatest(params);
		res.json(response);
	} catch (e) {
		res.status(400).json(e);
	}
};

module.exports = {
	handleMovieLatest,
};
