const task= require("../models/taskModel");
const mongoose = require("mongoose");
const con = require("../config/dbConfig").connection;

async function createTask(req, res, err) {
    try {
        const body = req.body;
        let newTask = new task({
            name: body.name,
            description: body.description,
            status: body.status
        });
        await newTask.save();
        res.status(201).send({
            success: true,
            data: newTask
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message  
        });
    }
}

async function getTask(req, res, err) {
    try {
        let data = await task.find();
        res.status(200).send({
            success: true,
            data: data
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
}

async function updateTask(req, res, err) {
    try {
        const body = req.body;
        let data = await task.findByIdAndUpdate(body._id, {
            name: body.name,
            description: body.description,
            status: body.status
        });
        res.status(200).send({
            success: true,
            data: data
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
}

async function deleteTask(req, res, err) {
    try {
        const body = req.body;
        let data = await task.findByIdAndDelete(body._id);
        res.status(200).send({
            success: true,
            data: data
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    createTask,
    getTask,
    updateTask,
    deleteTask
}