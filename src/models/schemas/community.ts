import mongoose, { Schema, Document, Model } from "mongoose";

interface ICommunity extends Document {
  community_id: number;
  user_id?: mongoose.Types.ObjectId;
  user_name: string;
  read_users: mongoose.Types.ObjectId[];
  title: string;
  content: string;
  file_key: string;
  file_etag: string;
  file_name: string;
}

const CommunitySchema: Schema<ICommunity> = new Schema<ICommunity>(
  {
    community_id: {
      type: Number,
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    user_name: {
      type: String,
    },
    read_users: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
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
  },
  {
    timestamps: true,
  }
);

const CommunityModel: Model<ICommunity> = mongoose.model<ICommunity>(
  "Community",
  CommunitySchema
);

export default CommunityModel;
