//what should the app do
const Task = require("./task.model");

const createTask = async (taskData) => {
  const task = await Task.create(taskData);
  return task;
};

const getTasks = async (userId) => {
  const tasks = await Task.find({
    createdBy: userId,
  });
  return tasks;
};
const getTaskById = async (taskId, userId) => {
  const task = await Task.findOne({
    _id: taskId,
    createdBy: userId,
  });
  return task;
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
};
