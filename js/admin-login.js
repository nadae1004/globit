/**
 * Admin Login JavaScript
 * 관리자 로그인 페이지 기능 구현 - 피그마 디자인 기반
 */

document.addEventListener('DOMContentLoaded', function() {
    // DOM 요소들
    const loginForm = document.getElementById('adminLoginForm');
    const adminIdInput = document.getElementById('adminId');
    const adminPasswordInput = document.getElementById('adminPassword');
    const loginButton = document.querySelector('.login-button');

    // 로그인 폼 제출 이벤트
    loginForm.addEventListener('submit', handleLogin);

    // 입력 필드 이벤트
    adminIdInput.addEventListener('input', clearInputError);
    adminPasswordInput.addEventListener('input', clearInputError);

    // 엔터 키 이벤트
    adminIdInput.addEventListener('keypress', handleKeyPress);
    adminPasswordInput.addEventListener('keypress', handleKeyPress);

    /**
     * 로그인 처리 함수
     */
    async function handleLogin(event) {
        event.preventDefault();
        
        // 입력값 검증
        if (!validateInputs()) {
            return;
        }

        // 로딩 상태 설정
        setLoadingState(true);

        try {
            // 로그인 API 호출 (실제 구현 시 서버 엔드포인트로 변경)
            const loginData = {
                adminId: adminIdInput.value.trim(),
                password: adminPasswordInput.value.trim()
            };

            // 시뮬레이션된 로그인 처리 (실제 구현 시 제거)
            await simulateLogin(loginData);

            // 로그인 성공 처리
            handleLoginSuccess();

        } catch (error) {
            // 로그인 실패 처리
            handleLoginError(error.message);
        } finally {
            // 로딩 상태 해제
            setLoadingState(false);
        }
    }

    /**
     * 입력값 검증
     */
    function validateInputs() {
        let isValid = true;

        // 아이디 검증
        if (!adminIdInput.value.trim()) {
            showInputError(adminIdInput, '아이디를 입력해주세요.');
            isValid = false;
        } else if (adminIdInput.value.trim().length < 3) {
            showInputError(adminIdInput, '아이디는 최소 3자 이상 입력해주세요.');
            isValid = false;
        }

        // 비밀번호 검증
        if (!adminPasswordInput.value.trim()) {
            showInputError(adminPasswordInput, '비밀번호를 입력해주세요.');
            isValid = false;
        } else if (adminPasswordInput.value.trim().length < 6) {
            showInputError(adminPasswordInput, '비밀번호는 최소 6자 이상 입력해주세요.');
            isValid = false;
        }

        return isValid;
    }

    /**
     * 입력 필드 에러 표시
     */
    function showInputError(input, message) {
        const wrapper = input.closest('.input-wrapper');
        wrapper.classList.add('error');
        
        // 기존 에러 메시지 제거
        const existingError = wrapper.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // 새로운 에러 메시지 추가
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = message;
        wrapper.parentNode.appendChild(errorMessage);

        // 입력 필드에 포커스
        input.focus();
    }

    /**
     * 입력 필드 에러 제거
     */
    function clearInputError(event) {
        const input = event.target;
        const wrapper = input.closest('.input-wrapper');
        wrapper.classList.remove('error');
        
        const errorMessage = wrapper.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    /**
     * 로딩 상태 설정
     */
    function setLoadingState(isLoading) {
        if (isLoading) {
            loginButton.classList.add('loading');
            loginButton.disabled = true;
            loginButton.innerHTML = `
                <span>로그인 중...</span>
            `;
        } else {
            loginButton.classList.remove('loading');
            loginButton.disabled = false;
            loginButton.innerHTML = `
                <span>로그인</span>
            `;
        }
    }

    /**
     * 로그인 성공 처리
     */
    function handleLoginSuccess() {
        // 성공 메시지 표시 (실제 구현 시 토스트 알림 등 사용)
        showSuccessMessage('로그인에 성공했습니다. 관리자 페이지로 이동합니다.');
        
        // 관리자 대시보드로 리다이렉트 (실제 구현 시 적절한 URL로 변경)
        setTimeout(() => {
            // window.location.href = '/admin-dashboard.html';
            console.log('관리자 대시보드로 이동');
        }, 1500);
    }

    /**
     * 로그인 실패 처리
     */
    function handleLoginError(errorMessage) {
        // 일반적인 에러 메시지 표시
        showInputError(adminPasswordInput, '아이디 또는 비밀번호가 올바르지 않습니다.');
        
        // 비밀번호 필드 초기화
        adminPasswordInput.value = '';
        adminPasswordInput.focus();
    }

    /**
     * 성공 메시지 표시
     */
    function showSuccessMessage(message) {
        // 임시 성공 메시지 (실제 구현 시 토스트 알림 컴포넌트 사용)
        const successDiv = document.createElement('div');
        successDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #2ed573;
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(46, 213, 115, 0.3);
            z-index: 10000;
            font-weight: 500;
            animation: slideIn 0.3s ease-out;
            font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif;
        `;
        successDiv.textContent = message;
        
        // 애니메이션 스타일 추가
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(successDiv);
        
        // 3초 후 제거
        setTimeout(() => {
            successDiv.remove();
            style.remove();
        }, 3000);
    }

    /**
     * 엔터 키 처리
     */
    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleLogin(event);
        }
    }

    /**
     * 로그인 시뮬레이션 (실제 구현 시 제거)
     */
    async function simulateLogin(loginData) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // 시뮬레이션된 로그인 검증
                if (loginData.adminId === 'admin' && loginData.password === 'admin123') {
                    resolve({ success: true });
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }, 1500); // 1.5초 지연으로 로딩 상태 시연
        });
    }

    /**
     * 실제 로그인 API 호출 (실제 구현 시 사용)
     */
    async function callLoginAPI(loginData) {
        try {
            const response = await fetch('/api/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData)
            });

            if (!response.ok) {
                throw new Error('로그인에 실패했습니다.');
            }

            const result = await response.json();
            
            // 토큰 저장 (실제 구현 시 적절한 저장 방식 사용)
            if (result.token) {
                localStorage.setItem('adminToken', result.token);
            }

            return result;
        } catch (error) {
            throw new Error('서버 연결에 실패했습니다.');
        }
    }

    /**
     * 자동 로그인 확인 (페이지 로드 시)
     */
    function checkAutoLogin() {
        const token = localStorage.getItem('adminToken');
        if (token) {
            // 토큰이 있으면 관리자 페이지로 리다이렉트
            // window.location.href = '/admin-dashboard.html';
            console.log('자동 로그인: 토큰이 존재합니다.');
        }
    }

    // 페이지 로드 시 자동 로그인 확인
    checkAutoLogin();

    /**
     * 보안 기능: 일정 시간 후 자동 로그아웃
     */
    let inactivityTimer;
    
    function resetInactivityTimer() {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(() => {
            // 자동 로그아웃 처리
            localStorage.removeItem('adminToken');
            window.location.href = '/admin-login.html';
        }, 30 * 60 * 1000); // 30분
    }

    // 사용자 활동 감지
    ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
        document.addEventListener(event, resetInactivityTimer, true);
    });

    // 페이지 로드 시 타이머 시작
    resetInactivityTimer();
});
