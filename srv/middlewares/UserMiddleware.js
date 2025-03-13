const cds = require("@sap/cds");
const { loggers } = require("@sap/cds/lib/log/cds-log");
module.exports = async function enhanceUser() {
    let userInfo = await getUserInfoFromCacheOrDb(cds.context.user.id);
    const currentUser = cds.context.user;


    cds.context.user.attr = {
        ...currentUser.attr,
        name: userInfo?.name,
        email: userInfo?.email
    }
}

async function getUserInfoFromCacheOrDb(userId) {
    const ttl = 600000; // 10 minutes in milliseconds

    const db = await cds.connect.to("db");
    let query = SELECT
        .one
        .from(db.entities("userModel").Users)
        .where({ ID: userId });

    const cache = await cds.connect.to("user-login-caching");

    let resp = await cache.run(query, db, {
        ttl,
        key: { value: userId }
    });

    return resp;
}