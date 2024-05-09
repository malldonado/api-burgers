// CreationError.js

class CreationError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = 400;
  }
}

module.exports = CreationError;
