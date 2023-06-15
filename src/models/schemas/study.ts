import { Schema, Document, Model, model, Types } from 'mongoose';

interface IStudy extends Document {
  leader_id?: Types.ObjectId;
  study_id?: Types.ObjectId;
  study_name: string;
  leader_name: string;
  title: string;
  content: string;
  start: Date;
  end: Date;
  deadline: Date;
  headcount: number;
  acceptcount: number;
  chat_link: string;
  status: number;
}

const StudySchema: Schema<IStudy> = new Schema<IStudy>({
  leader_id: { type: Types.ObjectId },
  study_id: { type: Types.ObjectId },
  study_name: { type: String, unique: false },
  leader_name: { type: String },
  title: { type: String },
  content: { type: String },
  start: { type: Date },
  end: { type: Date },
  deadline: { type: Date },
  headcount: { type: Number, maximum: 10 },
  acceptcount: { type: Number, default: 0 },
  chat_link: { type: String },
  status: { type: Number, default: 0 },
});

const StudyModel: Model<IStudy> = model<IStudy>('Study', StudySchema);

export default StudyModel;
