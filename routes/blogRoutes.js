const express = require("express");
const blogController = require("../controllers/blogControllers");

const router = express.Router();

//APIs
router.get("/getAllBlogs", blogController.getAll);
router.get("/getBlogById/:id", blogController.getOne);
router.post("/createBlog", blogController.createBlog);
router.patch("/updateBlog/:id", blogController.updateBlog);
router.delete("/deleteBlog/:id", blogController.deleteBlog);

module.exports = router;
