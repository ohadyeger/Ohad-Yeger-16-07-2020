const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const emailSchema = new Schema({
  _id: Schema.Types.ObjectId,
  senderId: Number,
  receiverId: Number,
  message: String,
  subject: String,
  creationDate: Date,
});
module.exports = mongoose.model("Email", emailSchema);
