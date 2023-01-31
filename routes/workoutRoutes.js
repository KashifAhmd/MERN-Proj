const express = require("express");
const authUser = require("../middleware/userMiddleware")

const router = express.Router();

//Require Controller
const {
  getWorkouts,
  getWorkout,
  createWorkout,
  editWorkout,
  deleteWorkout
} = require("../controllers/workoutController");

router.use(authUser);

//Get entire Records
router.get("/", getWorkouts);

//Get single record
router.get("/:id", getWorkout);

//Create Record
router.post("/", createWorkout);

//Update record
router.patch('/:id', editWorkout);

//Delete Record
router.delete('/:id', deleteWorkout); 

module.exports = router;
