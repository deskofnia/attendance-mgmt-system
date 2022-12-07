const mongooseConn = require("mongoose");

const UserSchema = new mongooseConn.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
        unique: false,
      },
})

module.exports = mongooseConn.model("users", UserSchema)
