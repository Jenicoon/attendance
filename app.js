const attendanceBtn = document.getElementById('attendance-btn');

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

// 출석하기 버튼 클릭 이벤트
attendanceBtn.addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const attendees = loadAttendance();
    const attendee = attendees.find(a => a.name === name);

    if (attendee) {
        if (attendee.status === 'O') {
            alert(`${name}님은 이미 출석하셨습니다.`);
        } else {
            attendee.status = 'O';
            localStorage.setItem('attendance', JSON.stringify(attendees));
            document.getElementById('name').value = '';
            alert(`${name}님이 출석하셨습니다.`);
        }
    } else {
        alert("이름을 확인하세요.");
    }
});
