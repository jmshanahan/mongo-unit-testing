const assert = require("assert");
const { expect, assert: chaiAssert } = require("chai");
const User = require("user");

describe("Validating records::", () => {
  it.only("requires a user name", () => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    expect(message).to.equal("Name is required");
  });
  it.only("requires a user name longer than 2 characters", () => {
    const user = new User({ name: "Al" });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    expect(message).to.equal("Name must be longer than 2 charcters.");
  });
  it.only("Disallowes invalid records from being saved", () => {
    const user = new User({ name: "Al" });
    user.save().catch(validationResult => {
      const { message } = validationResult.errors.name;
      expect(message).to.equal("Name must be longer than 2 charcters.");
    });
  });
});
