const Discount = require("../db/models/discount");
const NotFoundError = require('./errors/NotFoundError');
const CreationError = require('./errors/CreationError');
const UpdateError = require('./errors/UpdateError');
const DeleteError = require('./errors/DeleteError');

exports.getDiscount = async (req, res) => {
  try {
    const discounts = await Discount.findAll();
    if (!discounts) {
      throw new NotFoundError('Discount not found.');
    }
    console.log("Discounts fetched successfully");
    res.status(200).json(discounts);
  } catch (error) {
    console.error("Error fetching discounts:", error);
    res.status(500).json({ message: "Error fetching discounts." });
  }
}

exports.postDiscount = async (req, res) => {
  try {
    const newDiscount = await Discount.create(req.body);
    if (!newDiscount) {
      throw new CreationError('Invalid data.');
    }
    console.log("Discount added successfully");
    res.status(201).json(newDiscount);
  } catch (error) {
    console.error("Error adding discount:", error);
    res.status(500).json({ message: "Error adding discount." });
  }
}

exports.putDiscountId = async (req, res) => {
  try {
    const discountId = req.params.id;
    if (!discountId) {
      throw new UpdateError('Discount ID not provided.');
    }
    const [updatedCount] = await Discount.update(req.body, {
      where: { id: discountId }
    });
    if (updatedCount === 0) {
      console.error("Discount not found for update");
      return res.status(404).json({ message: "Discount not found for update." });
    }
    console.log("Discount updated successfully");
    res.status(200).json({ message: "Discount updated successfully." });
  } catch (error) {
    console.error("Error updating discount:", error);
    res.status(500).json({ message: "Error updating discount." });
  }
}

exports.deleteDiscountId = async (req, res) => {
  try {
    const discountId = req.params.id;
    if (!discountId) {
      throw new DeleteError('Discount ID not provided.');
    }
    const deletedCount = await Discount.destroy({
      where: { id: discountId }
    });
    if (deletedCount === 0) {
      console.error("Discount not found for deletion");
      return res.status(404).json({ message: "Discount not found for deletion." });
    }
    console.log("Discount deleted successfully");
    res.status(200).json({ message: "Discount deleted successfully." });
  } catch (error) {
    console.error("Error deleting discount:", error);
    res.status(500).json({ message: "Error deleting discount." });
  }
}