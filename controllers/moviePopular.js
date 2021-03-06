const handleMoviePopular = async (req, res, moviedb) => {
	const params = {
		language: "en-US",
	};

	try {
		const response = await moviedb.moviePopular(params);
		res.json(response);
	} catch (e) {
		res.status(404).json(e);
	}
};

module.exports = {
	handleMoviePopular,
};
