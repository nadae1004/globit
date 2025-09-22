// 관측점 데이터 (10개: 16°C 7개, 27°C 3개)
const stationData = {
    // 16°C 관측점들 (7개)
    '94-120': { name: '욕지 연화', code: 'C530001', status: '운영중' },
    '376-343': { name: '육지 연화', code: 'C530002', status: '운영중' },
    '415-630': { name: '거제 연화', code: 'C530003', status: '운영중' },
    '213-827': { name: '고성 연화', code: 'C530004', status: '운영중' },
    '326-932': { name: '사천 연화', code: 'C530005', status: '운영중' },
    '275-393': { name: '영덕 연화', code: 'C530006', status: '운영중' },
    '209-545': { name: '양산 연화', code: 'C530007', status: '운영중' },
    
    // 27°C 관측점들 (3개)
    '11-612': { name: '부산 연화', code: 'C530008', status: '운영중' },
    '395-808': { name: '울산 연화', code: 'C530009', status: '운영중' },
    '475-612': { name: '하동 연화', code: 'C530010', status: '운영중' }
};

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

    // 관측점 클릭 이벤트
    const stationPopup = document.getElementById('stationPopup');
    const closePopup = document.getElementById('closePopup');
    const stationName = document.querySelector('.station-name');
    const stationCode = document.querySelector('.station-code');
    const status = document.querySelector('.status');

    observationPoints.forEach(point => {
        point.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const x = this.getAttribute('data-x');
            const y = this.getAttribute('data-y');
            const key = x + '-' + y;
            const data = stationData[key];
            
            if (data) {
                stationName.textContent = data.name;
                stationCode.textContent = data.code;
                status.textContent = data.status;
                
                // 팝업 위치 설정
                const rect = this.getBoundingClientRect();
                const mapContainer = document.querySelector('.map-container');
                const mapRect = mapContainer.getBoundingClientRect();
                
                const xPos = rect.left - mapRect.left + rect.width / 2;
                const yPos = rect.top - mapRect.top + rect.height / 2;
                
                stationPopup.style.left = xPos + 'px';
                stationPopup.style.top = yPos + 'px';
                stationPopup.classList.add('active');
            }
        });
    });

    // 팝업 닫기
    closePopup.addEventListener('click', function(e) {
        e.stopPropagation();
        stationPopup.classList.remove('active');
    });

    // 외부 클릭 시 팝업 닫기
    document.addEventListener('click', function() {
        stationPopup.classList.remove('active');
    });

    // 더보기 버튼 클릭 시 상세 팝업 열기
    const moreBtn = document.querySelector('.more-btn');
    const detailPopupOverlay = document.getElementById('detailPopupOverlay');
    const detailCloseBtn = document.getElementById('detailCloseBtn');
    const notificationBtn = document.querySelector('.notification-btn');

    moreBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        detailPopupOverlay.classList.add('active');
        // 기존 팝업 닫기
        stationPopup.classList.remove('active');
    });

    // 상세 팝업 닫기
    detailCloseBtn.addEventListener('click', function() {
        detailPopupOverlay.classList.remove('active');
    });

    // 오버레이 클릭 시 상세 팝업 닫기
    detailPopupOverlay.addEventListener('click', function(e) {
        if (e.target === detailPopupOverlay) {
            detailPopupOverlay.classList.remove('active');
        }
    });

    // 알림 생성 버튼 클릭
    notificationBtn.addEventListener('click', function() {
        alert('알림 생성 기능이 구현되었습니다!');
    });

    // ESC 키로 상세 팝업 닫기
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && detailPopupOverlay.classList.contains('active')) {
            detailPopupOverlay.classList.remove('active');
        }
    });

    // 관측점 호버 효과
    observationPoints.forEach(point => {
        point.addEventListener('mouseenter', function() {
            this.style.zIndex = '1100';
        });
        
        point.addEventListener('mouseleave', function() {
            this.style.zIndex = '1000';
        });
    });

    // 로딩 완료 애니메이션
    setTimeout(() => {
        observationPoints.forEach((point, index) => {
            setTimeout(() => {
                point.style.opacity = '0';
                point.style.transform = 'translate(-50%, -50%) scale(0.5)';
                point.style.transition = 'all 0.5s ease';
                
                setTimeout(() => {
                    point.style.opacity = '1';
                    point.style.transform = 'translate(-50%, -50%) scale(1)';
                }, 50);
            }, index * 100);
        });
    }, 500);
});

// 키보드 접근성
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const stationPopup = document.getElementById('stationPopup');
        stationPopup.classList.remove('active');
    }
});
