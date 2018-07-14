const assert = require("assert");
const { expect } = require("chai");

const User = require("user");
describe("Reading users out of the database::", () => {
  let joe, maria, alex, zach;
  beforeEach(done => {
    alex = new User({ name: "alex" });
    maria = new User({ name: "maria" });
    joe = new User({ name: "joe" });
    zach = new User({ name: "zach" });
    Promise.all([joe.save(), maria.save(), alex.save(), zach.save()]).then(() =>
      done()
    );
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
  it.only("Can skip and limit the results set", done => {
    const collation = { locale: "en", strength: 2 };
    User.find({})
      .sort({ name: 1 })
      .skip(1)
      .limit(2)
      .then(users => {
        expect(users.length).to.equal(2);
        expect(users[0].name).to.equal("joe");
        expect(users[1].name).to.equal("maria");
        done();
      });
  });
});
