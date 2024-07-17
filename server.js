const express = require('express');
const { Pool } = require('pg');
const app = express();
const employeeManager = require('./index');

employeeManager();

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const pool = new Pool(
    {
      user: 'postgres',
      password: 'Lmsk09771!!',
      host: 'localhost',
      database: 'employees_db'
    },
    console.log(`Connected to employees_db.`)
  )
  
  pool.connect();
