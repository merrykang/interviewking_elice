"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PORT = void 0;
var dotenv_1 = require("dotenv");
var express_1 = require("express");
(0, dotenv_1.config)();
var app = (0, express_1.default)();
var PORT = process.env.PORT;
exports.PORT = PORT;
// Router
var index_1 = require("./src/routes/index");
// JWT token Middleware
var cookie_parser_1 = require("cookie-parser");
app.use((0, cookie_parser_1.default)(''));
// Middleware Setting
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
app.use('/', index_1.default);
// PORT
app.listen(PORT, function () {
    console.log("Server on http://localhost:".concat(PORT));
});
exports.default = app;
