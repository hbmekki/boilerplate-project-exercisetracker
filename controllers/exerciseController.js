const Exercise = require('../models/exerciseModel.js');
const User = require('../models/userModel.js');


// Display list of all Authors.
exports.addExercise = (req, res) => {
  const exercise = new Exercise({
        description: req.body.description,
        duration: req.body.duration,
        date: req.body.date? new Date(req.body.date) : new Date(),
        userId: req.params._id
    });
    exercise.save()
    .then((savedExercise) => {
      User.findById(savedExercise.userId)
        .then(user => {
            res.json({
                username: user.username,
                _id: user._id,
                description: savedExercise.description,
                duration: savedExercise.duration,
                date: savedExercise.date.toDateString()
            });
        })
    })
    .catch (err => {
      console.log(err)
    })
};
