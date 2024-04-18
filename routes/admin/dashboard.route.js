const express = require("express");
const { dashboard } = require("../../controller/admin/dashboard.controller");

const DasboardRouter = express.Router();

DasboardRouter.get("/", dashboard);

module.exports = DasboardRouter;
