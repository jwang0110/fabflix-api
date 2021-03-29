const { Pool } = require("pg");

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
});

const handleFetchBookmarks = async (req, res) => {
	const { userId } = req.body;

	if (!userId) {
		return res.status(400).json("Missing required information");
	}

	try {
		const response = await pool.query(
			"SELECT * FROM bookmarks WHERE userId = $1;",
			[userId]
		);

		res.json(response.rows);
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
		await pool.query(
			"INSERT INTO bookmarks (userId, movieId, bookmarkTime) VALUES ($1, $2, $3);",
			[userId, movieId, new Date()]
		);

		const response = await pool.query(
			"SELECT * FROM bookmarks WHERE userId = $1;",
			[userId]
		);

		res.json(response.rows);
	} catch (e) {
		res.status(400).json(e);
	}
};

module.exports = {
	handleAddBookmark,
	handleFetchBookmarks,
};
