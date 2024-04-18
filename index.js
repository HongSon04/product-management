// ? Import Libraries
const express = require("express");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
require("dotenv").config();

// ? Import Config
const checkConnect = require("./config/database");
const { prefixAdmin } = require("./config/system");
// ? Import Routes
const rootRouter = require("./routes/client/index.route");
const adminRouter = require("./routes/admin/index.route");

// ? Config
checkConnect();
const app = express();
const port = process.env.PORT;
// ? Override Method
app.use(methodOverride("_method"));
// ? Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
// ? Template Engine
app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

// App Locals Variables
app.locals.prefixAdmin = prefixAdmin;
// ? Flash
app.use(cookieParser("keyboard cat"));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());
// ? Static Files
app.use(express.static(`${__dirname}/public`));
// ? Routes
app.use("/", rootRouter);
app.use("/", adminRouter);

// ? Port
app.listen(port, () => {
  console.log(`RUNNING ON http://localhost:${port}`);
});
