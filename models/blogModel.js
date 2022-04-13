const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Blog must have a Title!!!"],
  },
  subTitle: {
    type: String,
    required: [true, "Blog must have a SubTitle!!!"],
  },
  avatar: {
    type: String,
    required: [true, "Blog must have an Avatar!!!"],
  },
  body: {
    type: String,
    required: [true, "Blog must have an Body!!!"],
  },
  images: {
    type: [String],
  },
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
