const UserRepository = require("../../repository/userRepository");

const initGetUsersController = (router) => {
  router.get("/api/users", async (req, res) => {
    const usersRepository = new UserRepository();

    const users = await usersRepository.getUsers();

    return res.json({
      users,
    });
  });
};

module.exports = initGetUsersController;
