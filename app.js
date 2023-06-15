"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = void 0;
var dotenv_1 = require("dotenv");
var express = require("express");
(0, dotenv_1.config)();
var app = express();
var PORT = process.env.PORT;
exports.PORT = PORT;
// Router
var index_1 = require("./src/routes/index");
// JWT token Middleware
var cookieParser = require("cookie-parser");
app.use(cookieParser(''));
// Middleware Setting
app.use(express.json());
app.use(express.static('public'));
app.use('/', index_1.default);
// PORT
app.listen(PORT, function () {
    console.log("Server on http://localhost:".concat(PORT));
});
exports.default = app;
