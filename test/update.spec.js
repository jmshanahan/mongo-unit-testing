const assert = require("assert");
const { expect, assert: chaiAssert } = require("chai");
const User = require("user");

describe("Updating records::", () => {
  let joe;
  beforeEach(done => {
    joe = new User({ name: "Joe", likes: 0 });
    joe
      .save()
      .then(() => done())
      .catch(err => done(err));
  });
  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then(users => {
        chaiAssert.isNotNull(users, "Find failed to return an array");
        chaiAssert.isArray(users, "Find failed to return an array");
        expect(users.length).to.equal(1, "More than one user returned");
        expect(users[0].name).to.equal("Alex");
        done();
      })
      .catch(err => done(err));
  }
  it("will set and save an document through an instance", done => {
    joe.set("name", "Alex");
    assertName(joe.save(), done);
  });
  it("will update a model instance", done => {
    assertName(joe.update({ name: "Alex" }), done);
  });
  it("Should update via a model class", done => {
    assertName(User.update({ name: "Joe" }, { name: "Alex" }), done);
  });
  it("Should update one record on a model class", done => {
    assertName(User.findOneAndUpdate({ name: "Joe" }, { name: "Alex" }), done);
  });
  it("Should update one record on a model class finding it with its ID", done => {
    assertName(User.findByIdAndUpdate(joe._id, { name: "Alex" }), done);
  });
  it("Should increment a users postcount by 1", done => {
    User.update({ name: "Joe" }, { $inc: { likes: 10 } })
      .then(() => User.findOne({ name: "Joe" }))
      .then(user => {
        expect(user.likes).to.equal(10);
        done();
      })
      .catch(err => done(err));
  });
});
