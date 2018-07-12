const assert = require("assert");
const { expect, assert: chaiAssert } = require("chai");
const User = require("user");

describe("Virtual types::", () => {
  it("Returns the number of post counts", () => {
    const joe = new User({ name: "Joe", posts: [{ title: "PostTitle" }] });
    joe
      .save()
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        assert(user.postCount === 1);
      });
  });
});
