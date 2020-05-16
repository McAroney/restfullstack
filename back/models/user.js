const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let User = new Schema({
	username: {
		type: String
	},
	password: {
		type: String
	}
});

User.methods.authenticate = function (password) {
	console.log("invoking model's authentication method");
	return password === this.password;
};

module.exports = mongoose.model("User", User);
