/**
 * Main Page JavaScript Functionality
 * 사주라인 메인 페이지의 모든 상호작용과 애니메이션을 관리합니다.
 */

class MainPageManager {
    constructor() {
        this.currentFilter = 'all';
        this.isStatsAnimating = false;
        this.lastTouchY = 0;
        
        this.init();
    }

    /**
     * 페이지 초기화
     */
    init() {
        this.initializeFortuneMeters();
        this.initializeLiveStats();
        this.initializeEventListeners();
        this.initializeTouchGestures();
    }

    /**
     * 운세 미터 애니메이션 초기화
     */
    initializeFortuneMeters() {
        setTimeout(() => {
            const meters = document.querySelectorAll('.meter-fill');
            meters.forEach(meter => {
                const width = meter.style.width || '0%';
                meter.style.width = '0%';
                setTimeout(() => {
                    meter.style.width = width;
                }, 100);
            });
        }, 500);
    }

    /**
     * 실시간 통계 업데이트
     */
    initializeLiveStats() {
        const updateStats = () => {
            const statNumbers = document.querySelectorAll('.stat-number');
            
            statNumbers.forEach(stat => {
                const currentValue = parseInt(stat.textContent.replace(/[^\d]/g, ''));
                const variation = this.generateRandomVariation(currentValue, 0.1);
                const newValue = Math.max(0, currentValue + variation);
                
                stat.textContent = this.formatNumber(newValue);
            });
        };

        // 3초마다 통계 업데이트
        setInterval(updateStats, 3000);
    }

    /**
     * 이벤트 리스너 초기화
     */
    initializeEventListeners() {
        // 필터 칩 클릭 이벤트
        const filterChips = document.querySelectorAll('.chip');
        filterChips.forEach(chip => {
            chip.addEventListener('click', (e) => this.handleFilterClick(e));
        });

        // 상담사 카드 클릭 이벤트
        const counselorCards = document.querySelectorAll('.counselor-card');
        counselorCards.forEach(card => {
            card.addEventListener('click', (e) => this.handleCounselorCardClick(e));
        });

        // 카테고리 카드 클릭 이벤트
        const categoryCards = document.querySelectorAll('.category-card');
        categoryCards.forEach(card => {
            card.addEventListener('click', (e) => this.handleCategoryCardClick(e));
        });

        // 플로팅 버튼 클릭 이벤트
        const floatingBtn = document.querySelector('.floating-button');
        if (floatingBtn) {
            floatingBtn.addEventListener('click', () => this.navigateToChat());
        }

        // CTA 버튼 이벤트
        const ctaButtons = document.querySelectorAll('.cta-button');
        ctaButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleCtaClick(e));
        });
    }

    /**
     * 터치 제스처 초기화
     */
    initializeTouchGestures() {
        const floatingBtn = document.querySelector('.floating-button');
        if (!floatingBtn) return;

        document.addEventListener('touchstart', (e) => {
            this.lastTouchY = e.touches[0].clientY;
        });

        document.addEventListener('touchend', (e) => {
            const touchEndY = e.changedTouches[0].clientY;
            const touchDiff = this.lastTouchY - touchEndY;

            // 위로 스와이프 감지 (50px 이상)
            if (touchDiff > 50) {
                floatingBtn.style.transform = 'scale(1.1)';
                setTimeout(() => {
                    floatingBtn.style.transform = 'scale(1)';
                }, 200);
            }
        });
    }

    /**
     * 필터 클릭 핸들러
     */
    handleFilterClick(event) {
        const chip = event.currentTarget;
        const filter = chip.getAttribute('data-filter') || 'all';

        // 모든 칩에서 active 클래스 제거
        document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
        
        // 클릭된 칩에 active 클래스 추가
        chip.classList.add('active');
        
        this.currentFilter = filter;
        this.filterCounselors(filter);
    }

    /**
     * 상담사 필터링
     */
    filterCounselors(filter) {
        const counselorCards = document.querySelectorAll('.counselor-card');
        
        counselorCards.forEach(card => {
            if (filter === 'all') {
                card.style.display = 'block';
            } else {
                const specialty = card.getAttribute('data-specialty');
                card.style.display = specialty === filter ? 'block' : 'none';
            }
        });
    }

    /**
     * 상담사 카드 클릭 핸들러
     */
    handleCounselorCardClick(event) {
        const card = event.currentTarget;
        const counselorId = card.getAttribute('data-counselor-id');
        
        // 클릭 애니메이션
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = 'scale(1)';
        }, 150);

        // 상담사 상세 페이지로 이동
        setTimeout(() => {
            this.navigateToDetail(counselorId);
        }, 200);
    }

    /**
     * 카테고리 카드 클릭 핸들러
     */
    handleCategoryCardClick(event) {
        const card = event.currentTarget;
        const category = card.getAttribute('data-category');
        
        // 클릭 애니메이션
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = 'scale(1)';
        }, 150);

        // 카테고리별 상담사 목록으로 이동
        setTimeout(() => {
            this.navigateToCategory(category);
        }, 200);
    }

    /**
     * CTA 버튼 클릭 핸들러
     */
    handleCtaClick(event) {
        const button = event.currentTarget;
        const action = button.getAttribute('data-action');

        switch (action) {
            case 'ai-fortune':
                this.navigateToAIFortune();
                break;
            case 'find-counselor':
                this.navigateToSearch();
                break;
            default:
                this.navigateToSearch();
                break;
        }
    }

    /**
     * 네비게이션 함수들
     */
    navigateToSearch() {
        window.location.href = 'search-page.html';
    }

    navigateToLogin() {
        window.location.href = 'login-page.html';
    }

    navigateToAIFortune() {
        window.location.href = 'ai-fortune-complete.html';
    }

    navigateToDetail(counselorId = 'myungwol') {
        window.location.href = `detail.html?counselor=${counselorId}`;
    }

    navigateToCategory(category) {
        window.location.href = `search-page.html?category=${category}`;
    }

    navigateToMyPage() {
        window.location.href = 'mypage.html';
    }

    navigateToChat() {
        window.location.href = 'chatting.html';
    }

    navigateToPoint() {
        window.location.href = 'point.html';
    }

    /**
     * 유틸리티 함수들
     */
    generateRandomVariation(baseValue, percentage) {
        const maxVariation = Math.floor(baseValue * percentage);
        return Math.floor(Math.random() * (maxVariation * 2 + 1)) - maxVariation;
    }

    formatNumber(num) {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    /**
     * 페이지 언로드 시 정리
     */
    cleanup() {
        // 필요한 경우 이벤트 리스너 정리
    }
}

// DOM이 로드되면 메인 페이지 매니저 초기화
document.addEventListener('DOMContentLoaded', () => {
    window.mainPageManager = new MainPageManager();
});

// 페이지 언로드 시 정리
window.addEventListener('beforeunload', () => {
    if (window.mainPageManager) {
        window.mainPageManager.cleanup();
    }
});

// 모듈 export (필요한 경우)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MainPageManager;
}