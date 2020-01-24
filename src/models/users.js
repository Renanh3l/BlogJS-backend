const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true
    },
    password: {
      type: String,
      trim: true,
      required: true
    },
    avatarURL: {
      type: String,
      default:
        "https://gravatar.com/avatar/a6d708d46ae49405ce3573ed56f4db76?s=400&d=robohash&r=x"
    },
    admin: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true
  }
);

// Usado para encriptar a senha no banco de dados
UserSchema.pre("save", function(next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  next();
});

module.exports = mongoose.model("User", UserSchema);
