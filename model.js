const mongoose = require('mongoose');

module.exports = function (mongoUrl) {
  mongoose.connect(mongoUrl);
  const greetSchema = mongoose.Schema({
    name: String
  })
  greetSchema.index({name: 1}, {unique: true})
  const Users = mongoose.model("Users", greetSchema)

  return {
    Users
  }
}
