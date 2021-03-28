const { Client } = require("pg");

const handleFetchBookmarks = async (req, res) => {
	const { userId } = req.body;

	if (!userId) {
		return res.status(400).json("Missing required information");
	}

	try {
		const client = new Client({
			connectionString: process.env.DATABASE_URL,
			ssl: {
				rejectUnauthorized: false,
			},
		});

		client.connect();

		const response = await client.query(
			"SELECT * FROM bookmarks WHERE userId = $1;",
			[userId]
		);
		await client.end();

		res.json(response);
	} catch (e) {
		res.status(400).json(e);
	}
};

const handleAddBookmark = async (req, res) => {
	const { userId, movieId } = req.body;

	if (!userId || !movieId) {
		return res.status(400).json("Missing required information");
	}

	try {
		const client = new Client({
			connectionString: process.env.DATABASE_URL,
			ssl: {
				rejectUnauthorized: false,
			},
		});

		client.connect();

		const response = await client.query(
			"INSERT INTO bookmarks (userId, movieId, bookmarkTime) VALUES ($1, $2, $3);",
			[userId, movieId, new Date()]
		);
		await client.end();

		res.json(response);
	} catch (e) {
		res.status(400).json(e);
	}
};

module.exports = {
	handleAddBookmark,
	handleFetchBookmarks,
};
