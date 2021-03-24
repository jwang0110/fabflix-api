const handleConfiguration = async (req, res, moviedb) => {
	try {
		const response = await moviedb.configuration();
		res.json(response);
	} catch (e) {
		res.status(400).json(e);
	}
};

module.exports = {
	handleConfiguration,
};
