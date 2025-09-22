document.addEventListener('DOMContentLoaded', function() {
    // 햄버거 메뉴 기능은 components.js에서 처리됨

    // 달력 네비게이션
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            console.log('달력 네비게이션:', this.textContent);
        });
    });

    // 달력 날짜 클릭
    const calendarDays = document.querySelectorAll('.calendar-day');
    calendarDays.forEach(day => {
        day.addEventListener('click', function() {
            calendarDays.forEach(d => d.classList.remove('selected'));
            this.classList.add('selected');
        });
    });

    // 정점 선택/해제
    const stationItems = document.querySelectorAll('.station-item');
    stationItems.forEach(item => {
        item.addEventListener('click', function() {
            this.classList.toggle('selected');
        });
    });

    // 전체 선택 버튼
    const selectAllBtn = document.querySelector('.select-all-btn');
    selectAllBtn.addEventListener('click', function() {
        const isAllSelected = Array.from(stationItems).every(item => item.classList.contains('selected'));
        stationItems.forEach(item => {
            if (isAllSelected) {
                // highOn 클래스가 있는 정점은 selected만 제거하고 highOn은 유지
                if (item.classList.contains('highOn')) {
                    item.classList.remove('selected');
                } else {
                    item.classList.remove('selected');
                }
            } else {
                item.classList.add('selected');
            }
        });
    });
});
