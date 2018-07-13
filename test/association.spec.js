const assert = require("assert");
const { expect } = require("chai");
const User = require("user");
const Comment = require("comment");
const BlogPost = require("blogPost");

describe("Associations::", () => {
  let joe, blogPost, comment;
  beforeEach(done => {
    joe = new User({ name: "Joe" });
    blogPost = new BlogPost({
      title: "JS is Great",
      content: "Yep it really is"
    });
    comment = new Comment({ content: "Congrats on great post" });
    joe.blogPosts.push(blogPost);
    blogPost.comments.push(comment);
    comment.author = joe;
    Promise.all([joe.save(), blogPost.save(), comment.save()])
      .then(() => done())
      .catch(err => done(err));
  });

  it("Should save a relation between a user and a blogpost", done => {
    User.findOne({ name: "Joe" })
      .populate("blogPosts")
      .then(user => {
        // console.log(user);
        assert(user.blogPosts[0].title === "JS is Great");
        done();
      });
  });
  it("Should save a full relation graph", done => {
    User.findOne({ name: "Joe" })
      .populate({
        path: "blogPosts",
        populate: { path: "comments", model: "comment" }
      })
      .then(user => {
        console.log(user.blogPosts[0].comments[0].content);
        assert(
          user.blogPosts[0].comments[0].content === "Congrats on great post"
        );
        done();
      });
  });
});
