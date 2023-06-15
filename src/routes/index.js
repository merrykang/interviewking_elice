"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var cors = require('cors');
var user_1 = require("./user");
var community_1 = require("./community");
var study_1 = require("./study");
var study_feedback_1 = require("./study_feedback");
var router = express.Router();
var indexPath = path.join(__dirname, '../pages');
router.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200,
    exposedHeaders: ['Access-Control-Allow-Origin'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'], // 토큰 에러 테스트
}));
router.use(express.json());
router.use(express.static(indexPath));
router.use('/api/user', user_1.default);
router.use('/api/community', community_1.default);
router.use('/api/study', study_1.default);
router.use('/api/feedback', study_feedback_1.default);
exports.default = router;
