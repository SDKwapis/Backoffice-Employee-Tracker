const express = require('express');
const { Pool } = require('pg');

const pool = new Pool(
    {
      user: 'postgre',
      password: 'Lmsk09771!!',
      host: 'localhost',
      database: 'employees_db'
    },
    console.log(`Connected to the movies_db database.`)
  )
  
  pool.connect();