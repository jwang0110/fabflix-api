const { Client } = require("pg");

const handleSignUp = async (req, res) => {
	try {
		const client = new Client({
			connectionString: process.env.DATABASE_URL,
			ssl: {
				rejectUnauthorized: false,
			},
		});

		client.connect();

		const response = await client.query(
			"INSERT INTO login (email, password) VALUES ($1, $2);",
			["myemail@gmail.com", "mypassword"]
		);
		await client.end();
		res.json(response);
	} catch (e) {
		res.status(404).json(e);
	}
};

module.exports = {
	handleSignUp,
};
