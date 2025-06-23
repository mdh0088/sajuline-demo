/**
 * Login Page JavaScript
 * Handles form validation, authentication, and social login functionality
 * for the 사주라인 (Saju Line) application
 */

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeLoginPage();
});

/**
 * Initialize login page functionality
 */
function initializeLoginPage() {
    setupRememberMeCheckbox();
    setupLoginForm();
    setupSocialLoginButtons();
}

/**
 * Setup remember me checkbox functionality
 */
function setupRememberMeCheckbox() {
    const rememberCheckbox = document.getElementById('remember');
    if (rememberCheckbox) {
        rememberCheckbox.addEventListener('click', function() {
            this.classList.toggle('checked');
        });
    }
}

/**
 * Setup login form submission and validation
 */
function setupLoginForm() {
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginSubmit);
    }
}

/**
 * Handle login form submission
 * @param {Event} e - Form submission event
 */
function handleLoginSubmit(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    
    // Input validation
    if (!validateLoginInputs(email, password)) {
        return;
    }
    
    // Show loading state
    showLoadingOverlay();
    
    // Simulate API call - replace with actual authentication
    authenticateUser(email, password);
}

/**
 * Validate login form inputs
 * @param {string} email - Email input value
 * @param {string} password - Password input value
 * @returns {boolean} - Validation result
 */
function validateLoginInputs(email, password) {
    // Check if fields are empty
    if (!email || !password) {
        showError('이메일과 비밀번호를 입력해주세요.');
        return false;
    }
    
    // Validate email format
    if (!isValidEmail(email)) {
        showError('올바른 이메일 형식이 아닙니다.');
        return false;
    }
    
    return true;
}

/**
 * Validate email format using regex
 * @param {string} email - Email to validate
 * @returns {boolean} - Validation result
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Authenticate user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 */
function authenticateUser(email, password) {
    // TODO: Replace with actual API call
    // Example: fetch('/api/login', { method: 'POST', body: JSON.stringify({ email, password }) })
    
    // Simulate API response delay
    setTimeout(() => {
        hideLoadingOverlay();
        
        // For demo purposes - replace with actual authentication logic
        if (email === 'demo@example.com' && password === 'password123') {
            handleLoginSuccess();
        } else {
            handleLoginError('이메일 또는 비밀번호가 올바르지 않습니다.');
        }
    }, 1000);
}

/**
 * Handle successful login
 */
function handleLoginSuccess() {
    // Save login state if remember me is checked
    const rememberMe = document.getElementById('remember').classList.contains('checked');
    if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
        localStorage.setItem('userEmail', document.getElementById('email').value);
    }
    
    // Redirect to main page
    window.location.href = 'main.html';
}

/**
 * Handle login error
 * @param {string} errorMessage - Error message to display
 */
function handleLoginError(errorMessage) {
    showError(errorMessage);
}

/**
 * Display error message to user
 * @param {string} message - Error message to display
 */
function showError(message) {
    const errorElement = document.querySelector('.error-message');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
        
        // Auto-hide error message after 3 seconds
        setTimeout(() => {
            errorElement.classList.remove('show');
        }, 3000);
    }
}

/**
 * Show loading overlay
 */
function showLoadingOverlay() {
    const loadingOverlay = document.querySelector('.loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.style.display = 'flex';
    }
}

/**
 * Hide loading overlay
 */
function hideLoadingOverlay() {
    const loadingOverlay = document.querySelector('.loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.style.display = 'none';
    }
}

/**
 * Setup social login buttons
 */
function setupSocialLoginButtons() {
    const socialButtons = document.querySelectorAll('.social-button');
    socialButtons.forEach(button => {
        button.addEventListener('click', handleSocialLogin);
    });
}

/**
 * Handle social login button clicks
 * @param {Event} e - Click event
 */
function handleSocialLogin(e) {
    const provider = e.currentTarget.textContent.trim();
    console.log(`${provider} 로그인 시도`);
    
    // Determine provider type
    let providerType = 'unknown';
    if (provider.includes('카카오')) {
        providerType = 'kakao';
    } else if (provider.includes('네이버')) {
        providerType = 'naver';
    } else if (provider.includes('Apple')) {
        providerType = 'apple';
    } else if (provider.includes('Google')) {
        providerType = 'google';
    }
    
    // Handle social login based on provider
    switch (providerType) {
        case 'kakao':
            handleKakaoLogin();
            break;
        case 'naver':
            handleNaverLogin();
            break;
        case 'apple':
            handleAppleLogin();
            break;
        case 'google':
            handleGoogleLogin();
            break;
        default:
            console.warn('Unknown social login provider:', provider);
    }
}

/**
 * Handle Kakao login
 */
function handleKakaoLogin() {
    // TODO: Implement Kakao SDK integration
    console.log('Kakao 로그인 처리');
    showError('카카오 로그인 기능은 준비 중입니다.');
}

/**
 * Handle Naver login
 */
function handleNaverLogin() {
    // TODO: Implement Naver SDK integration
    console.log('네이버 로그인 처리');
    showError('네이버 로그인 기능은 준비 중입니다.');
}

/**
 * Handle Apple login
 */
function handleAppleLogin() {
    // TODO: Implement Apple Sign-In integration
    console.log('Apple 로그인 처리');
    showError('Apple 로그인 기능은 준비 중입니다.');
}

/**
 * Handle Google login
 */
function handleGoogleLogin() {
    // TODO: Implement Google Sign-In integration
    console.log('Google 로그인 처리');
    showError('Google 로그인 기능은 준비 중입니다.');
}

/**
 * Load saved login preferences
 */
function loadSavedPreferences() {
    const rememberMe = localStorage.getItem('rememberMe');
    const savedEmail = localStorage.getItem('userEmail');
    
    if (rememberMe === 'true' && savedEmail) {
        const emailInput = document.getElementById('email');
        const rememberCheckbox = document.getElementById('remember');
        
        if (emailInput) {
            emailInput.value = savedEmail;
        }
        
        if (rememberCheckbox) {
            rememberCheckbox.classList.add('checked');
        }
    }
}

// Load saved preferences when page loads
document.addEventListener('DOMContentLoaded', loadSavedPreferences);