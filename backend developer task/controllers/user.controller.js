const { getUserTasks } = require("../repository/repository");
let UserModel = require("../models/user.model");

exports.getAllTasks = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const user = await UserModel.findById(userId);
          // Filter out tasks and subtasks marked as deleted
          const filteredTasks = user.tasks
          .filter(task => !task.deleted)
          .map(task => ({
              ...task.toObject(),
              subtasks: task.subtasks.filter(subtask => !subtask.deleted)
          }));
        res.status(200).json(filteredTasks);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

exports.createTask = async (req, res, next) => {
    try {
        let id = req.body.id;
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const newTask = {
            subject: req.body.subject,
            deadline: req.body.deadline,
            status: req.body.status,
        };
        user.tasks.push(newTask);
        await user.save();

        res.status(200).json(newTask);
    } catch (error) {
        next(error);
    }
};

exports.createUser = async (req, res, next) => {
    try {
        const { name, email } = req.body;

        // Validate the request body
        if (!name || !email) {
            return res.status(statusCodes.BAD_REQUEST).json({ message: "Name and email are required" });
        }

        // Create a new user
        const newUser = new UserModel({
            userId: 1,
            name,
            email,
        });

        // Save the user to the database
        await newUser.save();

        // Return the newly created user
        res.status(200).json(newUser);
    } catch (error) {
        next(error);
    }
};

exports.updateTask = async (req, res, next) => {
    try {
        let id=req.body.userId
        let taskId=req.params.taskId
        const user = await UserModel.findById(id);
        if (!user) return res.status(404).send("User not found");

        const task = user.tasks.id(taskId);
        if (!task) return res.status(404).send("Task not found");

        task.subject = req.body.subject;
        task.deadline = req.body.deadline;
        task.status = req.body.status;

        await user.save();

        res.status(200).json(task);
    } catch (err) {
        res.status(500).send(`Failed to update task: ${err.message}`);
    }
};

exports.deleteTask = async (req, res, next) => {
    try {
        let id=req.body.userId
        let taskId=req.params.taskId
        const user = await UserModel.findById(id);
        if (!user) return res.status(404).send("User not found");

        const task = user.tasks.id(taskId);
        if (!task) return res.status(404).send("Task not found");

        task.deleted = true;

        await user.save();

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (err) {
        res.status(500).send(`Failed to delete task: ${err.message}`);
    }
};

exports.getSubtasks = async (req, res, next) => {
    try {
        let id=req.query.userId
        let taskId=req.params.taskId
        const user = await UserModel.findById(id);
        if (!user) return res.status(404).send("User not found");

        const task = user.tasks.id(taskId);
        if (!task) return res.status(404).send("Task not found");

        const subtasks = task.subtasks.filter((subtask) => !subtask.deleted);

        res.status(200).json(subtasks);
    } catch (err) {
        res.status(500).send(`Failed to fetch subtasks: ${err.message}`);
    }
};

exports.updateSubtasks = async (req, res, next) => {
    try {
        let id=req.body.userId
        let taskId=req.params.taskId
        const user = await UserModel.findById(id);
        if (!user) return res.status(404).send("User not found");

        const task = user.tasks.id(taskId);
        if (!task) return res.status(404).send("Task not found");

        task.subtasks = req.body.subtasks;

        await user.save();

        res.status(200).json(task.subtasks);
    } catch (err) {
        console.log(err);
        res.status(500).send(`Failed to update subtasks: ${err.message}`);
    }
};
