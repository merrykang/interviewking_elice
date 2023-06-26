import mongoose from 'mongoose';
const { Schema } = mongoose;

const StudySchema = new Schema({
  // 스터디 정보
  leader_id: { type: mongoose.Types.ObjectId },
  study_id: { type: mongoose.Types.ObjectId }, // identification value
  study_name: { type: String, unique: false },
  leader_name: { type: String }, // 스터디장 이름
  title: { type: String },
  content: { type: String },
  start: { type: Date },
  end: { type: Date },
  deadline: { type: Date }, // 모집완료날짜
  headcount: { type: Number, maximum: 10 }, // 최대 모집 인원
  acceptcount: { type: Number, default: 0 },
  chat_link: {
    type: String,
    // pattern: '^https?:\\/\\/(?:www\\.)?zoom\\.us\\/(?:j\\/|my\\/|meetings\\/join\\?)[^\\s]+$',
  },
  status: {
    // 모집 중: 0, 모집 완료: 1
    type: Number,
    default: 0,
  },
});

export default StudySchema;
