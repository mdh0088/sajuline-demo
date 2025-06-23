/**
 * Login Page JavaScript Functionality
 * 로그인 페이지의 모든 인증 및 폼 관리 기능을 담당합니다.
 */

class LoginManager {
    constructor() {
        this.isLoading = false;
        this.rememberMe = false;
        
        this.init();
    }

    /**
     * 로그인 페이지 초기화
     */
    init() {
        this.initializeEventListeners();
        this.loadSavedPreferences();
        this.setupFormValidation();
    }

    /**
     * 이벤트 리스너 설정
     */
    initializeEventListeners() {
        // 로그인 폼 제출
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLoginSubmit(e));
        }

        // Remember me 체크박스
        const rememberCheckbox = document.querySelector('.checkbox');
        if (rememberCheckbox) {
            rememberCheckbox.addEventListener('click', () => this.toggleRememberMe());
        }

        // 소셜 로그인 버튼들
        this.setupSocialLoginButtons();

        // 입력 필드 실시간 검증
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        
        if (emailInput) {
            emailInput.addEventListener('input', () => this.validateEmail());
            emailInput.addEventListener('blur', () => this.validateEmail());
        }
        
        if (passwordInput) {
            passwordInput.addEventListener('input', () => this.validatePassword());
        }

        // Enter 키로 로그인
        const inputs = document.querySelectorAll('.input-field');
        inputs.forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleLoginSubmit(e);
                }
            });
        });
    }

    /**
     * 소셜 로그인 버튼 설정
     */
    setupSocialLoginButtons() {
        const socialButtons = {
            '.kakao-button': 'kakao',
            '.naver-button': 'naver',
            '.apple-button': 'apple',
            '.google-button': 'google'
        };

        Object.entries(socialButtons).forEach(([selector, provider]) => {
            const button = document.querySelector(selector);
            if (button) {
                button.addEventListener('click', () => this.handleSocialLogin(provider));
            }
        });
    }

    /**
     * 폼 검증 설정
     */
    setupFormValidation() {
        const inputs = document.querySelectorAll('.input-field');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                this.hideError();
            });
        });
    }

    /**
     * 로그인 폼 제출 처리
     */
    async handleLoginSubmit(event) {
        event.preventDefault();
        
        if (this.isLoading) return;

        const email = document.getElementById('email')?.value.trim();
        const password = document.getElementById('password')?.value;

        // 입력 검증
        if (!this.validateLoginInputs(email, password)) {
            return;
        }

        this.showLoading();

        try {
            // 인증 시도
            const result = await this.authenticateUser(email, password);
            
            if (result.success) {
                this.handleLoginSuccess(result.user);
            } else {
                this.handleLoginError(result.error || '로그인에 실패했습니다.');
            }
        } catch (error) {
            console.error('Login error:', error);
            this.handleLoginError('네트워크 오류가 발생했습니다.');
        } finally {
            this.hideLoading();
        }
    }

    /**
     * 입력값 검증
     */
    validateLoginInputs(email, password) {
        if (!email) {
            this.showError('이메일을 입력해주세요.');
            document.getElementById('email')?.focus();
            return false;
        }

        if (!this.isValidEmail(email)) {
            this.showError('올바른 이메일 형식을 입력해주세요.');
            document.getElementById('email')?.focus();
            return false;
        }

        if (!password) {
            this.showError('비밀번호를 입력해주세요.');
            document.getElementById('password')?.focus();
            return false;
        }

        if (password.length < 6) {
            this.showError('비밀번호는 6자리 이상이어야 합니다.');
            document.getElementById('password')?.focus();
            return false;
        }

        return true;
    }

    /**
     * 이메일 형식 검증
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * 실시간 이메일 검증
     */
    validateEmail() {
        const emailInput = document.getElementById('email');
        const email = emailInput?.value.trim();
        
        if (email && !this.isValidEmail(email)) {
            emailInput.style.borderColor = 'rgba(255, 59, 48, 0.5)';
        } else {
            emailInput.style.borderColor = '';
        }
    }

    /**
     * 실시간 비밀번호 검증
     */
    validatePassword() {
        const passwordInput = document.getElementById('password');
        const password = passwordInput?.value;
        
        if (password && password.length < 6) {
            passwordInput.style.borderColor = 'rgba(255, 59, 48, 0.5)';
        } else {
            passwordInput.style.borderColor = '';
        }
    }

    /**
     * 사용자 인증 (API 호출)
     */
    async authenticateUser(email, password) {
        // 실제 구현에서는 실제 API를 호출해야 함
        return new Promise((resolve) => {
            setTimeout(() => {
                // 데모용 인증 로직
                if (email === 'demo@sajuline.com' && password === 'demo123') {
                    resolve({
                        success: true,
                        user: {
                            id: 1,
                            email: email,
                            name: '홍길동',
                            points: 50000
                        }
                    });
                } else {
                    resolve({
                        success: false,
                        error: '이메일 또는 비밀번호가 올바르지 않습니다.'
                    });
                }
            }, 1500); // 실제 API 호출 시뮬레이션
        });
    }

    /**
     * 로그인 성공 처리
     */
    handleLoginSuccess(user) {
        // 사용자 정보 저장
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('isLoggedIn', 'true');
        
        // Remember me 처리
        if (this.rememberMe) {
            localStorage.setItem('savedEmail', user.email);
            localStorage.setItem('rememberMe', 'true');
        } else {
            localStorage.removeItem('savedEmail');
            localStorage.removeItem('rememberMe');
        }

        // 성공 메시지
        this.showSuccess('로그인 성공!');

        // 메인 페이지로 리다이렉트
        setTimeout(() => {
            window.location.href = 'main.html';
        }, 1000);
    }

    /**
     * 로그인 실패 처리
     */
    handleLoginError(errorMessage) {
        this.showError(errorMessage);
        
        // 입력 필드 초점
        setTimeout(() => {
            document.getElementById('email')?.focus();
        }, 100);
    }

    /**
     * Remember Me 토글
     */
    toggleRememberMe() {
        const checkbox = document.querySelector('.checkbox');
        if (!checkbox) return;

        this.rememberMe = !this.rememberMe;
        
        if (this.rememberMe) {
            checkbox.classList.add('checked');
        } else {
            checkbox.classList.remove('checked');
        }
    }

    /**
     * 저장된 설정 로드
     */
    loadSavedPreferences() {
        const savedEmail = localStorage.getItem('savedEmail');
        const rememberMe = localStorage.getItem('rememberMe') === 'true';
        
        if (savedEmail && rememberMe) {
            const emailInput = document.getElementById('email');
            if (emailInput) {
                emailInput.value = savedEmail;
            }
            
            this.rememberMe = true;
            const checkbox = document.querySelector('.checkbox');
            if (checkbox) {
                checkbox.classList.add('checked');
            }
        }
    }

    /**
     * 소셜 로그인 처리
     */
    handleSocialLogin(provider) {
        this.showLoading();
        
        // 실제 구현에서는 각 소셜 로그인 SDK를 사용
        switch (provider) {
            case 'kakao':
                this.initKakaoLogin();
                break;
            case 'naver':
                this.initNaverLogin();
                break;
            case 'apple':
                this.initAppleLogin();
                break;
            case 'google':
                this.initGoogleLogin();
                break;
        }
    }

    /**
     * 카카오 로그인 초기화
     */
    initKakaoLogin() {
        // 카카오 SDK 구현 필요
        console.log('Kakao login initiated');
        setTimeout(() => {
            this.hideLoading();
            // 데모용 성공 처리
            this.handleLoginSuccess({
                id: 2,
                email: 'kakao@user.com',
                name: '카카오 사용자',
                points: 30000
            });
        }, 2000);
    }

    /**
     * 네이버 로그인 초기화
     */
    initNaverLogin() {
        // 네이버 SDK 구현 필요
        console.log('Naver login initiated');
        setTimeout(() => {
            this.hideLoading();
        }, 2000);
    }

    /**
     * 애플 로그인 초기화
     */
    initAppleLogin() {
        // 애플 SDK 구현 필요
        console.log('Apple login initiated');
        setTimeout(() => {
            this.hideLoading();
        }, 2000);
    }

    /**
     * 구글 로그인 초기화
     */
    initGoogleLogin() {
        // 구글 SDK 구현 필요
        console.log('Google login initiated');
        setTimeout(() => {
            this.hideLoading();
        }, 2000);
    }

    /**
     * UI 유틸리티 함수들
     */
    showLoading() {
        this.isLoading = true;
        const overlay = document.querySelector('.loading-overlay');
        const button = document.querySelector('.login-button');
        
        if (overlay) overlay.style.display = 'flex';
        if (button) button.disabled = true;
    }

    hideLoading() {
        this.isLoading = false;
        const overlay = document.querySelector('.loading-overlay');
        const button = document.querySelector('.login-button');
        
        if (overlay) overlay.style.display = 'none';
        if (button) button.disabled = false;
    }

    showError(message) {
        const errorElement = document.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
            
            // 3초 후 자동 숨김
            setTimeout(() => {
                this.hideError();
            }, 3000);
        }
    }

    hideError() {
        const errorElement = document.querySelector('.error-message');
        if (errorElement) {
            errorElement.classList.remove('show');
        }
    }

    showSuccess(message) {
        // 성공 메시지 표시 (필요시 구현)
        console.log('Success:', message);
    }

    /**
     * 네비게이션 함수들
     */
    navigateToSignup() {
        window.location.href = 'signup-page.html';
    }

    navigateToMain() {
        window.location.href = 'main.html';
    }

    navigateToForgotPassword() {
        window.location.href = 'forgot-password.html';
    }
}

// DOM 로드 완료 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    window.loginManager = new LoginManager();
});

// 모듈 export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LoginManager;
}