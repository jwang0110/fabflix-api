const handleImageUrl = async (req, res, moviedb) => {
	try {
		const response = await moviedb.configuration();
		res.json({ url: response.images.secure_base_url });
	} catch (e) {
		res.status(404).json(e);
	}
};

module.exports = {
	handleImageUrl,
};
