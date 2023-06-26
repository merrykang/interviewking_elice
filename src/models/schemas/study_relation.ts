import mongoose from 'mongoose';
const { Schema } = mongoose;

const StudyRelationSchema = new Schema({
  study_id: { type: mongoose.Types.ObjectId, unique: false, ref: 'Study' }, // reference
  user_id: { type: mongoose.Types.ObjectId, unique: false, ref: 'User' }, // reference
  user_name: { type: String, unique: false, ref: 'User' }, // reference
  is_leader: { type: Boolean, defalut: 0 }, // 1: 스터디장, 0: 스터디원
  goal: { type: String }, // 목표 산업 분야 및 기업, 포부 등
  accept: { type: Number }, // 0: 신청 완료, 1: 신청 수락, 2: 신청 거절, 3: 신청 반려
});

export default StudyRelationSchema;
