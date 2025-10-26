// 관리자 헤더와 푸터를 동적으로 로드하는 함수
async function loadAdminComponent(url, elementId) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
    } catch (error) {
        console.error(`Error loading ${url}:`, error);
    }
}

// 현재 페이지에 맞는 네비게이션 활성화 (관리자용)
function setActiveAdminNavigation() {
    const currentPage = getCurrentAdminPage();
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-page') === currentPage) {
            item.classList.add('active');
        }
    });
}

// 현재 페이지 식별 (관리자용)
function getCurrentAdminPage() {
    const path = window.location.pathname;
    if (path.includes('admin-notification-service.html')) return 'notification-service';
    if (path.includes('message-log.html')) return 'log';
    if (path.includes('scheduler-log.html')) return 'log';
    if (path.includes('admin-login.html')) return 'log';
    return 'notification-service'; // 기본값
}

// 관리자 페이지 로드 시 헤더와 푸터 로드
document.addEventListener('DOMContentLoaded', async function() {
    // 관리자 헤더와 푸터 로드
    await Promise.all([
        loadAdminComponent('/components/admin-header.html', 'header-placeholder'),
        loadAdminComponent('/components/footer.html', 'footer-placeholder')
    ]);
    
    // 네비게이션 활성화 설정
    setActiveAdminNavigation();
    
    // 헤더의 햄버거 메뉴 기능 (헤더 로드 후 실행)
    initializeAdminHeaderFunctions();
});

// 관리자 헤더 관련 기능 초기화
function initializeAdminHeaderFunctions() {
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
    
    // 드롭다운 메뉴 기능 초기화
    initializeDropdownMenu();
}

// 드롭다운 메뉴 기능 초기화
function initializeDropdownMenu() {
    const dropdownItems = document.querySelectorAll('.nav-item.dropdown');
    
    dropdownItems.forEach(item => {
        const dropdownToggle = item.querySelector('.dropdown-toggle');
        const dropdownMenu = item.querySelector('.dropdown-menu');
        
        if (dropdownToggle && dropdownMenu) {
            // 클릭 이벤트로 드롭다운 토글
            dropdownToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // 다른 드롭다운 메뉴들 닫기
                closeAllDropdowns();
                
                // 현재 드롭다운 메뉴 토글
                item.classList.toggle('dropdown-open');
            });
            
            // 드롭다운 메뉴 아이템 클릭 이벤트
            const dropdownMenuItems = dropdownMenu.querySelectorAll('.dropdown-item');
            dropdownMenuItems.forEach(menuItem => {
                menuItem.addEventListener('click', function(e) {
                    // href가 있는 경우에만 페이지 이동 허용
                    if (menuItem.getAttribute('href') && menuItem.getAttribute('href') !== '#') {
                        // 페이지 이동을 위해 기본 동작 허용
                        return;
                    }
                    
                    e.preventDefault();
                    console.log('Selected:', menuItem.textContent);
                    // 여기에 실제 페이지 이동 로직을 추가할 수 있습니다
                    
                    // 드롭다운 메뉴 닫기
                    item.classList.remove('dropdown-open');
                });
            });
        }
    });
    
    // 외부 클릭 시 드롭다운 메뉴 닫기
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.nav-item.dropdown')) {
            closeAllDropdowns();
        }
    });
}

// 모든 드롭다운 메뉴 닫기
function closeAllDropdowns() {
    const dropdownItems = document.querySelectorAll('.nav-item.dropdown');
    dropdownItems.forEach(item => {
        item.classList.remove('dropdown-open');
    });
}
