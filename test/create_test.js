const assert = require("assert");
const { expect } = require("chai");
const User = require("user");

describe("Creating records", () => {
  it("saves a user", done => {
    // Saves a user
    const joe = new User({ name: "Joe" });
    joe.save().then(() => {
      // assert that joe has been saved.
      //assert(!joe.isNew);
      expect(joe.isNew).to.be.false;
      done();
    });
  });
});
