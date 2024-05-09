const Cart = require("../db/models/cart");
const NotFoundError = require('./errors/NotFoundError');
const CreationError = require('./errors/CreationError');
const UpdateError = require('./errors/UpdateError');
const DeleteError = require('./errors/DeleteError');

exports.getCart = async (req, res) => {
  try {
    const items = await Cart.findAll();
    if (!items) {
      throw new NotFoundError('Cart not found.');
    }
    console.log("Items retrieved successfully from cart");
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ message: "Error fetching cart items." });
  }
}

exports.postCart = async (req, res) => {
  try {
    const newItem = await Cart.create(req.body);
    if (!newItem) {
      throw new CreationError('Invalid data.');
    }
    console.log("Item added to cart successfully");
    res.status(201).json(newItem);
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ message: "Error adding item to cart." });
  }
}

exports.putCartId = async (req, res) => {
  try {
    const itemId = req.params.id;
    if (!itemId) {
      throw new UpdateError('Cart ID not provided.');
    }
    const [updatedCount] = await Cart.update(req.body, {
      where: { id: itemId }
    });
    if (updatedCount === 0) {
      console.error("Item not found in cart for update");
      return res.status(404).json({ message: "Item not found in cart for update." });
    }
    console.log("Item in cart updated successfully");
    res.status(200).json({ message: "Item in cart updated successfully." });
  } catch (error) {
    console.error("Error updating item in cart:", error);
    res.status(500).json({ message: "Error updating item in cart." });
  }
}

exports.deleteCartId = async (req, res) => {
  try {
    const itemId = req.params.id;
    if (!itemId) {
      throw new DeleteError('Cart ID not provided.');
    }
    const deletedCount = await Cart.destroy({
      where: { id: itemId }
    });
    if (deletedCount === 0) {
      console.error("Item not found in cart for deletion");
      return res.status(404).json({ message: "Item not found in cart for deletion." });
    }
    console.log("Item in cart deleted successfully");
    res.status(200).json({ message: "Item in cart deleted successfully." });
  } catch (error) {
    console.error("Error deleting item in cart:", error);
    res.status(500).json({ message: "Error deleting item in cart." });
  }
}
