const cds = require("@sap/cds");
const enhanceUser = require("./middlewares/UserMiddleware");
const logger = cds.log("Server.js");

cds.middlewares.before = [
    cds.middlewares.context(),
    cds.middlewares.trace(),
    cds.middlewares.auth(),
    function ctx_user(_, __, next) {
        enhanceUser().then(() => {
            next();
        }
        ).catch((err) => {
            logger.error("Error in enhanceUser: ", err);
            next();
        });
    },
    cds.middlewares.ctx_model()
]

module.exports = cds.server;