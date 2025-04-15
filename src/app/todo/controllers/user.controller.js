import User from "../models/user.schema";

// Get all Users
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, { username: 1, email: 1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};

export default getUsers;
