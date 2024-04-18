const express = require("express");
const DasboardRouter = require("./dashboard.route");
const ProductRoute = require("./product.route");
const { prefixAdmin } = require("../../config/system");
const adminRouter = express.Router();

const PATH_ADMIN = prefixAdmin;

adminRouter.use(PATH_ADMIN + "/dashboard", DasboardRouter);
adminRouter.use(PATH_ADMIN + "/products", ProductRoute);

module.exports = adminRouter;
