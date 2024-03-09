var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
const cors = require("cors");
var session = require("express-session");

// passport
const passport = require("passport");
const passportConfig = require("./passport/index.js");

var indexRouter = require("./routes/index");
var usersAPIRouter = require("./routes/userAPI");
var commonAPIRouter = require("./routes/commonAPI");

var sequelize = require("./models/index.js").sequelize;
var app = express();
sequelize.sync();
app.use(
	cors({
		origin: "http://localhost:3005",
		credentials: true,
	})
);

// passport
passportConfig(passport);
app.use(
	session({
		resave: false,
		saveUninitialized: false,
		secret: process.env.COOKIE_SECRET,
		cookie: {
			httpOnly: true,
			secure: true,
			maxAge: 1000 * 60 * 60 * 24, // 1 day
		},
	})
);

app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/users", usersAPIRouter);
app.use("/api/common", commonAPIRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render("error");
});

module.exports = app;
