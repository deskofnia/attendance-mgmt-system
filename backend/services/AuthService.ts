const User = require("./models/userModel");


class AuthServices {
    async login(request, response) {
        const loginData = await User.findOne({ email: request.body.email })

        // if email exists
        .then((user:any) => {
          // compare the password entered and the hashed password found
          bcrypt
            .compare(request.body.password, user.password)
    
            // if the passwords match
            .then((passwordCheck:any) => {
    
              // check if password matches
              if(!passwordCheck) {
                return response.status(400).send({
                  message: "Passwords does not match",
                  // error,
                });
              }
    
              //   create JWT token
              const token = jwt.sign(
                {
                  userId: user._id,
                  userEmail: user.email,
                },
                "RANDOM-TOKEN",
                { expiresIn: "24h" }
              );
    
              //   return success response
              response.status(200).send({
                message: "Login Successful",
                email: user.email,
                token,
              });
            })
            // catch error if password does not match
            .catch((error:any) => {
              response.status(400).send({
                message: "Passwords does not match",
                error,
              });
            });
        })
        // catch error if email does not exist
        .catch((e:any) => {
          response.status(404).send({
            message: "Email not found",
            e,
          });
        });

        return loginData;
    }
}

export default new AuthServices();