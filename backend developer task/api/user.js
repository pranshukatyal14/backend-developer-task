const UserController = require("../controllers/user.controller");


module.exports = (app, options) => {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
        req.repo = options.repo;
        next();
    });

    app.get("/tasks/:userId",  UserController.getAllTasks);
    app.post('/tasks',UserController.createTask );
    app.put("/tasks/:taskId", UserController.updateTask);   
    app.get('/tasks/:taskId/subtasks', UserController.getSubtasks);
    app.put('/tasks/:taskId/subtasks', UserController.updateSubtasks);
    app.delete('/tasks/:taskId', UserController.deleteTask);
    app.get("/tasks/createUser",  UserController.createUser);

    };
