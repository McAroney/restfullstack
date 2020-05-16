const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Reservation = new Schema({
	reservation_created: {
		type: Date
	},
	reservation_edited: {
		type: Date
	},
	reservation_from: {
		type: Date
	},
	reservation_days: {
		type: Number
	},

	reservation_for: {
		type: Number
	},
	reservation_author: {
		type: String
	},
	reservation_note: {
		type: String
	},
	reservation_paid: {
		type: Boolean,
		default: 0
	}
});

module.exports = mongoose.model("Reservation", Reservation);
