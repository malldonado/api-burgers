const db = require("../db/models/index");
const NotFoundError = require('./errors/NotFoundError');
const CreationError = require('./errors/CreationError');
const UpdateError = require('./errors/UpdateError');
const DeleteError = require('./errors/DeleteError');

exports.getBurguers = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const limit = 10;
    const countBurgers = await db.Burguers.count();

    if (countBurgers === 0) {
      console.error("Error: No burgers found!");
      throw new NotFoundError('Burguers not found.');
    }

    const lastPage = Math.ceil(countBurgers / limit);
    const burgers = await db.Burguers.findAll({
      attributes: [
        "id",
        "name",
        "description",
        "ingredients",
        "price",
        "image_url",
      ],
      order: [["id", "ASC"]],
      offset: Number(page * limit - limit),
      limit: limit,
    });

    const pagination = {
      path: "/burgers",
      page,
      prev_page_url: page - 1 >= 1 ? page - 1 : false,
      next_page_url: Number(page) + 1 > lastPage ? lastPage : Number(page) + 1,
      lastPage,
      total: countBurgers,
    };

    res.json({ burgers, pagination });
  } catch (error) {
    console.error("Error fetching burgers:", error);
    return res.status(500).json({ message: "Error fetching burgers" });
  }
};

exports.getBurguersId = async (req, res) => {
  try {
    const burgerId = req.params.id;
    if (!burguerId) {
      throw new NotFoundError('Burguer not found.');
    }
    const burger = await db.Burguers.findByPk(burgerId, {
      attributes: [
        "id",
        "name",
        "description",
        "ingredients",
        "price",
        "image_url",
      ],
    });

    res.json({ burger });
  } catch (error) {
    console.error("Error fetching burger:", error);
    return res.status(500).json({ message: "Error fetching burger" });
  }
};

exports.postBurguersId = async (req, res) => {
  try {
    const burgerData = req.body;
    if (!burgerData) {
      throw new CreationError('Invalid data. Please provide name, type, and description.');
    }
    const newBurger = await db.Burguers.create(burgerData);
    console.log("Burger created successfully");
    res.json({
      message: "Burger created successfully",
      dataBurger: newBurger,
    });
  } catch (error) {
    console.error("Error adding burger:", error);
    return res.status(400).json({ message: error.message });
  }
};

exports.putBurguersId = async (req, res) => {
  try {
    const burgerId = req.params.id;
    const burgerData = req.body;
    
    if (!burgerId) {
      throw new UpdateError('Burguer ID not provided.');
    }

    const [updatedRowsCount] = await db.Burguers.update(burgerData, {
      where: { id: burgerId },
    });

    if (updatedRowsCount === 0) {
      console.error("Burger not found for update");
      return res.status(404).json({ message: "Burger not found for update" });
    }
    console.log("Burger updated successfully");
    res.json({ message: "Burger updated successfully" });
  } catch (error) {
    console.error("Error updating burger:", error);
    return res.status(400).json({ message: error.message });
  }
};

exports.deleteBurguersId = async (req, res) => {
  try {
    const burgerId = req.params.id;
    if (!burgerId) {
      throw new DeleteError('Burguer ID not provided.');
    }
    const deletedRowCount = await db.Burguers.destroy({
      where: { id: burgerId },
    });

    if (deletedRowCount === 0) {
      console.error("Burger not found for deletion");
      return res.status(404).json({ message: "Burger not found for deletion" });
    }

    console.log("Burger deleted successfully");
    res.json({ message: "Burger deleted successfully" });
  } catch (error) {
    console.error("Error deleting burger:", error);
    return res.status(500).json({ message: "Error deleting burger" });
  }
};
