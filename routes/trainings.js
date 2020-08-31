const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const User = require("../models/User");
const Training = require("../models/Training");

// @route   GET api/trainings
// @desc    Get all trainings
// @access  Private
// @admin   Everyone
router.get("/", auth, async (req, res) => {
  try {
    const trainings = await Training.find({}).sort({ date: -1 });
    res.json(trainings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/trainings
// @desc    Add new training
// @access  Private
// @admin   Admin Only

router.post(
  "/",
  [
    auth,
    admin,
    [
      body("name", "Name is required (max 30 characters long)")
        .exists()
        .bail()
        .not()
        .isEmpty()
        .bail()
        .isString()
        .bail()
        .isLength({ max: 30 })
        .trim()
        .escape(),
      body("category", "Category is required (max 30 characters long)")
        .exists()
        .bail()
        .not()
        .isEmpty()
        .bail()
        .isString()
        .bail()
        .isLength({ max: 30 })
        .trim()
        .escape(),
      body("description", "Description is required, (max 200 characters)")
        .exists()
        .bail()
        .not()
        .isEmpty()
        .bail()
        .isString()
        .isLength({ max: 200 })
        .trim()
        .escape(),
      body("date", "Date is required")
        .exists()
        .bail()
        .not()
        .isEmpty()
        .bail()
        .isString()
        .toDate(),
      body("max_people", "Maximum number of people is required")
        .isInt()
        .bail()
        .isLength({ max: 10, min: 1 })
        .bail()
        .exists()
        .bail(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, category, description, date, max_people } = req.body;

    try {
      const newTraining = new Training({
        name,
        category,
        description,
        date,
        max_people,
      });

      const training = await newTraining.save();

      res.json(training);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   PUT api/trainings/:id
// @desc    Update specific training
// @access  Private
// @admin   Admin Only

router.put(
  "/:id",
  [
    auth,
    admin,
    [
      body("name", "Name is in wrong format")
        .optional({ checkFalsy: true })
        .isString()
        .isLength({ max: 30 })
        .trim()
        .escape(),
      body("category", "Category is in wrong format")
        .optional({ checkFalsy: true })
        .isString()
        .isLength({ max: 30 })
        .trim()
        .escape(),
      body("description", "Description is in wrong format")
        .optional({ checkFalsy: true })
        .isString()
        .isLength({ max: 200 })
        .trim()
        .escape(),
      body("date", "Date is in wrong format")
        .optional({ checkFalsy: true })
        .isString()
        .toDate(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, category, description, date } = req.body;

    const trainingFields = {};
    if (name) trainingFields.name = name;
    if (category) trainingFields.category = category;
    if (description) trainingFields.description = description;
    if (date) trainingFields.date = date;

    try {
      let training = await Training.findById(req.params.id);

      if (!training) {
        return res.status(404).json({ msg: "Training not found" });
      }

      training = await Training.findByIdAndUpdate(
        req.params.id,
        { $set: trainingFields },
        { new: true }
      );

      res.json(training);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   DELETE api/trainings/:id
// @desc    Delete specific training
// @access  Private
// @admin   Admin Only

router.delete("/:id", auth, admin, async (req, res) => {
  try {
    let training = await Training.findById(req.params.id);

    if (!training) {
      return res.status(404).json({ msg: "Training not found" });
    }

    await Training.findByIdAndRemove(req.params.id);

    res.json({ msg: "Successfuly deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
