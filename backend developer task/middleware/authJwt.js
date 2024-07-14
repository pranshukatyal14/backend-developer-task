const axios = require("axios");
// var config = require("../config/index")(process.env.NODE_ENV);
var config = require("../config/index");


const GENERAL_UTILs = require("../utils/general");
const statusCodes = require("../utils/errorBase/httpStatusCodes");
const responseMessages = require("../utils/errorBase/apiResponseMessage");
const Api401Error = require("../utils/errorBase/api401Error");

auth = async (req, res, next) => {
    try {
        const token = req.header("User-Auth-Token");
        const access_token = req.header("access-token");
        const wearable_type = req.header("wearable-type") || "";
        if (access_token) {
            const user = await axios.get(config.SERVICE.AUTH_V2_URL + "/auth_v2/auth/user", { headers: { "access-token": access_token, "wearable-type": wearable_type } });
            req.user = user.data.data;
            next();
        }
        if (token) {
            const user = await axios.get(config.SERVICE.AUTH_BASE_URL + "/auth/token", { headers: { "User-Auth-Token": token } });
            if (GENERAL_UTILs.isEmpty(user)) {
                throw new Api401Error(responseMessages.UNAUTHORIZED);
            }
            req.user = user.data.data;
            next();
        }
        if (!token && !access_token) {
            throw new Api401Error(responseMessages.UNAUTHORIZED);
        }
    } catch (error) {
        if (error.code === "ECONNREFUSED") {
            error.message = "Auth service unavailable";
            error.statusCode = 401;
        }
        next(error);
    }
};

auth_detail = async (req, res, next) => {
    try {
        const token = req.header("User-Auth-Token");
        const access_token = req.header("access-token");
        const wearable_type = req.header("wearable-type") || "";
        if (access_token) {
            const user = await axios.get(config.SERVICE.AUTH_V2_URL + "/auth_v2/auth/detail/user", { headers: { "access-token": access_token, "wearable-type": wearable_type } });
            req.user = user.data.data;
        }
        if (token) {
            const user = await axios.get(config.SERVICE.AUTH_BASE_URL + "/auth/token", { headers: { "User-Auth-Token": token } });
            if (GENERAL_UTILs.isEmpty(user)) {
                throw new Api401Error(responseMessages.UNAUTHORIZED);
            }
            req.user = user.data.data;
        }
        if (!token && !access_token) {
            throw new Api401Error(responseMessages.UNAUTHORIZED);
        }
        next();
    } catch (error) {
        if (error.code === "ECONNREFUSED") {
            error.message = "Auth service unavailable";
            error.statusCode = 401;
        }
        next(error);
    }
};

deviceAuth = async (req, res, next) => {
    try {
        const token = req.header("User-Auth-Token");
        const deviceToken = req.header("Device-External-Id");
        const access_token = req.header("access-token");
        const wearable_type = req.header("wearable-type") || "";
        if (access_token) {
            const response = await axios.get(config.AUTH_V2_URL + "/auth_v2/auth/device", { headers: { "access-token": access_token, "wearable-type": wearable_type } });
            req.userDevice = response.data.data;
        }
        if (token) {
            const headers = {
                "User-Auth-Token": token != undefined ? token : "",
                "Device-External-Id": deviceToken != undefined ? deviceToken : "",
            };
            const userDevice = await axios.get(config.SERVICE.AUTH_BASE_URL + "/auth/device_token", { headers });

            if (GENERAL_UTILs.isEmpty(userDevice)) {
                throw new Api401Error(responseMessages.UNAUTHORIZED);
            }
            req.userDevice = userDevice.data.data;
        }
        if (!token && !access_token) {
            throw new Api401Error(responseMessages.UNAUTHORIZED);
        }
        next();
    } catch (error) {
        if (error.code === "ECONNREFUSED") {
            error.message = "Auth service unavailable";
            error.statusCode = 401;
        }
        next(error);
    }
};

verifyKey = async (req, res, next) => {
    try {
        const { headers } = req;
        const api_key = headers["api-key"];
        // let api_key = req.headers.api_key || req.body.api_key;
        // console.log(api_key);
        if (!api_key) {
            return res.status(404).send({
                // code: errorUtils.NO_API_KEY_ERROR.code,
                success: false,
                message: "Api Key is not available.",
            });
        } else {
            if (config.apikey.internal == api_key) {
                next();
            } else {
                return res.status(200).send({
                    // code: errorUtils.INVALID_API_KEY_ERROR.code,
                    success: false,
                    message: "Api Key is not valid !",
                });
            }
        }
    } catch (e) {
        res.status(200).send({
            success: false,
            error: e.stack,
        });
    }
};

const authJwt = {
    auth,
    deviceAuth,
    auth_detail,
    verifyKey,
};

module.exports = authJwt;
