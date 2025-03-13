using { userModel } from '../db/user-schema';

 @auth
service UserService @(requires : 'authenticated-user'){
  entity Users as projection on userModel.Users;
}