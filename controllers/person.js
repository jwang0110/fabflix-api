const handlePerson = async (req, res, moviedb) => {
	const { person_id } = req.params;

	try {
		const response = await moviedb.personInfo({
			id: person_id,
			append_to_response: "movie_credits",
		});
		res.json(response);
	} catch (e) {
		res.status(400).json(e);
	}
};

module.exports = {
	handlePerson,
};
