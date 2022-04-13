const Blog = require("../models/blogModel");

exports.getAll = async (req, res, next) => {
  try {
    const data = await Blog.find();
    res.status(200).json({
      status: "Success",
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const data = await Blog.findById(req.params.id);
    res.status(200).json({
      status: "Success",
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.createBlog = async (req, res, next) => {
  try {
    const data = await Blog.create({
      title: req.body.title,
      subTitle: req.body.subTitle,
      avatar: req.body.avatar,
      body: req.body.body,
      images: req.body.images,
    });

    res.status(201).json({
      status: "Success",
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateBlog = async (req, res, next) => {
  try {
    const data = await Blog.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      status: "Success",
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteBlog = async (req, res, next) => {
  try {
    const data = await Blog.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "Success",
      data,
    });
  } catch (err) {
    next(err);
  }
};
