"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var CommunityReplySchema = new mongoose_1.Schema({
    reply_id: {
        type: Number,
    },
    reply_user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    reply_user_name: {
        type: String,
    },
    reply_content: {
        type: String,
    },
    community_id: {
        type: Number,
        ref: 'Community',
    },
}, {
    timestamps: true,
});
exports.default = CommunityReplySchema;
