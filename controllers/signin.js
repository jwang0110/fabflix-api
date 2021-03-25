const { Client } = require("pg");

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
			"SELECT * FROM users JOIN login ON users.email = login.email WHERE users.email=$1",
			[email]
		);

		await client.end();

		if (response?.rows?.[0]) {
			const {
				name,
				email: dbEmail,
				password: dbPassword,
				joined,
			} = response.rows[0];

			if (email === dbEmail && password === dbPassword) {
				return res.json({
					status: "succeeded",
					name,
					email: dbEmail,
					joined,
				});
			} else {
				return res.status(400).json({
					status: "failed",
					error: "Invalid user credentials",
				});
			}
		} else {
			return res.status(400).json({
				status: "failed",
				error: "Invalid user credentials",
			});
		}
	} catch (e) {
		res.status(400).json(e);
	}
};

module.exports = {
	handleSignIn,
};
