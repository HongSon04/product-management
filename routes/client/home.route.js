const express = require("express");
const { index } = require("../../controller/client/home.controller");

const HomeRouter = express.Router();

HomeRouter.get("/", index);

module.exports = HomeRouter;
