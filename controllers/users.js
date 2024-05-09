const db = require("../db/models/index");
const NotFoundError = require('./errors/NotFoundError');
const CreationError = require('./errors/CreationError');
const UpdateError = require('./errors/UpdateError');
const DeleteError = require('./errors/DeleteError');

exports.getUsers = async (req, res) => {
  const { page = 1 } = req.query;
  const limit = 10;
  let lastPage = 1;

  const countUser = await db.Users.count();
  if (!countUser) {
    throw new NotFoundError('Users not found.');
  }

  if (countUser !== 0) {
    lastPage = Math.ceil(countUser / limit);
  } else {
    return res.status(400).json({
      message: "Error: No users found!"
    });
  }

  try {
    const users = await db.Users.findAll({
      attributes: ['id', 'name', 'email'],
      order: [["id", "ASC"]],
      offset: Number((page * limit) - limit),
      limit: limit
    });

    if (users) {
      const pagination = {
        path: '/users',
        page,
        prev_page_url: (page) - 1 >= 1 ? page - 1 : false,
        next_page_url: Number(page) + Number(1) > lastPage ? lastPage : Number(page) + Number(1),
        lastPage,
        total: countUser,
      }

      res.json({
        users: users,
        pagination: pagination
      });
    } else {
      return res.status(400).json({
        message: "Error: Users not found!",
      });
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users." });
  }
}

exports.postUsers = async (req, res) => {
  try {
    const data = req.body;
    const dataUser = await db.Users.create(data);
    if (!dataUser) {
      throw new CreationError('Invalid data.');
    }
    res.json({
      message: "User registered successfully!",
      dataUser: dataUser,
    });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ message: error.message });
  }
}


exports.getUsersId = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new NotFoundError('User not found.');
  }
  try {
    const user = await db.Users.findOne({
      attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
      where: {
        id: id
      }
    });

    if (user) {
      return res.json({
        user: user
      })
    } else {
      return res.status(400).json({
        message: "Error: no user found!"
      });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Error fetching user." });
  }
}

exports.deleteUsersId = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new DeleteError('User ID not provided.');
  }
  try {
    const deletedCount = await db.Users.destroy({
      where: {
        id: id
      }
    });

    if (deletedCount !== 0) {
      res.json({
        message: 'User deleted successfully!'
      });
    } else {
      return res.status(400).json({
        message: "Error: user not deleted!"
      });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user." });
  }
}

exports.putUsersId = async (req, res) => {
  try {
    const data = req.body;
    if (!data) {
      throw new UpdateError('User ID not provided.');
    }
    await db.Users.update(data, {
      where: {
        id: data.id
      }
    });

    return res.json({
      message: 'User updated successfully!'
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Error updating user." });
  }
}

