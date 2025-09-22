// 관측점 위치 설정
document.addEventListener('DOMContentLoaded', function() {
    // 관측점 위치 설정
    const observationPoints = document.querySelectorAll('.observation-point[data-x][data-y]');
    observationPoints.forEach(point => {
        const x = point.getAttribute('data-x');
        const y = point.getAttribute('data-y');
        point.style.setProperty('--x', x + 'px');
        point.style.setProperty('--y', y + 'px');
    });
    
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // 모든 탭에서 active 클래스 제거
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // 클릭된 탭에 active 클래스 추가
            this.classList.add('active');
            
            // 해당 탭 콘텐츠 표시
            const targetContent = document.getElementById(targetTab + '-tab');
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // 햄버거 메뉴 기능은 components.js에서 처리됨

    // 드롭다운 메뉴 기능 구현
    const stationDropdown = document.getElementById('stationDropdown');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const selectedStation = document.getElementById('selectedStation');
    const dropdownItems = document.querySelectorAll('.dropdown-item');

    stationDropdown.addEventListener('click', function(e) {
        e.stopPropagation();
        dropdownMenu.classList.toggle('active');
        stationDropdown.classList.toggle('active');
    });

    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            const stationName = this.getAttribute('data-station');
            selectedStation.textContent = stationName;
            dropdownMenu.classList.remove('active');
            stationDropdown.classList.remove('active');
        });
    });

    // 외부 클릭 시 드롭다운 닫기
    document.addEventListener('click', function() {
        dropdownMenu.classList.remove('active');
        stationDropdown.classList.remove('active');
    });
});
