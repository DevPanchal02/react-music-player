require ('dotenv').config();
const express = require ('express');
const app = express();
const cors = require ('cors');
const database = require('./db');

//Connects to Database
database();

//Middlewares
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;
app.listen(port,() => console.log(`Connected on port ${port}`));