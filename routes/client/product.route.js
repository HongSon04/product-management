const express = require("express");
const { index, detail } = require("../../controller/client/product.controller");

const ProductRouter = express.Router();

ProductRouter.get("/:slug", detail);
ProductRouter.get("/", index);


module.exports = ProductRouter;
