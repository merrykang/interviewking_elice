"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var StudyFeedbackSchema = new mongoose_1.Schema({
    study_id: { type: mongoose_1.Schema.Types.ObjectId, unique: false, ref: 'Study' },
    user_id: { type: mongoose_1.Schema.Types.ObjectId, unique: false, ref: 'User' },
    user_name: { type: String, unique: false, ref: 'User' },
    content_type: { type: Boolean },
    content: { type: String },
}, {
    timestamps: true, // 댓글작성일시: date
});
exports.default = StudyFeedbackSchema;
