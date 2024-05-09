const Comment = require("../db/models/comments");
const NotFoundError = require('./errors/NotFoundError');
const CreationError = require('./errors/CreationError');
const UpdateError = require('./errors/UpdateError');
const DeleteError = require('./errors/DeleteError');

exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.findAll();
    if (!comments) {
      throw new NotFoundError('Comments not found.');
    }
    console.log("Comments fetched successfully");
    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Error fetching comments." });
  }
}

exports.getCommentsId = async (req, res) => {
  try {
    const commentId = req.params.id;
    if (!commentId) {
      console.error("Comment not found");
      throw new NotFoundError('Comment not found.');
    }
    const comment = await Comment.findByPk(commentId);
    console.log("Comment fetched successfully");
    res.status(200).json(comment);
  } catch (error) {
    console.error("Error fetching comment:", error);
    res.status(500).json({ message: "Error fetching comment." });
  }
}

exports.postComments = async (req, res) => {
  try {
    const { text } = req.body;
    const newComment = await Comment.create({ text });
    if (!newComment) {
      throw new CreationError('Invalid data');
    }
    console.log("Comment created successfully");
    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ message: "Error creating comment." });
  }
}

exports.putCommentsId = async (req, res) => {
  try {
    const commentId = req.params.id;
    if (!commentId) {
      throw new UpdateError('Comment ID not provided.');
    }
    const [updatedCount] = await Comment.update(req.body, {
      where: { id: commentId }
    });
    if (updatedCount === 0) {
      console.error("Comment not found for update");
      return res.status(404).json({ message: "Comment not found for update." });
    }
    console.log("Comment updated successfully");
    res.status(200).json({ message: "Comment updated successfully." });
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({ message: "Error updating comment." });
  }
}

exports.deleteCommentsId = async (req, res) => {
  try {
    const commentId = req.params.id;
    if (!commentId) {
      throw new DeleteError('Comment ID not provided.');
    }
    const deletedCount = await Comment.destroy({
      where: { id: commentId }
    });
    if (deletedCount === 0) {
      console.error("Comment not found for deletion");
      return res.status(404).json({ message: "Comment not found for deletion." });
    }
    console.log("Comment deleted successfully");
    res.status(200).json({ message: "Comment deleted successfully." });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Error deleting comment." });
  }
}
