'use strict'

const { LogicalException } = require('@adonisjs/generic-exceptions')

class InvalidNotExistException extends LogicalException {
  /**
   * Handle this exception by itself
   */
  handle(error, {response}) {
     response.status(404).json({
      error: 'The resouce is not Exist',
    })
   }
}

module.exports = InvalidNotExistException
