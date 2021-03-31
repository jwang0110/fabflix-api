const { Client } = require("pg");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const handleSignUp = async (req, res) => {
	const { name, email, password } = req.body;

	if (!name || !email || !password) {
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

		const passwordHash = await bcrypt.hash(password, saltRounds);

		const response = await client.query("CALL addUser($1, $2, $3, $4);", [
			name,
			email,
			passwordHash,
			new Date(),
		]);
		await client.end();

		res.json(response);
	} catch (e) {
		res.status(400).json(e);
	}
};

module.exports = {
	handleSignUp,
};
