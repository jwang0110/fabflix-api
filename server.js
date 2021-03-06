const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
	res.send("fabflix-api is working");
});

app.listen(process.env.PORT || 3001, () => {
	console.log("fabflix-api is running");
});
