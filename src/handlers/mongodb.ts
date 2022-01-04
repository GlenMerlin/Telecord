const mongoose = require("mongoose");

const { mongodb } = require("../.config.json");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
	console.log("database connection successful");
});

module.exports = () => {
	mongoose.connect(mongodb, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
};
