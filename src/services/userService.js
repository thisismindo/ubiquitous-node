const userRepository = require("../data/userRepository");

const createUser = async (name) => {
  if (!name) {
    throw new Error("name is required.");
  }
  return await userRepository.createUser(name);
};

const getUsers = async () => await userRepository.getUsers();
const getUserById = async (id) => await userRepository.getUserById(id);
const updateUser = async (id, name) => await userRepository.updateUser(id, name);
const deleteUser = async (id) => await userRepository.deleteUser(id);

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };
