
const expressJwt = require("express-jwt");

const tokenMiddleware = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: "auth",
});
module.exports = {tokenMiddleware }