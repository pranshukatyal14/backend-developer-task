const httpStatusCodes = require('./httpStatusCodes')
const BaseError = require('./baseError')

class ApiCustomResponse extends BaseError {
    constructor (
        name,
        statusCode = httpStatusCodes.NOT_FOUND,
        description = 'Not found.',
        isOperational = true
    ) {
        super(name, statusCode, isOperational, description)
    }
}

module.exports = ApiCustomResponse
