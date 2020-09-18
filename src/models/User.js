const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
  name: String,
  link: String,
});

const UserModel = mongoose.model("User", UsersSchema);

module.exports = {
  userSchema: UsersSchema,
  userModel: UserModel,
};
