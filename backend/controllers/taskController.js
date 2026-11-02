const mongoose = require('mongoose');
const Task = require('../models/Task');

// Allowed enum values for validation
const VALID_PRIORITIES = ['low', 'medium', 'high'];
const VALID_STATUSES = ['todo', 'in_progress', 'done'];

// @desc    Create a new task
// @route   POST /tasks
const createTask = async (req, res, next) => {
  try {
    const { title, description, priority, status, dueDate } = req.body;

    // 1. Validate required title
    if (!title || title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Title is required',
      });
    }

    // 2. Validate priority if provided
    if (priority && !VALID_PRIORITIES.includes(priority)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid priority. Allowed values: low, medium, high',
      });
    }

    // 3. Validate status if provided
    if (status && !VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Allowed values: todo, in_progress, done',
      });
    }

    // 4. Validate dueDate format if provided
    if (dueDate && isNaN(Date.parse(dueDate))) {
      return res.status(400).json({
        success: false,
        message: 'Invalid due date format',
      });
    }

    // 5. Create task document in database
    const task = await Task.create({
      title: title.trim(),
      description: description ? description.trim() : '',
      priority: priority || 'medium',
      status: status || 'todo',
      dueDate: dueDate || null,
    });

    res.status(201).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all tasks (with status filtering and sorting)
// @route   GET /tasks
const getTasks = async (req, res, next) => {
  try {
    const { status, sortBy, order } = req.query;

    // 1. Build filter object for status
    const filter = {};
    if (status) {
      if (!VALID_STATUSES.includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid status filter. Allowed values: todo, in_progress, done',
        });
      }
      filter.status = status;
    }

    // 2. Handle sorting
    let tasks;

    if (sortBy === 'priority') {
      // Fetch matching tasks first
      tasks = await Task.find(filter);

      // Rank order: high (1) > medium (2) > low (3)
      const priorityRank = { high: 1, medium: 2, low: 3 };
      const sortDirection = order === 'desc' ? -1 : 1;

      tasks.sort((a, b) => {
        const rankA = priorityRank[a.priority] || 99;
        const rankB = priorityRank[b.priority] || 99;
        return (rankA - rankB) * sortDirection;
      });
    } else if (sortBy === 'dueDate') {
      // Sort by due date (1 for ascending, -1 for descending)
      const sortOrder = order === 'desc' ? -1 : 1;
      tasks = await Task.find(filter).sort({ dueDate: sortOrder });
    } else {
      // Default: Newest tasks first
      tasks = await Task.find(filter).sort({ createdAt: -1 });
    }

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single task by ID
// @route   GET /tasks/:id
const getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid task ID format',
      });
    }

    const task = await Task.findById(id);

    // Return 404 if task not found
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update any task field
// @route   PUT /tasks/:id
const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, priority, status, dueDate } = req.body;

    // 1. Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid task ID format',
      });
    }

    // 2. Validate title if provided
    if (title !== undefined && title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Title cannot be empty',
      });
    }

    // 3. Validate priority if provided
    if (priority && !VALID_PRIORITIES.includes(priority)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid priority. Allowed values: low, medium, high',
      });
    }

    // 4. Validate status if provided
    if (status && !VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Allowed values: todo, in_progress, done',
      });
    }

    // 5. Validate dueDate if provided
    if (dueDate && isNaN(Date.parse(dueDate))) {
      return res.status(400).json({
        success: false,
        message: 'Invalid due date format',
      });
    }

    // 6. Find and update the task
    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
      returnDocument: 'after', // Return updated document (Mongoose 8+ standard)
      runValidators: true,
    });

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    res.status(200).json({
      success: true,
      data: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a task by ID
// @route   DELETE /tasks/:id
const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid task ID format',
      });
    }

    const task = await Task.findByIdAndDelete(id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Task not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
};
