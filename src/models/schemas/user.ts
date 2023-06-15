import mongoose, { Schema, Document } from 'mongoose';

interface User extends Document {
  user_id?: mongoose.Types.ObjectId;
  user_name: string;
  email: string;
  password: string;
  privacy_use_yn?: string;
  marketing_use_yn?: string;
  intro_yn?: string;
  phone_number?: string;
  admin_yn?: boolean;
  dts_insert: string;
  dts_update?: string;
}

const UserSchema: Schema = new Schema<User>(
  {
    user_id: { type: mongoose.Types.ObjectId },
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
  },
  {
    versionKey: false,
  },
);

export default mongoose.model<User>('User', UserSchema);
