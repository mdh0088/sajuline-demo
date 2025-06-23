/**
 * Main.js - JavaScript functionality for the Fortune Telling App
 * Handles UI interactions, animations, data updates, and touch gestures
 */

// ============================================================================
// DOM READY FUNCTIONS
// ============================================================================

/**
 * Initialize fortune meter animations after page load
 */
function initializeFortureMeters() {
    setTimeout(() => {
        document.querySelectorAll('.meter-fill').forEach(meter => {
            // Re-trigger the CSS animation by setting the width property
            meter.style.width = meter.style.width;
        });
    }, 500);
}

// ============================================================================
// REAL-TIME DATA UPDATES
// ============================================================================

/**
 * Simulate real-time statistics updates
 * Updates the consulting count with small random variations
 */
function startLiveStatUpdates() {
    setInterval(() => {
        const statNumbers = document.querySelectorAll('.stat-number');
        const currentConsulting = statNumbers[0];
        
        if (currentConsulting) {
            const currentNum = parseInt(currentConsulting.textContent.replace(',', ''));
            const variation = Math.floor(Math.random() * 10) - 5; // Random variation between -5 and +5
            const newNum = Math.max(1200, currentNum + variation); // Minimum 1200
            currentConsulting.textContent = newNum.toLocaleString();
        }
    }, 3000); // Update every 3 seconds
}

// ============================================================================
// FILTER CHIP INTERACTIONS
// ============================================================================

/**
 * Handle filter chip selection
 * Manages active state for counselor filter chips
 */
function initializeFilterChips() {
    document.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', function() {
            // Remove active class from all chips
            document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked chip
            this.classList.add('active');
        });
    });
}

// ============================================================================
// TOUCH GESTURE HANDLING
// ============================================================================

let touchStartY = 0;
let touchEndY = 0;

/**
 * Initialize touch gesture detection for mobile interactions
 */
function initializeTouchGestures() {
    document.addEventListener('touchstart', (e) => {
        touchStartY = e.changedTouches[0].screenY;
    });

    document.addEventListener('touchend', (e) => {
        touchEndY = e.changedTouches[0].screenY;
        handleSwipeGesture();
    });
}

/**
 * Handle swipe gestures
 * Provides visual feedback for upward swipes
 */
function handleSwipeGesture() {
    const swipeThreshold = 50;
    
    if (touchEndY < touchStartY - swipeThreshold) {
        // Upward swipe detected
        const floatingButton = document.querySelector('.floating-button');
        
        if (floatingButton) {
            // Add scale animation to floating button
            floatingButton.style.transform = 'scale(0.9)';
            
            setTimeout(() => {
                floatingButton.style.transform = 'scale(1)';
            }, 200);
        }
    }
}

// ============================================================================
// CARD INTERACTION EFFECTS
// ============================================================================

/**
 * Add click effects to interactive cards
 * Provides visual feedback when cards are tapped
 */
function initializeCardEffects() {
    document.querySelectorAll('.counselor-card, .category-card').forEach(card => {
        card.addEventListener('click', function() {
            // Scale down effect on click
            this.style.transform = 'scale(0.98)';
            
            // Return to normal size after brief delay
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 200);
        });
    });
}

// ============================================================================
// NAVIGATION FUNCTIONS
// ============================================================================

/**
 * Navigate to search page
 */
function navigateToSearch() {
    window.location.href = 'search-page.html';
}

/**
 * Navigate to login page
 */
function navigateToLogin() {
    window.location.href = 'login-page.html';
}

/**
 * Navigate to AI fortune page
 */
function navigateToAIFortune() {
    window.location.href = 'ai-fortune-complete.html';
}

/**
 * Navigate to AI counselor selection page
 */
function navigateToAICounselor() {
    window.location.href = 'ai_cs2.html';
}

/**
 * Navigate to detail page
 */
function navigateToDetail() {
    location.href = 'detail.html';
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Format numbers with locale-specific thousand separators
 * @param {number} num - The number to format
 * @returns {string} - Formatted number string
 */
function formatNumber(num) {
    return num.toLocaleString();
}

/**
 * Generate random variation for statistics
 * @param {number} base - Base number
 * @param {number} range - Range of variation (±)
 * @param {number} min - Minimum allowed value
 * @returns {number} - New number with random variation
 */
function generateRandomVariation(base, range = 5, min = 1200) {
    const variation = Math.floor(Math.random() * (range * 2 + 1)) - range;
    return Math.max(min, base + variation);
}

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialize all interactive features when DOM is loaded
 */
function initializeApp() {
    // Initialize fortune meter animations
    initializeFortureMeters();
    
    // Start real-time stat updates
    startLiveStatUpdates();
    
    // Initialize filter chips
    initializeFilterChips();
    
    // Initialize touch gestures
    initializeTouchGestures();
    
    // Initialize card effects
    initializeCardEffects();
}

// ============================================================================
// EVENT LISTENERS
// ============================================================================

// Initialize app when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    // DOM is already loaded
    initializeApp();
}

// Export functions for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeApp,
        navigateToSearch,
        navigateToLogin,
        navigateToAIFortune,
        navigateToAICounselor,
        navigateToDetail,
        formatNumber,
        generateRandomVariation
    };
}