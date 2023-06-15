"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var CommunitySchema = new mongoose_1.Schema({
    community_id: {
        type: Number,
    },
    /** 게시글 작성자 */
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    user_name: {
        type: String,
    },
    /** 해당 게시글을 조회한 회원 : 한 회원은 조회수 하나만 카운트 */
    read_users: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    title: {
        type: String,
    },
    content: {
        type: String,
    },
    file_key: {
        type: String,
    },
    file_etag: {
        type: String,
    },
    file_name: {
        type: String,
    },
}, {
    timestamps: true,
});
exports.default = CommunitySchema;
