document.getElementById('attendance-btn').addEventListener('click', () => {
    const name = document.getElementById('name').value.trim();
    if (!name) {
        alert('이름을 입력해 주세요.');
        return;
    }

    const today = new Date().toISOString().split('T')[0]; // 현재 날짜 구하기
    const attendance = JSON.parse(localStorage.getItem('attendance')) || {};

    // 현재 날짜에 출석 기록 추가
    if (!attendance[today]) {
        attendance[today] = {};
    }
    attendance[today][name] = "O"; // 출석 상태 "O"로 기록

    localStorage.setItem('attendance', JSON.stringify(attendance));
    alert(`${name}님의 출석이 ${today}에 기록되었습니다.`);
    
    // 입력 필드 초기화
    document.getElementById('name').value = '';
});
