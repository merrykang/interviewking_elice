import { Schema, Document, Types, model } from 'mongoose';

interface IStudyFeedback extends Document {
  study_id?: Types.ObjectId;
  user_id?: Types.ObjectId;
  user_name: string;
  content_type: boolean;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const StudyFeedbackSchema: Schema<IStudyFeedback> = new Schema<IStudyFeedback>(
  {
    study_id: { type: Types.ObjectId, unique: false, ref: 'Study' },
    user_id: { type: Types.ObjectId, unique: false, ref: 'User' },
    user_name: { type: String, unique: false, ref: 'User' },
    content_type: { type: Boolean },
    content: { type: String },
  },
  {
    timestamps: true,
  },
);

const StudyFeedbackModel = model<IStudyFeedback>('StudyFeedback', StudyFeedbackSchema);

export default StudyFeedbackModel;
