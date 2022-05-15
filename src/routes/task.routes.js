const express = require("express");
const router = express.Router();

const Task = require("../models/task");

router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

router.get('/:id', async(req,res) => { 
    const task = await Task.findById(req.params.id);
    res.json(task);
})

router.post("/", async (req, res) => {
  const { titulo, descripcion } = req.body;
  const task = new Task({ titulo, descripcion });
  await task.save();
  res.json({ status: "Tarea guardada" });
});

router.put('/:id', async (req, res) => {
  const { titulo, descripcion } = req.body;
  const newTask = { titulo, descripcion };
  await Task.findByIdAndUpdate(req.params.id, newTask);
  res.json({status: 'Tarea Actualizada'});
});

router.delete('/:id', async (req,res) => {
    await Task.findByIdAndRemove(req.params.id);
    res.json({status: 'Tarea Eliminada'})
});

module.exports = router;
