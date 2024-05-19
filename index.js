const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
require('./db/database.js');

const usersRouter = require("./routes/usersRoutes.js");
const exercisesRouter = require("./routes/exercisesRoutes.js");
const logsRouter = require("./routes/logsRoutes.js");

app.use(cors())
app.use(express.static('public'))

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

//API routes
app.use("/api/users/:_id/exercises", exercisesRouter);
app.use("/api/users/:_id/logs", logsRouter);
app.use("/api/users", usersRouter);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
