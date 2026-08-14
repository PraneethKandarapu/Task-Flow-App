const taskService = require("./task.service");

const createTask = async (req, res, next) => {
  try {
    // recieve taskData from req using spread operator
    const taskData = {
      ...req.body,
      createdBy: req.user.userId,
    };

    // call the service
    const task = await taskService.createTask(taskData);
    res.status(201).json({
      success: true,
      task,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { createTask };
