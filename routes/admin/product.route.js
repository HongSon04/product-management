const express = require("express");
const multer = require("multer");
const storageMulter = require("../../helpers/storageMulter");
const {
  valiteCreateProduct,
} = require("../../validates/admin/product.validate");

const upload = multer({ storage: storageMulter() });
const {
  index,
  changeStatus,
  changeMulti,
  deleteItem,
  create,
  storeProduct,
  edit,
  update,
  detail,
} = require("../../controller/admin/product.controller");

const ProductRoute = express.Router();

ProductRoute.get("/", index);
ProductRoute.patch("/change-status/:status/:id", changeStatus);
ProductRoute.patch("/change-multi", changeMulti);
ProductRoute.delete("/delete/:id", deleteItem);

ProductRoute.get("/create", create);
ProductRoute.post(
  "/create",
  upload.single("thumbnail"),
  valiteCreateProduct,
  storeProduct
);

ProductRoute.get("/edit/:id", edit);
ProductRoute.patch(
  "/update/:id",
  upload.single("thumbnail"),
  valiteCreateProduct,
  update
);

ProductRoute.get("/detail/:id", detail);


module.exports = ProductRoute;
