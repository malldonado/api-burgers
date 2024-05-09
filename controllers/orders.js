const Order = require("../db/models/orders");
const NotFoundError = require('./errors/NotFoundError');
const CreationError = require('./errors/CreationError');
const UpdateError = require('./errors/UpdateError');
const DeleteError = require('./errors/DeleteError');

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    if (!orders) {
      throw new NotFoundError('Orders not found.');
    }
    console.log("Orders fetched successfully");
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Error fetching orders." });
  }
}

exports.postOrders = async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    if (!newOrder) {
      throw new CreationError('Invalid data.');
    }
    console.log("New order added");
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error adding order:", error);
    res.status(500).json({ message: "Error adding order." });
  }
}

exports.putOrdersId = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      throw new UpdateError('Order ID not provided.');
    }
    const [updatedCount] = await Order.update(req.body, {
      where: { id: orderId }
    });
    if (updatedCount === 0) {
      console.error("Order not found for update");
      return res.status(404).json({ message: "Order not found." });
    }
    console.log("Order updated successfully");
    res.status(200).json({ message: "Order updated successfully." });
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Error updating order." });
  }
}

exports.deleteOrdersId = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      throw new DeleteError('Order ID not provided.');
    }
    const deletedCount = await Order.destroy({
      where: { id: orderId }
    });
    if (deletedCount === 0) {
      console.error("Order not found for deletion");
      return res.status(404).json({ message: "Order not found." });
    }
    console.log("Order deleted successfully");
    res.status(200).json({ message: "Order deleted successfully." });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Error deleting order." });
  }
}