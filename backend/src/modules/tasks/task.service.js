//what should the app do
const Task = require("./task.model");

const createTask = async (taskData) => {
  const task = await Task.create(taskData);
  return task;
};

const getTasks = async (userId, status, priority, sort, page, limit) => {
  const query = {
    createdBy: userId,
  };
  //add status property to query if it exists
  if (status) {
    query.status = status;
  }
  //add priority property to query if it exists
  if (priority) {
    query.priority = priority;
  }
  let sortOption = {};
  if (sort === "dueDate") {
    sortOption.dueDate = 1;
  }
  if (sort === "-dueDate") {
    sortOption.dueDate = -1;
  }
  const skip = (page - 1) * limit;
  const tasks = await Task.find(query).sort(sortOption).skip(skip).limit(limit);
  const totalTasks = await Task.countDocuments(query);
  return {
    tasks,
    totalTasks,
  };
};

const getTaskById = async (taskId, userId) => {
  const task = await Task.findOne({
    _id: taskId,
    createdBy: userId,
  });
  return task;
};

const updateTask = async (taskId, userId, updateData) => {
  const task = await Task.findOneAndUpdate(
    {
      _id: taskId,
      createdBy: userId,
    },
    updateData,
    {
      new: true,
    },
  );
  return task;
};

const deleteTask = async (taskId, userId) => {
  const task = await Task.findOneAndDelete({
    _id: taskId,
    createdBy: userId,
  });
  return task;
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
