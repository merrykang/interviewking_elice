"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    // user_id: { type: mongoose.Types.ObjectId, required: true, unique: true },    // identification value
    user_id: { type: mongoose_1.Schema.Types.ObjectId },
    user_name: { type: String, required: true, unique: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: false },
    privacy_use_yn: { type: String, required: true, unique: false, default: true },
    marketing_use_yn: { type: String, required: true, unique: false, default: false },
    intro_yn: { type: String, required: false, unique: false, default: '' },
    phone_number: { type: String, required: false, unique: false, default: '' },
    admin_yn: { type: Boolean, required: false, unique: false, default: false },
    dts_insert: { type: String, required: true, unique: false, default: '' },
    dts_update: { type: String, unique: false, default: '' },
}, {
    versionKey: false,
});
exports.default = UserSchema;
