//what should the app do
const Task = require("./task.model");

const createTask = async (taskData) => {
  const task = await Task.create(taskData);
  return task;
};

module.exports = {
  createTask,
};
