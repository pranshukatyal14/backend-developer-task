
/**
 * @desc    Send any success response
 *
 * @param   {string} message
 * @param   {object | array} results
 * @param   {number} statusCode
 */

exports.success_v3 = (response = {}) => {
    return {
        success : true,
        data: response.data
    };
};


// New Success Response Because data key is added unnecessorily

exports.successRes = (response = {}) => {
    return {
        success : true,
        data : response
    }
}
