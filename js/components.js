// 헤더와 푸터를 동적으로 로드하는 함수
async function loadComponent(url, elementId) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
    } catch (error) {
        console.error(`Error loading ${url}:`, error);
    }
}

// 현재 페이지에 맞는 네비게이션 활성화
function setActiveNavigation() {
    const currentPage = getCurrentPage();
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-page') === currentPage) {
            item.classList.add('active');
        }
    });
}

// 현재 페이지 식별
function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('high-temperature.html')) return 'high-temperature';
    if (path.includes('notification-service.html')) return 'notification-service';
    return 'index'; // index.html과 index-map.html 모두 index로 처리
}

// 페이지 로드 시 헤더와 푸터 로드
document.addEventListener('DOMContentLoaded', async function() {
    // 헤더와 푸터 로드
    await Promise.all([
        loadComponent('/components/header.html', 'header-placeholder'),
        loadComponent('/components/footer.html', 'footer-placeholder')
    ]);
    
    // 네비게이션 활성화 설정
    setActiveNavigation();
    
    // 헤더의 햄버거 메뉴 기능 (헤더 로드 후 실행)
    initializeHeaderFunctions();
});

// 헤더 관련 기능 초기화
function initializeHeaderFunctions() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const gnb = document.querySelector('.gnb');
    
    if (hamburgerBtn && gnb) {
        hamburgerBtn.addEventListener('click', function() {
            gnb.classList.toggle('active');
            hamburgerBtn.classList.toggle('active');
        });

        // 메뉴 아이템 클릭 시 모바일 메뉴 닫기
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', function() {
                if (window.innerWidth <= 800) {
                    gnb.classList.remove('active');
                    hamburgerBtn.classList.remove('active');
                }
            });
        });
    }
}
