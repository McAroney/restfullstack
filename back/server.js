const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const session = require('express-session')
const mongoose = require('mongoose')
const reservationRoutes = express.Router()
const PORT = 4000

mongoose.connect(
  'mongodb://reservations:R3servations@ds119160.mlab.com:19160/restful-reservations',
  { useNewUrlParser: true, useFindAndModify: false }
)
const connection = mongoose.connection
connection.once('open', function () {
  console.log('MongoDB connected')
})

let Reservation = require('./models/reservation')
let User = require('./models/user')

/* Initialize passport's serialize and deSerialize protocols */
app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser(function (user, done) {
  done(null, user.id)
})
passport.deserializeUser(function (id, done) {
  User.findOne(
    {
      _id: id
    },
    '-password -salt',
    function (err, user) {
      done(err, user)
    }
  )
})

/* Strategy used for passport is username/password match (local)
If ANY don't match, return a generic error! */
passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne(
      {
        username: username
      },
      function (err, user) {
        if (err) return done(err)
        if (!user) return done(null, false)
        /* When user is not found */

        if (!user.authenticate(password)) return done(null, false)
        /* When password is not correct */

        return done(null, user)
        /* When all things are good, return the user object */
      }
    )
  })
)

/* ROUTES */

/* list all reservations or filtered results */
reservationRoutes.route('/list').get((req, res) => {
  let search = {}
  if (req.body) {
    this.search = {}
    /* If listing has filters */
    if (req.body.reservation_paid) {
      this.search.reservation_paid = req.body.reservation_paid
    } /* filter by paid */
    if (req.body.reservation_from) {
      this.search.reservation_from = req.body.reservation_from
    } /* filter by booking date */
    if (req.body.reservation_days) {
      this.search.reservation_days = req.body.reservation_days
      /* filter by booking days */
    }
    search = this.search
  }

  Reservation.find(search).exec((err, reservations) => {
    if (reservations.length < 1) {
      res.json({ msg: 'No reservations found!' })
    } else {
      res.json(reservations)
    }
  })
})

/*add reservation */
reservationRoutes.route('/add').post((req, res) => {
  let reservation = new Reservation(req.body)
  reservation.reservation_created = Date.now()
  reservation.reservation_edited = Date.now() /* initially set to creation date */

  reservation
    .save()
    .then(reservation => {
      res.json({
        msg: 'Reservation made succesfully!',
        object: req.body
      })
    })
    .catch(err => {
      res.json(err)
    })
})

/* Update reservation */
reservationRoutes.route('/update/:id').put((req, res) => {
  Reservation.findById(req.params.id, (err, reservation) => {
    if (!reservation) {
      res.status(404).send('Reservation not found!')
    } else {
      reservation.reservation_created =
        reservation.reservation_created /*Creation date doesn't change, because.. */
      reservation.reservation_edited = Date.now() /* .. We are now editing.. */
      reservation.reservation_from = req.body.reservation_from
      reservation.reservation_days = req.body.reservation_days
      reservation.reservation_for = req.body.reservation_for
      reservation.reservation_author = req.body.reservation_author
      reservation.reservation_note = req.body.reservation_note
      reservation.reservation_paid =
        reservation.reservation_paid /* Client can't change the reservation's payment status */

      reservation.save().then(reservation => {
        res.json({ msg: 'reservation updated succesfully!' })
      })
    }
  }).catch(err => {
    res.json({ msg: 'Error updating reservation', err: err })
  })
})
/* Remove a reservation */
/* Change 'paid' status of a reservation  */
reservationRoutes.route('/remove/:id').delete((req, res) => {
  Reservation.findOneAndDelete({ _id: req.params.id }).then(reservation => {
    res.json({ msg: 'Reservation deleted!', object: reservation })
  })
})

/* Change 'paid' status of a reservation  */
reservationRoutes.route('/paidstatus/:id').patch((req, res) => {
  let reservation = Reservation.findById(req.params.id)

  if (!reservation) {
    res.status(404).send('Reservation not found!')
  }
  if (!req.body.paid) {
    res.json({ msg: 'no paid value provided!', request: req.body })
  } else {
    let markedas = req.body.paid == 1 ? 'paid' : 'unpaid'
    reservation
      .findOneAndUpdate({ reservation_paid: req.body.paid })
      .then(reservation => {
        res.json({ msg: 'Reservation marked as ' + markedas + '.' })
      })
  }
})

/* LOGIN to change payment status for a reservation */
reservationRoutes
  .route('/login')
  .post(passport.authenticate('local'), function (req, res, done) {
    res.json({ msg: 'Authentication done!' })
  })
/* LOGOUT reset session token */

/* END of Routes */

app.use(bodyParser.urlencoded())
app.use('/reservations', reservationRoutes)

app.use(
  session({
    name: 'site_cookie',
    secret: 'seecret',
    resave: true,
    saveUninitialized: false,
    cookie: {
      /* session cookies only last 2 minutes but they are resaved when session is active */

      maxAge: 120000
    }
  })
)

app.listen(PORT, function () {
  console.log('Server is running on port: ' + PORT)
})
