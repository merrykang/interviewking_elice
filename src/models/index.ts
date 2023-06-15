import mongoose from '../config/database';
import { Model } from 'mongoose';

import { CommunityDocument } from './schemas/community';
import { CommunityReplyDocument } from './schemas/community_reply';
import { UserDocument } from './schemas/user';
import { StudyDocument } from './schemas/study';
import { StudyRelationDocument } from './schemas/study_relation';
import { StudyFeedbackDocument } from './schemas/study_feedback';

export const Community = mongoose.model<CommunityDocument>('Community', require('./schemas/community'));
export const CommunityReply = mongoose.model<CommunityReplyDocument>('CommunityReply', require('./schemas/community_reply'));
export const User = mongoose.model<UserDocument>('User', require('./schemas/user'));
export const Study = mongoose.model<StudyDocument>('Study', require('./schemas/study'));
export const StudyRelation = mongoose.model<StudyRelationDocument>('StudyRelation', require('./schemas/study_relation'));
export const StudyFeedback = mongoose.model<StudyFeedbackDocument>('StudyFeedback', require('./schemas/study_feedback'));
