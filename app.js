const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
require('dotenv').config();
const app = express();
const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD;

app.use(bodyParser.json());

app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// API 라우터 설정
app.use('/api', indexRouter);

// 포트 설정
const PORT = process.env.PORT || 5000;

// MongoDB URI가 올바르게 로드되었는지 확인 (여기 추가)
console.log("MongoDB URI:", MONGODB_URI_PROD);

// MongoDB 연결 및 서버 시작
mongoose
    .connect(MONGODB_URI_PROD)
    .then(() => {
        console.log('mongoose connected');
        // 서버 시작
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log('DB connection fail', err);
    });
