// require database connection
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dbConnection = require("./db/db.config");
const bcrypt = require("bcrypt");
const User = require("./models/userModel");

console.log(User);
// execute database connection
dbConnection();

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));;
app.use(express.json());   //convert body into json

app.get("/", (req:any, res:any) => {
  res.json({ message: "Welcome to my application." });
});

// register endpoint
app.post("/register", (request:any, response:any) => {
    // hash the password
    bcrypt
      .hash(request.body.password, 10)
      .then((hashedPassword:any) => {
        // create a new user instance and collect the data
        const user = new User({
          email: request.body.email,
          password: hashedPassword,
        });
  
        // save the new user
        user
          .save()
          // return success if the new user is added to the database successfully
          .then((result:any) => {
            response.status(201).send({
              message: "User Created Successfully",
              result,
            });
          })
          // catch error if the new user wasn't added successfully to the database
          .catch((error:any) => {
            response.status(500).send({
              message: "Error creating user",
              error,
            });
          });
      })
      // catch error if the password hash isn't successful
      .catch((e:any) => {
        response.status(500).send({
          message: "Password was not hashed successfully",
          e,
        });
      });
});


// login endpoint
app.post("/login", (request:any, response:any) => {
  // check if email exists
  User.findOne({ email: request.body.email })

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
});

// free endpoint
app.get("/free-endpoint", (request:any, response:any) => {
  response.json({ message: "You are free to access me anytime" });
});

// authentication endpoint
app.get("/auth-endpoint", (request:any, response:any) => {
  response.json({ message: "You are authorized to access me" });
});

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}.`)
});