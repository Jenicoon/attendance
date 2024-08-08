const attendanceTableBody = document.getElementById('attendance-table').getElementsByTagName('tbody')[0];
const resetBtn = document.getElementById('reset-btn');
const refreshBtn = document.getElementById('refresh-btn');

// 초기 참석자 목록
const initialAttendees = [
    { name: "이건호", status: "X" },
    { name: "이승하", status: "X" },
    { name: "정안성", status: "X" }
];

// 로컬 저장소에서 출석 현황 불러오기
function loadAttendance() {
    const storedAttendance = JSON.parse(localStorage.getItem('attendance'));
    const attendees = initialAttendees.map(attendee => ({ ...attendee })); // 초기 목록 복사

    if (storedAttendance) {
        attendees.forEach(attendee => {
            const stored = storedAttendance.find(a => a.name === attendee.name);
            if (stored) {
                attendee.status = stored.status;
            }
        });
    }

    return attendees;
}

// 출석 현황 테이블 업데이트
function updateAttendanceTable() {
    const attendees = loadAttendance();
    attendanceTableBody.innerHTML = '';
    attendees.forEach(attendee => {
        const row = attendanceTableBody.insertRow();
        row.insertCell(0).innerText = attendee.name;
        row.insertCell(1).innerText = attendee.status;
    });
}

// 초기화 버튼 클릭 이벤트
resetBtn.addEventListener('click', () => {
    localStorage.removeItem('attendance'); // 로컬 저장소에서 출석 데이터 삭제
    updateAttendanceTable(); // 테이블 업데이트
    alert("출석 현황이 초기화되었습니다.");
});

// 새로고침 버튼 클릭 이벤트
refreshBtn.addEventListener('click', () => {
    updateAttendanceTable(); // 테이블 업데이트
    alert("출석 현황이 새로고침되었습니다.");
});

// 초기화
updateAttendanceTable();
