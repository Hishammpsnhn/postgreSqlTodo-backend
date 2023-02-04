const express = require('express')
const cors = require('cors')
require('dotenv').config({ path: './.env' })

const app = express()
const pool = require('./db.js');

//middleware
app.use(cors())
app.use(express.json())

//routes

//create todo
app.post('/todo', async (req, res) => {
  try {
    const { description } = req.body;
    console.log(description)
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES ($1)",
      [description]
    );
    res.json(newTodo);
  } catch (error) {
    console.error(error)
  }
})

//get todo

//update todo

//delete todo

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})