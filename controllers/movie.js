const handleMovie = async (req, res, moviedb) => {
	const { movie_id } = req.params;

	try {
		const response = await moviedb.movieInfo(movie_id);
		res.json(response);
	} catch (e) {
		res.status(404).json(e);
	}
};

module.exports = {
	handleMovie,
};
