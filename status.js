const attendanceTableBody = document.getElementById('attendance-table').getElementsByTagName('tbody')[0];
const resetBtn = document.getElementById('reset-btn');
const refreshBtn = document.getElementById('refresh-btn');
const dateButtonsContainer = document.getElementById('date-buttons');

// 초기 참석자 목록
const initialAttendees = [
    { name: "이건호", status: "X" },
    { name: "이승하", status: "X" },
    { name: "정안성", status: "X" },
    { name: "장민혁", status: "X" },
    { name: "이승우", status: "X" }
];

// 날짜 버튼 생성
function createDateButtons() {
    const today = new Date();
    const dateButtons = [];
    
    for (let i = 0; i < 7; i++) { // 7일간의 날짜 버튼 생성
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        const dateString = date.toISOString().split('T')[0];
        dateButtons.push(dateString);
    }

    dateButtons.forEach(date => {
        const button = document.createElement('div');
        button.innerText = date;
        button.className = 'date-button';
        button.addEventListener('click', () => {
            updateAttendanceTable(date);
            setActiveButton(button);
        });
        dateButtonsContainer.appendChild(button);
    });
}

// 활성화된 버튼 표시
function setActiveButton(activeButton) {
    const buttons = document.querySelectorAll('.date-button');
    buttons.forEach(button => {
        button.classList.remove('active');
    });
    activeButton.classList.add('active');
}

// 로컬 저장소에서 출석 현황 불러오기
function loadAttendance(date) {
    const storedAttendance = JSON.parse(localStorage.getItem('attendance')) || {};
    const attendees = initialAttendees.map(attendee => ({ ...attendee }));

    // 선택한 날짜에 대한 출석 정보를 가져옴
    if (storedAttendance[date]) {
        attendees.forEach(attendee => {
            const stored = storedAttendance[date][attendee.name];
            if (stored) {
                attendee.status = stored;
            }
        });
    }

    return attendees;
}

// 출석 현황 테이블 업데이트
function updateAttendanceTable(date) {
    const attendees = loadAttendance(date);
    attendanceTableBody.innerHTML = '';
    attendees.forEach(attendee => {
        const row = attendanceTableBody.insertRow();
        row.insertCell(0).innerText = attendee.name;
        row.insertCell(1).innerText = attendee.status;
    });
}

// 초기화 버튼 클릭 이벤트
resetBtn.addEventListener('click', () => {
    localStorage.removeItem('attendance');
    updateAttendanceTable(new Date().toISOString().split('T')[0]); // 오늘 날짜로 초기화
    alert("출석 현황이 초기화되었습니다.");
});

// 새로고침 버튼 클릭 이벤트
refreshBtn.addEventListener('click', () => {
    const activeButton = document.querySelector('.date-button.active');
    const date = activeButton ? activeButton.innerText : new Date().toISOString().split('T')[0];
    updateAttendanceTable(date);
    alert("출석 현황이 새로고침되었습니다.");
});

// 초기화
createDateButtons(); // 날짜 버튼 생성
updateAttendanceTable(new Date().toISOString().split('T')[0]); // 오늘 날짜로 초기화
