const express = require("express");
const rootRouter = express.Router();
const ProductRouter = require("./product.route");
const HomeRouter = require("./home.route");

rootRouter.use("/", HomeRouter);
rootRouter.use("/products", ProductRouter);

module.exports = rootRouter;
