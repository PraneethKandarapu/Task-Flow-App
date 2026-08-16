const AppError = require("../../utils/AppError");
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

const getTasks = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { status, priority, sort, page, limit } = req.query;

    const { tasks, totalTasks } = await taskService.getTasks(
      userId,
      status,
      priority,
      sort,
      page,
      limit,
    );
    const totalPages = Math.ceil(totalTasks / limit);

    res.status(200).json({
      success: true,
      tasks,
      pagination: {
        totalTasks,
        totalPages,
        currentPage: page,
        limit: limit,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.userId;
    const task = await taskService.getTaskById(taskId, userId);
    if (!task) {
      throw new AppError("Task not found", 404);
    }
    res.status(200).json({
      success: true,
      task,
    });
  } catch (err) {
    next(err);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.userId;
    const updateData = req.body;
    const task = await taskService.updateTask(taskId, userId, updateData);
    if (!task) {
      throw new AppError("Task not found", 404);
    }
    res.status(200).json({
      success: true,
      task,
    });
  } catch (err) {
    next(err);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.userId;
    const task = await taskService.deleteTask(taskId, userId);
    if (!task) {
      throw new AppError("Task not found", 404);
    }
    res.status(204).json({
      success: true,
      task,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask };
