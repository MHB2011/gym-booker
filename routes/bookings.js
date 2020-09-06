const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const Booking = require("../models/Booking");
const Training = require("../models/Training");
const User = require("../models/User");

// @route   GET api/bookings
// @desc    Get all of users bookings
// @access  Private
// @admin   Everyone
router.get("/", auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id });

    res.send(bookings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/bookings/get_bookings_for_training/:id
// @desc    Get bookings for specific training id
// @access  Private
// @admin   Everyone
router.get("/get_bookings_for_training/:id", auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ training: req.params.id });
    const new_booking = bookings.map((book) => {
      return { name: book.name, id: book.user, bookingid: book._id };
    });

    let response = {};
    response.training_id = req.params.id;
    response.book = new_booking;

    res.send(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/bookings
// @desc    Book new training
// @access  Private
// @admin   Everyone
router.post(
  "/",
  [
    auth,
    [
      body("training_id", "Training id is required")
        .exists()
        .bail()
        .not()
        .isEmpty()
        .bail()
        .trim()
        .escape(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let training;
      let already_booked;
      const training_id = req.body.training_id;

      training = await Training.findById(training_id);

      const max_people = training.max_people;
      const already_reserverd_spots = await Booking.find({
        training: training_id,
      }).count();

      if (already_reserverd_spots >= max_people) {
        return res.status(400).json({
          msg: "Maximum number of people already reserved for this training.",
        });
      }

      if (!training) {
        return res.status(404).json({ msg: "Training not found" });
      }

      already_booked = await Booking.findOne({
        user: req.user.id,
        training: training_id,
      });

      if (already_booked) {
        return res
          .status(400)
          .json({ msg: "You have already reserved this training" });
      }

      const user_data = await User.findById(req.user.id).select("name");
      const user_name = user_data.name;

      const newBooking = new Booking({
        training: training_id,
        user: req.user.id,
        name: user_name,
      });

      const booking = await newBooking.save();

      res.send(booking);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   POST api/bookings/add_manually
// @desc    Book new training by admin
// @access  Private
// @admin   Admin
router.post(
  "/add_manually",
  [
    auth,
    admin,
    [
      body("trainingid", "Training id is required")
        .exists()
        .bail()
        .not()
        .isEmpty()
        .bail()
        .trim()
        .escape(),
      body("email", "Email is required")
        .exists()
        .bail()
        .not()
        .isEmpty()
        .bail()
        .isEmail()
        .bail()
        .trim()
        .escape(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let training;
      let already_booked;
      const training_id = req.body.trainingid;

      training = await Training.findById(training_id);

      const max_people = training.max_people;
      const already_reserverd_spots = await Booking.find({
        training: training_id,
      }).count();

      if (already_reserverd_spots >= max_people) {
        return res.status(400).json({
          msg: "Maximum number of people already reserved for this training.",
        });
      }

      if (!training) {
        return res.status(404).json({ msg: "Training not found" });
      }

      const user = await User.findOne({ email: req.body.email }).select(
        "-password"
      );

      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      const user_name = user.name;

      already_booked = await Booking.findOne({
        user: user._id,
        training: training_id,
      });

      if (already_booked) {
        return res
          .status(400)
          .json({ msg: "You have already reserved this training" });
      }

      const newBooking = new Booking({
        training: training_id,
        user: user._id,
        name: user_name,
      });

      const booking = await newBooking.save();

      res.send(booking);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   DELETE api/bookings/:id
// @desc    Remove user booking
// @access  Private
// @admin   Everyone
router.delete("/:id", auth, async (req, res) => {
  try {
    let booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ msg: "Booking not found" });
    }

    const user = await User.findById(req.user.id).select("admin");

    // Make sure user owns booking
    if (booking.user.toString() !== req.user.id) {
      if (user.admin !== 1) {
        return res.status(401).json({ msg: "Not authorised" });
      }
    }

    await Booking.findByIdAndRemove(req.params.id);

    res.json({ msg: "Successfuly deleted booking" });
  } catch (err) {
    console.error(err.message);
    if (err.message.includes("Cast to ObjectId failed")) {
      res.status(500).send("Wrong id format");
    } else {
      res.status(500).send("Server Error");
    }
  }
});

module.exports = router;
