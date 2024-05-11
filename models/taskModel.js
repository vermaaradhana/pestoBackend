const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    name: String,  
    description: String,
    status: String
});

const taskModel = mongoose.model("task", taskSchema);
module.exports = taskModel