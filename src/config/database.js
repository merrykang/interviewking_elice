"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var dbLink = process.env.DB_Link;
if (!dbLink) {
    throw new Error('DB_Link environment variable is not defined');
}
// DB 연결
mongoose_1.default
    .connect(dbLink, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 45000,
    family: 4, // IPv4
})
    .then(function () { return console.log('Successfully connected to MongoDB'); })
    .catch(function (err) { return console.log(err); });
exports.default = mongoose_1.default;
