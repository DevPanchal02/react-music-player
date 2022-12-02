require ('dotenv').config();
const express = require ('express');
const app = express();
const cors = require ('cors');
//const bodyParser = require ('body-parser');
const database = require('./db');
const mongoose = require("mongoose");
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');


//Connects to Database
database();

//Middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/api", registerRoute);
app.use("/api", loginRoute);

const port = process.env.PORT || 3000;
app.listen(port,() => console.log(`Connected on port ${port}`));