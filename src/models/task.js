const mongoose = require('mongoose');
const {Schema} = mongoose;

const TasksSchema = new Schema({
    titulo: { type:String, required:true},
    descripcion: { type: String, required:true}
});

module.exports = mongoose.model('Task', TasksSchema);
