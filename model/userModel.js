const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,

      //here Unique we using to match two email id's.
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
);

//Static signup function
userSchema.statics.signup = async (email, password) => {
  const exists = await User.findOne({ email });
  if (exists) {
    throw Error("Email alreay exists!");
  }

  //Data which we entering in password that convert to hash, salt we use to get password in different formet but it takes string values.if our data should like we need install 'bcrypt' asign to salt and hash. 

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await User.create({ email, password: hash });
  return user;
};

//static login function

userSchema.statics.login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw Error("incorrect Email!");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("incorrect password!");
  }

  return user;
};

const User = new mongoose.model("User", userSchema);

module.exports = User;
