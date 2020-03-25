'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class InvaildAccessException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle (error, {response}) {
    return response.status(403).json({
      error: "invaild access to resource",
    });
  }
}

module.exports = InvaildAccessException
