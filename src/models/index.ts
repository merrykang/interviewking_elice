import mongoose from '../config/database';

import CommunitySchema from './schemas/community';
import CommunityReplySchema from './schemas/community_reply';
import UserSchema from './schemas/user';
import StudySchema from './schemas/study';
import StudyRelationSchema from './schemas/study_relation';
import StudyFeedbackSchema from './schemas/study_feedback';

export const Community = mongoose.model('Community', CommunitySchema);
export const CommunityReply = mongoose.model('CommunityReply', CommunityReplySchema);
export const User = mongoose.model('User', UserSchema);
export const Study = mongoose.model('Study', StudySchema);
export const StudyRelation = mongoose.model('StudyRelation', StudyRelationSchema);
export const StudyFeedback = mongoose.model('StudyFeedback', StudyFeedbackSchema);
