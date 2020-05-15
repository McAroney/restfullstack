const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const reservationRoutes = express.Router();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(
	"mongodb://reservations:R3servations@ds119160.mlab.com:19160/restful-reservations",
	{ useNewUrlParser: true }
);
const connection = mongoose.connection;
connection.once("open", function () {
	console.log("MongoDB connected");
});

let Reservation = require("./models/reservation");
/* ROUTES */
/* list all */
reservationRoutes.route("/list").get(function (req, res) {
	Reservation.find(function (err, reservations) {
		if (err) {
			console.log(err);
		} else {
			res.json(reservations);
		}
	});
});
/* reservation detail */
reservationRoutes.route("/:id").get(function (reg, res) {
	Reservation.findById(req.params.id, function (err, reservation) {
		if (err) {
			console.log(err);
		} else {
			res.json(Reservation);
		}
	});
});
/*add reservation */
reservationRoutes.route("/add").post( function (req, res) {
  let reservation = new Reservation(req.body);
  reservation.save()
    .then( reservation => {
      res.status("200").json({"msg": "Reservation made succesfully!"});
    })
    .catch( err => {
      res.status(400).send({"msg": "adding reservation failed",
                            "err" : err});
});

/* Update reservation */
reservationRoutes.router("update/:id").post(function (req, res) {
  Reservation.findById(req.params.id, function (err, reservation) {
    if (!reservation) {
      res.status(404).send("Reservation not found!")
    } else {
      reservation.reservation_from = req.body.reservation_from;
      reservation.reservation_to = req.body.reservation_to;
      reservation.reservation_author = req.body.reservation_author;
      reservation.reservation_note = req.body.reservation_note;
      reservation.save().then( reservation => {
        res.json({"msg" : "reservation updated succesfully!"})
      });
    }
  })
  .catch ( err => {
    res.json({"msg" : "Error updating reservation",
              "err" : err })
  })
});
/* Delete reservation */
reservationRoutes.route("/remove/:id").get( function (req,res) {
  let reservation = Reservation.findById(req.params.id);
  if (!reservation) {
    res.status(404).send("Reservation not found!")
  } else {
    reservation.remove()
    .then(res.json({"msg": "Reservation removed"}))
    .catch( err => {res.json({"msg": "Error while deleting!", "err" : err})});
  }
})
app.use("/reservations", reservationRoutes);

app.listen(PORT, function () {
	console.log("Server is running on port: " + PORT);
});
