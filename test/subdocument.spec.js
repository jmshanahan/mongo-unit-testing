const assert = require("assert");
const { expect, assert: chaiAssert } = require("chai");
const User = require("user");

describe("Subdocuments::", () => {
  it("Can create a subdocument", done => {
    const title = "Post Title";
    const joe = new User({ name: "Joe", posts: [{ title }] });
    joe
      .save()
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        assert(user.posts[0].title === title);
        expect(user.posts[0].title).to.equal(title);
        done();
      })
      .catch(err => done(err));
  });
  it("Should add subdocuments to an existing record", done => {
    const title = "New Title";
    const joe = new User({ name: "Joe", posts: [] });
    joe
      .save()
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        user.posts.push({ title });
        return user.save();
      })
      .then(user => User.findOne({ name: "Joe" }))
      .then(user => {
        assert(user.posts[0].title === title);
        expect(user.posts[0].title).to.equal(title);
        done();
      })
      .catch(err => done(err));
  });
  it("Can remove an existing subdocument", done => {
    const title = "New Title";
    const joe = new User({ name: "Joe", posts: [{ title }] });
    joe
      .save()
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => user.save(user.posts[0].remove()))
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        assert(user.posts.length === 0);
        done();
      })
      .catch(err => done(err));
  });
});
