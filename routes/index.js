const express = require("express");

const router = express.Router();

//Routes
router.use("/v1/blog", require("./blogRoutes"));
router.use("/v1/user", require("./userRoutes"));

module.exports = router;
