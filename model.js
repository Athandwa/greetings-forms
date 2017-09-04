const mongoose = require('mongoose');

module.exports = function (mongoURL) {
  mongoose.connect(mongoURL);
  const greetSchema = mongoose.Schema({
    name: String
  })
  greetSchema.index({name: 1}, {unique: true})
  const Users = mongoose.model("Users", greetSchema)

  return {
    Users
  }
  //This saves the information you see within that Bee declaration
  Users.save(function(error) {
    if (error) {
      console.error(error);
    }
  });
}
