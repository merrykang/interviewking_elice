import { Schema, Document, Types, model } from 'mongoose';

interface IStudyRelation extends Document {
  study_id?: Types.ObjectId;
  user_id?: Types.ObjectId;
  is_leader: boolean;
  goal: string;
  accept: number;
}

const StudyRelationSchema: Schema<IStudyRelation> = new Schema<IStudyRelation>({
  study_id: { type: Types.ObjectId, unique: false, ref: 'Study' },
  user_id: { type: Types.ObjectId, unique: false, ref: 'User' },
  is_leader: { type: Boolean, default: false },
  goal: { type: String },
  accept: { type: Number },
});

const StudyRelationModel = model<IStudyRelation>('StudyRelation', StudyRelationSchema);

export default StudyRelationModel;
