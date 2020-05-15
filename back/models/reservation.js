const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Reservation = new Schema({
	reservation_from: {
		type: Date
	},
	reservation_for: {
		type: Number
	},
	reservation_author: {
		type: String
	},
	reservation_note: {
		type: String
	}
});

module.exports = mongoose.model("Reservation", Reservation);
