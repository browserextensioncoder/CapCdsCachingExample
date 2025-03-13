const cds = require('@sap/cds')
let logger = cds.log('AuthService')
module.exports = class UserService extends cds.ApplicationService { init() {

  const { Users } = this.entities;

  this.on(['READ'], Users, async (req) => {
    logger.log("check enhanced user attributes", req.user.attr);  
  });


  return super.init()
}}
