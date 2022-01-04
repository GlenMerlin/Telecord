import mongoose = require("mongoose");

export const UsersSchema = new mongoose.Schema({
	name: String,
	link: String,
});

export const UserModel = mongoose.model("User", UsersSchema);

module.exports = {
	userSchema: UsersSchema,
	UserModel: UserModel,
};
