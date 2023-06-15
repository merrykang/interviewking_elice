"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var StudyRelationSchema = new mongoose_1.Schema({
    study_id: { type: mongoose_1.Schema.Types.ObjectId, unique: false, ref: 'Study' },
    user_id: { type: mongoose_1.Schema.Types.ObjectId, unique: false, ref: 'User' },
    is_leader: { type: Boolean, default: 0 },
    goal: { type: String },
    accept: { type: Number }, // 0: 신청 완료, 1: 신청 수락, 2: 신청 거절, 3: 신청 반려
});
exports.default = StudyRelationSchema;
