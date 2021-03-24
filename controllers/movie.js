const handleMovie = async (req, res, moviedb) => {
	const { movie_id } = req.params;

	try {
		const response = await moviedb.movieInfo({
			id: movie_id,
			append_to_response: "credits",
		});
		res.json(response);
	} catch (e) {
		res.status(400).json(e);
	}
};

module.exports = {
	handleMovie,
};
