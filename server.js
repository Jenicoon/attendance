const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// CORS 설정
app.use(cors());
app.use(bodyParser.json());

let attendance = {
    "홍길동": false,
    "김철수": false,
    "이영희": false
};

// 출석 처리 API
app.post('/attendance', (req, res) => {
    const name = req.body.name;

    if (attendance.hasOwnProperty(name)) {
        attendance[name] = true; // 출석 여부를 true로 변경
        return res.json({ message: `${name}님의 출석이 확인되었습니다.`, attendance });
    } else {
        return res.status(404).json({ message: "사용자를 찾을 수 없습니다." });
    }
});

// 출석 확인 API
app.get('/attendance', (req, res) => {
    res.json(attendance);
});

// 서버 시작
app.listen(PORT, () => {
    console.log(`서버가 http://localhost:${PORT}에서 실행 중입니다.`);
});
