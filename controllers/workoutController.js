const Workout = require("../model/workoutModel");

//Get All Data
const getWorkouts = async (req, res) => {
    
    try {
    const user_id = req.user._id;

    const workoutData = await Workout.find({user_id}).sort({ createdAt: -1 });
    res.status(200).json(workoutData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//Get a single Data
const getWorkout = async (req, res) => {
  try {
    const id = req.params.id;
    const workoutData = await Workout.findById({ _id: id });
    res.status(200).json(workoutData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//create Record
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;
  
  try {
    const user_id = req.user._id;

    const newWorkout = new Workout({title, reps, load, user_id });
    const workout = await newWorkout.save();
    res.status(200).json(workout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//Update Record
const editWorkout = async (req, res) => {
        const user_id = req.user._id;

  const id = req.params.id;
  const workoutData = await Workout.findByIdAndUpdate({ _id: id , user_id}, req.body, {
    new: true,
  });
  res.status(200).json(workoutData);
};

//Delete Record
const deleteWorkout = async (req, res) => {
  try {
    const id = req.params.id;
    const workoutData = await Workout.findByIdAndDelete({ _id: id });
    res.status(200).json(workoutData);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  editWorkout,
  deleteWorkout,
};
