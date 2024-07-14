const apiResponseMessage = {
    UNEXPECTED: "Unexcepted error",
    REQUIRED_FRIENDID: "Friend id is required",
    RECORD_ALREADY_EXISTS: "Record already exists",
    SOMETHING: "Something went wrong",
    INVALID: "Invalid/Incomplete payload",
    ALREADY_FRIEND: "You are already friends.",
    ALREADY_SENT: "Friend request already sent.",
    ALREADY_RECIEVED: "Friend request already received, please accept.",
    SUCCESS: "Successfully Executed",
    LIMIT_EXCEEDED: "User has reached the friend request limit.",
    NOT_FOUND: {
        COMPETITION: "No Ongoing Competitions",
    },
    SELF_FRIEND: "Error!! User and friend request is same",
    SELF_COMPETETION: "Error!! User and Friend Request is same",
    UNAUTHORIZED: "Unauthorized",
    BAD_REQUEST: "Bad Request",
    INVALID_MIN_START_DATE: "Invalid min start date",
};

module.exports = apiResponseMessage;
