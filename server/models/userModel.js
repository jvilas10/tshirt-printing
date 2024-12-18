let users = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Doe' }
  ];
  
  const getAllUsers = () => {
    return users;
  };
  
  const getUserById = (id) => {
    return users.find(user => user.id === id);
  };
  
  const createUser = (name) => {
    const newUser = { id: users.length + 1, name };
    users.push(newUser);
    return newUser;
  };
  
  const updateUser = (id, name) => {
    const user = getUserById(id);
    if (user) {
      user.name = name;
      return user;
    }
    return null;
  };
  
  const deleteUser = (id) => {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
      const deletedUser = users.splice(index, 1);
      return deletedUser;
    }
    return null;
  };
  
  module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
  };
  