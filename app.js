//npm으로설치한 애들 연결하기

const expressLayout = require("express-ejs-layouts");
const express = require("express");
const routers = require("./routes/route");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
// var cookieParser = require("cookie-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(cookieParser());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayout);
app.use("/", routers);
app.use(express.static(path.join(__dirname, "public")));

module.exports = app;
