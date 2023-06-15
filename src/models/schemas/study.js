"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var StudySchema = new mongoose_1.Schema({
    // 스터디 정보
    leader_id: { type: mongoose_1.Schema.Types.ObjectId },
    study_id: { type: mongoose_1.Schema.Types.ObjectId },
    study_name: { type: String, unique: false },
    leader_name: { type: String },
    title: { type: String },
    content: { type: String },
    start: { type: Date },
    end: { type: Date },
    deadline: { type: Date },
    headcount: { type: Number, maximum: 10 },
    acceptcount: { type: Number, default: 0 },
    chat_link: {
        type: String,
        // pattern: '^https?:\\/\\/(?:www\\.)?zoom\\.us\\/(?:j\\/|my\\/|meetings\\/join\\?)[^\\s]+$',
    },
    status: {
        // 모집 중: 0, 모집 완료: 1
        type: Number,
        default: 0,
    },
});
exports.default = StudySchema;
