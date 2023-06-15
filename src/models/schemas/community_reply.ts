
import mongoose, { Schema, Document, Model } from "mongoose";

interface ICommunityReply extends Document {
reply_id: number;
reply_user_id?: mongoose.Types.ObjectId;
reply_user_name: string;
reply_content: string;
community_id: number;
}

const CommunityReplySchema: Schema<ICommunityReply> = new Schema<ICommunityReply>(
{
    reply_id: {
    type: Number,
    },
    reply_user_id: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    },
    reply_user_name: {
    type: String,
    },
    reply_content: {
    type: String,
    },
    community_id: {
    type: Number,
    ref: "Community",
    },
    },
    {
    timestamps: true,
    }
);

const CommunityReplyModel: Model<ICommunityReply> = mongoose.model<ICommunityReply>(
"CommunityReply",
CommunityReplySchema
);

export default CommunityReplyModel;