const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = require("post");
const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    validate: {
      validator: name => name.length > 2,
      message: "Name must be longer than 2 charcters."
    }
  },
  posts: [PostSchema],
  likes: { type: Number },
  blogPosts: [{ type: Schema.Types.ObjectId, ref: "blogPost" }]
});
UserSchema.virtual("postCount").get(function() {
  return this.posts.length;
});

UserSchema.pre("remove", function(next) {
  const BlogPost = mongoose.model("blogPost");
  BlogPost.remove({ _id: { $in: this.blogPosts } }).then(() => next());
});

module.exports = User = mongoose.model("user", UserSchema);
