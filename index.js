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
      "INSERT INTO todo (description) VALUES ($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.error(error)
  }
})

//get todo
app.get('/todos', async (req, res) => {
  console.log("totos")
  try {
    const allTodos = await pool.query("SELECT * FROM todo")
    res.json(allTodos.rows)
  } catch (error) {
    console.error(error)
  }
});
app.get('/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await pool.query(
      "SELECT * FROM todo WHERE todo_id =$1",
      [id])
    res.json(todo.rows[0])
  } catch (error) {
    console.error(error)
  }
});
//update todo
app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  try {
    const newtodo = await pool.query(
      "UPDATE todo SET description=$1 WHERE todo_id = $2 RETURNING *",
      [description, id])
      res.json(newtodo.rows[0])
  } catch (error) {
    console.error(error)
  }
})
//delete todo
app.delete('/todos/:id', async (req, res)=>{
  const { id } = req.params;
  try {
    const deletetodo = await pool.query("DELETE FROM todo WHERE todo_id = $1",[id])  
    res.json("deletetodo")
  } catch (error) {
    console.error(error)
  }
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})