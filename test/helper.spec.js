const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
// ES6 implementation of promise. Another one is Bluebird
mongoose.Promise = global.Promise;
before(done => {
  mongoose
    .connect(
      "mongodb://localhost:27017/user_test",
      { useMongoClient: true }
    )
    .then(() => done())
    .catch(err => console.log(err));
});
beforeEach(done => {
  mongoose.connection.collections["users"].drop(() => {
    done();
  });
  //   // const { users, comments, blogposts } = mongoose.connection.collections;
  //   // users.drop(() => {
  //   //   comments.drop(() => {
  //   //     blogposts.drop(() => {
  //   //       // Ready to run the next test
  //   //       done();
  //   //     });
  //   //   });
  //   // });
});
