const User = require('../models/user');
const { errorHandler } = require("../helpers/dbErrHandler");
const jwt = require("jsonwebtoken");

exports.signup = (req, res) => {
    console.log("req.body", req.body);
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: errorHandler(err),
            });
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({
            user

        });
    }
    );
}

exports.login = (req, res) => {
    //find the user based on email
    const { email, password } = req.body;
    User.findOne({ email }, (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "User with that email does not exist. Please signup",
        });
      }
      if (!user.authenticate(password)) {
        return res.status(401).json({
          error: "Wrong password",
        });
      }
      //generate a token with user id and secret
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      //persist the token as 't' in cookie with expiry date
      res.cookie("token", token, { expire: new Date() + 7200 }); //2 hours
      //return response with user and token to frontend client
      const { _id, name, email, role } = user;
      return res.json({ token, user: { _id, name, email, role } });
    });
  };
    

  exports.logout = (req, res) => {
    res.clearCookie("token");
    res.json({ message: "logout successful" });
  };
  


  
//isAuth middleware
exports.isAuth = (req, res, next) => {
  let user=req.profile && req.auth && req.profile._id == req.auth._id
  if (!user) {
    return res.status(403).json({
      error: "Access denied (id) ",
    });
  }
  next();
} 


//is Admin middleware
exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "Admin resource! Access denied ",
    });
  }
  next();
}

  