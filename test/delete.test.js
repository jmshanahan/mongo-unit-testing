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

  it("removes a record using a model instance", done => {
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
  it("class method remove", done => {
    User.remove({ name: "Joe" })
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        // assert(user === null);
        chaiAssert.isNull(user, "Removed user is still in database");
        done();
      })
      .catch(err => done(err));
  });
  it("class method findOneAndRemove", done => {
    User.findOneAndRemove({ name: "Joe" })
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        // assert(user === null);
        chaiAssert.isNull(user, "Removed user is still in database");
        done();
      })
      .catch(err => done(err));
  });
  it.only("class method findByIdAndRemove", done => {
    User.findByIdAndRemove(joe._id)
      .then(() => User.findByIdAndRemove(joe._id))
      .then(user => {
        // assert(user === null);
        chaiAssert.isNull(user, "Removed user is still in database");
        done();
      })
      .catch(err => done(err));
  });
});
