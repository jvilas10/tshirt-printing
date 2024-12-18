const userModel = require('../models/userModel');

const getUsers = (req, res) => {
  const users = userModel.getAllUsers();
  res.status(200).json(users);
};

const getUser = (req, res) => {
  const user = userModel.getUserById(parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json(user);
};

const createUser = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }
  const newUser = userModel.createUser(name);
  res.status(201).json(newUser);
};

const updateUser = (req, res) => {
  const { name } = req.body;
  const user = userModel.updateUser(parseInt(req.params.id), name);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(200).json(user);
};

const deleteUser = (req, res) => {
  const user = userModel.deleteUser(parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.status(204).send();
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
};
