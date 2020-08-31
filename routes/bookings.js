const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const Booking = require("../models/Booking");
const Training = require("../models/Training");

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

      if (!training) {
        return res.status(404).json({ msg: "Training not found" });
      }

      already_booked = await Booking.findOne({
        user: req.user.id,
        training: training_id,
      });

      if (already_booked) {
        return res.json({ msg: "You have already booked this training" });
      }

      const newBooking = new Booking({
        training: training_id,
        user: req.user.id,
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

    // Make sure user owns booking
    if (booking.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "Not authorised" });
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
