const assert = require("assert");
const { expect } = require("chai");

const User = require("user");
describe("Reading users out of the database::", () => {
  let joe;
  beforeEach(done => {
    joe = new User({ name: "joe" });
    joe.save().then(() => done());
  });

  it("should find all users with a name of joe", done => {
    User.find({ name: "joe" }).then(users => {
      expect(users[0]._id.toString()).to.equal(joe._id.toString());
      done();
    });
  });
  it("find a user with a particular id", done => {
    var query = User.where({ _id: joe._id });
    query.findOne((err, user) => {
      if (err) done(err);
      expect(user.name).to.equal("joe");
      done();
    });
    // Alternative method
    // User.findOne({ _id: joe._id }).then(user => {
    // expect(user.name).to.equal("joe");
    // done();
    // });
  });
});
