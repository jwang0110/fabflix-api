const { Client } = require("pg");
const bcrypt = require("bcrypt");

const failMessage = {
	status: "failed",
	message: "Invalid user credentials",
};

const handleSignIn = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
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
			"SELECT * FROM users JOIN logins ON users.email = logins.email WHERE users.email = $1;",
			[email]
		);

		await client.end();

		if (!response?.rows?.[0]) {
			return res.status(400).json(failMessage);
		}

		const user = response.rows[0];
		const match = await bcrypt.compare(password, user.passwordhash);

		if (match) {
			return res.json({
				status: "succeeded",
				user: {
					id: user.userid,
					name: user.name,
					email: user.email,
					joined: user.joined,
				},
			});
		} else {
			return res.status(400).json(failMessage);
		}
	} catch (e) {
		res.status(400).json(e);
	}
};

module.exports = {
	handleSignIn,
};
