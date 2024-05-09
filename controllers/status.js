const Status = require("../db/models/status");
const NotFoundError = require('./errors/NotFoundError');
const CreationError = require('./errors/CreationError');
const UpdateError = require('./errors/UpdateError');
const DeleteError = require('./errors/DeleteError');

exports.getStatus = async (req, res) => {
  try {
    const status = await Status.findAll();
    if (!status) {
      throw new NotFoundError('Status not found.');
    }
    console.log("Status fetched successfully");
    res.status(200).json(status);
  } catch (error) {
    console.error("Error fetching status:", error);
    res.status(500).json({ message: "Error fetching status." });
  }
}

exports.postStatus = async (req, res) => {
  router.post('/status', async (req, res) => {
    try {
      const newStatus = await Status.create(req.body);
      if (!newStatus) {
        throw new CreationError('Invalid data.');
      }
      console.log("New status added");
      res.status(201).json(newStatus);
    } catch (error) {
      console.error("Error adding status:", error);
      res.status(500).json({ message: "Error adding status." });
    }
  });
}

exports.putStatusId = async (req, res) => {
  try {
    const statusId = req.params.id;
    if (!statusId) {
      throw new UpdateError('Status ID not provided.');
    }
    const [updatedCount] = await Status.update(req.body, {
      where: { id: statusId }
    });
    if (updatedCount === 0) {
      console.error("Status not found for update");
      return res.status(404).json({ message: "Status not found." });
    }
    console.log("Status updated successfully");
    res.status(200).json({ message: "Status updated successfully." });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ message: "Error updating status." });
  }
}

exports.deleteStatusId = async (req, res) => {
  try {
    const statusId = req.params.id;
    if (!statusId) {
      throw new DeleteError('Status ID not provided.');
    }
    const deletedCount = await Status.destroy({
      where: { id: statusId }
    });
    if (deletedCount === 0) {
      console.error("Status not found for deletion");
      return res.status(404).json({ message: "Status not found." });
    }
    console.log("Status deleted successfully");
    res.status(200).json({ message: "Status deleted successfully." });
  } catch (error) {
    console.error("Error deleting status:", error);
    res.status(500).json({ message: "Error deleting status." });
  }
}