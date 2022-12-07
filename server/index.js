require ('dotenv').config();
const express = require ('express');
const app = express();
const cors = require ('cors');
const database = require('./db');
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const updateUserRoute = require('./routes/updateUser');
const musicRoute = require('./routes/music');

//Connects to Database
database();

//Middlewares
app.use(express.json());
app.use(cors());

//routes
//Registration Route
app.use("/api", registerRoute);
//Sign-In Route
app.use("/api", loginRoute);
//Update Account Route
app.use("/api", updateUserRoute);
//Music Route for data
app.use("/api", musicRoute);

const port = process.env.PORT || 3000;
app.listen(port,() => console.log(`Connected on port ${port}`));