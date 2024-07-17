const express = require('express');

const app = express();
const employeeManager = require('./index');

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());


  employeeManager();
