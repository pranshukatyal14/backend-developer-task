const validationHandler = (config) => (req, res, next) => {
    try {
        let request = ["params", "body", "query"];
        let errors = [];
        const acceptedKeys = config.map((item) => item.key);
        const incomingKeys = [];
        for (let i = 0; i < request.length; i++) {
            Object.keys(req[request[i]]).length !== 0 &&
                incomingKeys.push(...Object.keys(req[request[i]]));
        }

        // CHECK ANY EXCESSIVE DATA FROM REQUEST.
        const excessiveKey = excessiveKeyHandler(incomingKeys, acceptedKeys);
        excessiveKey.length &&
            errors.push({
                message: "additional key detected",
                keys: excessiveKey,
            });

        errors.length && next({ errors });

        // CHECK FOR REQUIRED DATA
        let requiredFields = [];
        for (let i = 0; i < config.length; i++) {
            let curr = config[i];
            if (curr?.required && !req[curr.where][curr.key])
                requiredFields.push(curr.key);
        }
        requiredFields.length &&
            errors.push({ message: "Required fields", keys: requiredFields });
        errors.length && next({ errors });

        // CHECK DATA TYPE
        let invalidDataType = [];
        for (let i = 0; i < config.length; i++) {
            let curr = config[i];
            if (
                curr?.valueType === typeof JSON.parse(req[curr.where][curr.key])
            )
                invalidDataType.push(curr.key);
        }
        invalidDataType.length &&
            errors.push({ message: "Required fields", keys: invalidDataType });
        errors.length && next({ errors });

        // CHECK FOR ENUMS
        let invalidValue = [];
        for (let i = 0; i < config.length; i++) {
            let curr = config[i];
            if (curr?.enums && curr.enums.includes(req[curr.where][curr.key]))
                invalidValue.push(curr.key);
        }
        invalidValue.length &&
            errors.push({ message: "Required fields", keys: invalidValue });
        errors.length && next({ errors });

        // IF NO ERRORS MOVE TO NEXT MIDDLEWARE
        next();
    } catch (error) {
        next(error);
    }
};

const excessiveKeyHandler = (incomingKeys, acceptedKeys) => {
    let excessiveKey = [];
    if (incomingKeys.length > acceptedKeys.length) {
        excessiveKey = incomingKeys.filter(
            (item) => !acceptedKeys.includes(item)
        );
    }
    return excessiveKey;
};

module.exports = {
    validationHandler,
};
