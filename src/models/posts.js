const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true
    },
    description: {
      type: String,
      trim: true,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    comments: {
      type: [{ body: String, likes: Number, owner: String, author: String, avatarURL: String, date: Date }]
    },
    bannerURL: {
      type: String,
      required: true
    },
    owner: {
      type: { id: String, name: String, avatarURL: String },
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Post", PostSchema);
