const assert = require("assert");
const { expect } = require("chai");
const { assert: chaiAssert } = require("chai");
const User = require("user");

describe("Deleting a record", () => {
  let joe;
  beforeEach(done => {
    joe = new User({ name: "Joe" });
    joe.save().then(() => done());
  });

  it.only("removes a record using a model instance", done => {
    // Saves a user
    joe
      .remove()
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        //assert(user === null);
        chaiAssert.isNull(user, "Removed user is still in database");
        done();
      })
      .catch(err => {
        chaiAssert.fail(null, null, err);
        done(err);
      });
  });
});