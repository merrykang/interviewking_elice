import mongoose from 'mongoose';

const { Schema } = mongoose;

const CommunityReplySchema = new Schema(
  {
    reply_id: {
      type: Number,
    },
    reply_user_id: {
      type: mongoose.Types.ObjectId,
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
  },
  {
    timestamps: true,
  },
);

export default CommunityReplySchema;
