const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: { type: String },
  author: { type: Schema.Types.ObjectId, ref: "user" }
});
module.exports = Comment = mongoose.model("comment", CommentSchema);
