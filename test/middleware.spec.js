const assert = require("assert");
const { expect } = require("chai");
const User = require("user");
const BlogPost = require("blogPost");

describe("Middleware::", () => {
  let joe, blogPost;
  beforeEach(done => {
    joe = new User({ name: "Joe" });
    blogPost = new BlogPost({
      title: "JS is Great",
      content: "Yep it really is"
    });
    joe.blogPosts.push(blogPost);
    Promise.all([joe.save(), blogPost.save()])
      .then(() => done())
      .catch(err => done(err));
  });
  it("users clean up dangling blogposts on remove", done => {
    joe
      .remove()
      .then(() => BlogPost.count())
      .then(count => {
        assert(count === 0);
        done();
      });
  });
});
