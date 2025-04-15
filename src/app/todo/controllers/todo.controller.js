import Todo from "../models/todo.schema";
import User from "../models/user.schema";


// Create new Todo
const createTodo = async (req, res) => {
  try {
    const { title, description, priority, tags, assignedUsers } = req.body;
    const user = req.query.user;

    if (!title || !user) {
      return res.status(400).json({ message: "Title and user are required" });
    }

    const userExists = await User.findOne({ username: user });
    if (!userExists) return res.status(404).json({ message: "User not found" });

    const todo = new Todo({
      title,
      description,
      priority,
      tags,
      assignedUsers,
      user: userExists._id,
    });

    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: "Error creating todo", error });
  }
};

// Get all Todos with Filtering, Sorting, Pagination
const getTodos = async (req, res) => {
  try {
    const {
      user,
      page = 1,
      limit = 5,
      tag,
      priority,
      sortBy = "createdAt",
      order = "desc",
    } = req.query;

    const userDoc = await User.findOne({ username: user });
    if (!userDoc) return res.status(404).json({ message: "User not found" });

    const filter = { user: userDoc._id };
    if (tag) filter.tags = tag;
    if (priority) filter.priority = priority;

    const sortOrder = order === "asc" ? 1 : -1;

    const todos = await Todo.find(filter)
      .sort({ [sortBy]: sortOrder })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todos", error });
  }
};

// Get specific Todo
const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: "Error fetching todo", error });
  }
};

// Update Todo
const updateTodo = async (req, res) => {
  try {
    const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ message: "Todo not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: "Error updating todo", error });
  }
};

// Delete Todo
const deleteTodo = async (req, res) => {
  try {
    const deleted = await Todo.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Todo not found" });
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting todo", error });
  }
};

// Add Note
const addNote = async (req, res) => {
  try {
    const { content } = req.body;
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    todo.notes.push({ content, createdAt: new Date() });
    await todo.save();
    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: "Error adding note", error });
  }
};

// Export Todos (JSON only here; CSV can be added)
const exportTodos = async (req, res) => {
  try {
    const user = req.query.user;
    const userDoc = await User.findOne({ username: user });
    if (!userDoc) return res.status(404).json({ message: "User not found" });

    const todos = await Todo.find({ user: userDoc._id });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: "Error exporting todos", error });
  }
};

export {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
  addNote,
  exportTodos,
};
