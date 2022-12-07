const mongooseConn = require("mongoose");
const UserSchema = new mongooseConn.Schema({

    email: {
        type: String,
        required: [true, "Please provide an Email!"],
        unique: [true, "Email Exist"],
      },
    
      password: {
        type: String,
        required: [true, "Please provide a password!"],
        unique: false,
      },
})

module.exports = mongooseConn.model.Users || mongooseConn.model("users", UserSchema)
