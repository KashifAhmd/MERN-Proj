require("dotenv").config();

const express = require('express');
const cors = require('cors');

const app = express();

//DataBase Connection..
require('./database/connection')

//Port Of Server..
const port = process.env.PORT || 4000;

//Require Routes
const workoutRoutes = require('./routes/workoutRoutes')
const userRoutes = require('./routes/userRoutes')

//Middleware
app.use(express.json());

app.use(cors());

// app.get('/', (req, res)=>{
//     res.send('Hello Everyone!');
// })


//Routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

app.listen(port, ()=>{
    console.log(`Server is running at port: ${port}`);
})