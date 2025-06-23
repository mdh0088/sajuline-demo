/**
 * MyPage JavaScript Functionality
 * 마이페이지의 모든 상호작용과 기능을 관리합니다.
 */

class MyPageManager {
    constructor() {
        this.init();
    }

    /**
     * 마이페이지 초기화
     */
    init() {
        this.initializeEventListeners();
        this.loadUserData();
    }

    /**
     * 이벤트 리스너 설정
     */
    initializeEventListeners() {
        // 메뉴 아이템 클릭 효과
        const menuItems = document.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.addEventListener('click', (e) => this.handleMenuItemClick(e));
        });

        // 프로필 편집 버튼
        const profileEditBtn = document.querySelector('.profile-edit');
        if (profileEditBtn) {
            profileEditBtn.addEventListener('click', (e) => this.handleProfileEdit(e));
        }

        // 로그아웃 버튼
        const logoutBtn = document.querySelector('.logout-button');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.handleLogout());
        }

        // 포인트 충전/히스토리 버튼
        const chargeBtn = document.querySelector('.charge-button');
        const historyBtn = document.querySelector('.history-button');

        if (chargeBtn) {
            chargeBtn.addEventListener('click', () => this.navigateToPointCharge());
        }

        if (historyBtn) {
            historyBtn.addEventListener('click', () => this.navigateToPointHistory());
        }

        // 프리미엄 배너
        const premiumBanner = document.querySelector('.premium-banner');
        if (premiumBanner) {
            premiumBanner.addEventListener('click', () => this.handlePremiumUpgrade());
        }
    }

    /**
     * 메뉴 아이템 클릭 처리
     */
    handleMenuItemClick(event) {
        const item = event.currentTarget;
        
        // 클릭 피드백 효과
        item.style.background = 'rgba(255, 255, 255, 0.05)';
        
        setTimeout(() => {
            item.style.background = '';
        }, 200);

        // 메뉴별 네비게이션 처리
        const href = item.getAttribute('href');
        if (href && !href.startsWith('#')) {
            // 외부 링크는 기본 동작 유지
            return;
        }

        // 내부 네비게이션 처리
        event.preventDefault();
        this.handleInternalNavigation(item);
    }

    /**
     * 내부 네비게이션 처리
     */
    handleInternalNavigation(menuItem) {
        const menuTitle = menuItem.querySelector('.menu-title')?.textContent;
        
        switch (menuTitle) {
            case '상담 히스토리':
                this.navigateToConsultHistory();
                break;
            case '내 리뷰':
                this.navigateToMyReviews();
                break;
            case '결제 내역':
                this.navigateToPaymentHistory();
                break;
            case '설정':
                this.navigateToSettings();
                break;
            case '고객센터':
                this.navigateToCustomerService();
                break;
            case '이용약관':
                this.navigateToTerms();
                break;
            case '개인정보처리방침':
                this.navigateToPrivacy();
                break;
            default:
                console.log('Unknown menu item:', menuTitle);
        }
    }

    /**
     * 프로필 편집 처리
     */
    handleProfileEdit(event) {
        event.stopPropagation();
        
        // 프로필 편집 모달 또는 페이지 이동
        this.showProfileEditModal();
    }

    /**
     * 프로필 편집 모달 표시
     */
    showProfileEditModal() {
        // 간단한 알림으로 대체 (실제 구현에서는 모달 창 구현)
        alert('프로필 편집 기능을 준비중입니다.');
        
        // 실제 구현 예시:
        // const modal = document.createElement('div');
        // modal.className = 'profile-edit-modal';
        // document.body.appendChild(modal);
    }

    /**
     * 로그아웃 처리
     */
    handleLogout() {
        if (confirm('정말 로그아웃 하시겠습니까?')) {
            this.performLogout();
        }
    }

    /**
     * 로그아웃 실행
     */
    performLogout() {
        // 로컬 스토리지 정리
        localStorage.removeItem('user');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('authToken');
        
        // 세션 스토리지 정리
        sessionStorage.clear();
        
        // 로그인 페이지로 리다이렉트
        window.location.href = 'login-page.html';
    }

    /**
     * 사용자 데이터 로드
     */
    loadUserData() {
        const userData = this.getUserData();
        
        if (userData) {
            this.updateUserInterface(userData);
        }
    }

    /**
     * 사용자 데이터 가져오기
     */
    getUserData() {
        // 로컬 스토리지에서 사용자 데이터 로드
        const storedUser = localStorage.getItem('user');
        
        if (storedUser) {
            return JSON.parse(storedUser);
        }
        
        // 기본 사용자 데이터 (데모용)
        return {
            name: '홍길동',
            email: 'user@example.com',
            points: 1200,
            consultCount: 15,
            reviewCount: 8,
            memberLevel: 'GOLD'
        };
    }

    /**
     * UI 업데이트
     */
    updateUserInterface(userData) {
        // 프로필 정보 업데이트
        const profileName = document.querySelector('.profile-name');
        const profileEmail = document.querySelector('.profile-email');
        const pointValue = document.querySelector('.point-value');
        
        if (profileName) profileName.textContent = userData.name;
        if (profileEmail) profileEmail.textContent = userData.email;
        if (pointValue) pointValue.textContent = `${userData.points.toLocaleString()}P`;

        // 통계 정보 업데이트
        this.updateStats(userData);
    }

    /**
     * 통계 정보 업데이트
     */
    updateStats(userData) {
        const statValues = document.querySelectorAll('.stat-value');
        
        if (statValues.length >= 3) {
            statValues[0].textContent = userData.consultCount; // 상담 횟수
            statValues[1].textContent = userData.reviewCount;  // 리뷰 수
            statValues[2].textContent = userData.memberLevel;   // 멤버 레벨
        }
    }

    /**
     * 프리미엄 업그레이드 처리
     */
    handlePremiumUpgrade() {
        this.navigateToPremium();
    }

    /**
     * 네비게이션 함수들
     */
    navigateToPointCharge() {
        window.location.href = 'point.html';
    }

    navigateToPointHistory() {
        window.location.href = 'point_log.html';
    }

    navigateToConsultHistory() {
        window.location.href = 'cs_log.html';
    }

    navigateToMyReviews() {
        window.location.href = 'review-page.html';
    }

    navigateToPaymentHistory() {
        window.location.href = 'point_log.html';
    }

    navigateToSettings() {
        // 설정 페이지 (구현 필요)
        alert('설정 페이지를 준비중입니다.');
    }

    navigateToCustomerService() {
        window.location.href = 'inquiry-list.html';
    }

    navigateToTerms() {
        window.location.href = 'provision.html';
    }

    navigateToPrivacy() {
        window.location.href = 'privacy.html';
    }

    navigateToPremium() {
        window.location.href = 'member_benefit.html';
    }

    /**
     * 포인트 정보 새로고침
     */
    refreshPointInfo() {
        const userData = this.getUserData();
        this.updateUserInterface(userData);
    }

    /**
     * 정리
     */
    cleanup() {
        // 필요한 경우 이벤트 리스너 정리
    }
}

// DOM 로드 완료 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    window.myPageManager = new MyPageManager();
});

// 페이지 언로드 시 정리
window.addEventListener('beforeunload', () => {
    if (window.myPageManager) {
        window.myPageManager.cleanup();
    }
});

// 모듈 export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MyPageManager;
}