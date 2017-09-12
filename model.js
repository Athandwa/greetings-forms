const mongoose = require('mongoose');

module.exports = function (mongoURL) {
  mongoose.connect(mongoURL);
  const greetSchema = mongoose.Schema({
    name: String,
    counter: Number
  })
  greetSchema.index({name: 1}, {unique: true})
  const Users = mongoose.model("Users", greetSchema)

  return {
    Users
  }
  // This saves the data to the database
  Users.save(function(err, results) {
    if (error) {
      console.error(error);
    }
    else {
      return results;
    }
  });
}
