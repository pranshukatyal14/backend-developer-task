const BaseError = require("./baseError");

class Api401Error extends BaseError {
    constructor(description = "Unauthorized") {
        super(401, description);
    }
}

module.exports = Api401Error;
