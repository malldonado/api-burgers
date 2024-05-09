const Menu = require("../db/models/menu");
const NotFoundError = require('./errors/NotFoundError');
const CreationError = require('./errors/CreationError');
const UpdateError = require('./errors/UpdateError');
const DeleteError = require('./errors/DeleteError');

exports.getMenu = async (req, res) => {
  try {
    const items = await Menu.findAll();
    if (!items) {
      throw new NotFoundError('Menu not found.');
    }
    console.log("Menu items fetched successfully");
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching menu items:", error);
    res.status(500).json({ message: "Error fetching menu items." });
  }
}

exports.postMenu = async (req, res) => {
  try {
    const newItem = await Menu.create(req.body);
    if (!newItem) {
      throw new CreationError('Invalid data.');
    }
    console.log("New item added to menu");
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error adding item to menu:", error);
    res.status(500).json({ message: "Error adding item to menu." });
  }
}

exports.putMenuId = async (req, res) => {
  try {
    const itemId = req.params.id;
    if (!itemId) {
      throw new UpdateError('Menu ID not provided.');
    }
    const [updatedCount] = await Menu.update(req.body, {
      where: { id: itemId }
    });
    if (updatedCount === 0) {
      console.error("Menu item not found for update");
      return res.status(404).json({ message: "Menu item not found." });
    }
    console.log("Menu item updated successfully");
    res.status(200).json({ message: "Menu item updated successfully." });
  } catch (error) {
    console.error("Error updating menu item:", error);
    res.status(500).json({ message: "Error updating menu item." });
  }
}

exports.deleteMenuId = async (req, res) => {
  try {
    const itemId = req.params.id;
    if (!itemId) {
      throw new DeleteError('Menu ID not provided.');
    }
    const deletedCount = await Menu.destroy({
      where: { id: itemId }
    });
    if (deletedCount === 0) {
      console.error("Menu item not found for deletion");
      return res.status(404).json({ message: "Menu item not found." });
    }
    console.log("Menu item deleted successfully");
    res.status(200).json({ message: "Menu item deleted successfully." });
  } catch (error) {
    console.error("Error deleting menu item:", error);
    res.status(500).json({ message: "Error deleting menu item." });
  }
}