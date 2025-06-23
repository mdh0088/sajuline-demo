// Chat Functionality for 사주라인 (Saju Line) Chat Interface
// This module handles chat messaging, timers, quick questions, and tarot card interactions

class ChatManager {
    constructor() {
        this.chatContainer = document.querySelector('.chat-container');
        this.inputField = document.querySelector('.input-field');
        this.sendButton = document.querySelector('.send-button');
        this.typingIndicator = document.querySelector('.typing-indicator');
        this.timerElement = document.querySelector('.timer span:last-child');
        
        this.seconds = 754; // Initial timer value (12:34)
        
        this.init();
    }

    init() {
        this.startTimer();
        this.setupQuickQuestions();
        this.setupMessageSending();
        this.setupTarotCards();
    }

    // Timer functionality
    startTimer() {
        setInterval(() => {
            this.seconds++;
            const minutes = Math.floor(this.seconds / 60);
            const secs = this.seconds % 60;
            
            if (this.timerElement) {
                this.timerElement.textContent = 
                    `${minutes}:${secs.toString().padStart(2, '0')}`;
            }
        }, 1000);
    }

    // Quick question buttons functionality
    setupQuickQuestions() {
        const quickQuestions = document.querySelectorAll('.quick-question');
        
        quickQuestions.forEach(btn => {
            btn.addEventListener('click', () => {
                if (this.inputField) {
                    this.inputField.value = btn.textContent;
                    this.inputField.focus();
                }
            });
        });
    }

    // Message sending functionality
    setupMessageSending() {
        if (this.sendButton) {
            this.sendButton.addEventListener('click', () => this.sendMessage());
        }
        
        if (this.inputField) {
            this.inputField.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }
    }

    sendMessage() {
        const message = this.inputField.value.trim();
        if (!message) return;

        // Create user message element
        this.addUserMessage(message);
        
        // Clear input field
        this.inputField.value = '';

        // Show typing indicator after a delay
        setTimeout(() => {
            this.showTypingIndicator();
            
            // Simulate counselor response after typing
            setTimeout(() => {
                this.hideTypingIndicator();
                this.addCounselorResponse(message);
            }, 2000);
        }, 1000);
    }

    addUserMessage(message) {
        const messageElement = this.createMessageElement(message, 'user');
        this.appendMessage(messageElement);
    }

    addCounselorResponse(userMessage) {
        // Simple response logic - in a real app, this would connect to a backend
        const response = this.generateCounselorResponse(userMessage);
        const messageElement = this.createMessageElement(response, 'counselor');
        this.appendMessage(messageElement);
    }

    createMessageElement(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const currentTime = new Date().toLocaleTimeString('ko-KR', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });

        if (sender === 'counselor') {
            messageDiv.innerHTML = `
                <div class="message-avatar">🌙</div>
                <div class="message-content">
                    <div class="message-bubble">${text}</div>
                    <div class="message-time">${currentTime}</div>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-content">
                    <div class="message-bubble">${text}</div>
                    <div class="message-time">${currentTime}</div>
                </div>
            `;
        }

        return messageDiv;
    }

    appendMessage(messageElement) {
        // Insert before typing indicator
        if (this.typingIndicator) {
            this.chatContainer.insertBefore(messageElement, this.typingIndicator);
        } else {
            this.chatContainer.appendChild(messageElement);
        }
        
        // Scroll to bottom
        this.scrollToBottom();
    }

    showTypingIndicator() {
        if (this.typingIndicator) {
            this.typingIndicator.style.display = 'flex';
            this.scrollToBottom();
        }
    }

    hideTypingIndicator() {
        if (this.typingIndicator) {
            this.typingIndicator.style.display = 'none';
        }
    }

    scrollToBottom() {
        this.chatContainer.scrollTop = this.chatContainer.scrollHeight;
    }

    generateCounselorResponse(userMessage) {
        // Simple response generation - in a real app, this would be more sophisticated
        const responses = [
            "네, 말씀해주신 내용을 잘 들었습니다. 더 자세히 설명해주실 수 있나요?",
            "그런 상황이시군요. 마음이 많이 복잡하시겠어요. 😔",
            "이해합니다. 타로카드를 통해 더 깊이 살펴보겠습니다.",
            "좋은 질문이에요. 현재 상황을 종합해보면...",
            "네, 그 부분이 중요하네요. 조금 더 시간을 두고 지켜보시는 것이 좋겠습니다."
        ];
        
        return responses[Math.floor(Math.random() * responses.length)];
    }

    // Tarot card functionality
    setupTarotCards() {
        const tarotCards = document.querySelectorAll('.tarot-card');
        
        tarotCards.forEach(card => {
            card.addEventListener('click', () => {
                this.flipTarotCard(card);
            });
        });
    }

    flipTarotCard(card) {
        if (card.classList.contains('flipped')) return;
        
        card.textContent = '✨';
        card.style.transform = 'rotateY(180deg)';
        card.classList.add('flipped');
        
        // Update tarot result text
        const tarotResult = document.querySelector('.tarot-result');
        if (tarotResult) {
            const flippedCards = document.querySelectorAll('.tarot-card.flipped');
            if (flippedCards.length === 1) {
                tarotResult.textContent = '첫 번째 카드를 선택하셨습니다. 계속 선택해주세요.';
            } else if (flippedCards.length === 2) {
                tarotResult.textContent = '두 번째 카드까지 선택하셨습니다. 마지막 카드를 선택해주세요.';
            } else if (flippedCards.length === 3) {
                tarotResult.textContent = '모든 카드를 선택하셨습니다. 해석을 시작하겠습니다...';
                setTimeout(() => {
                    this.processTarotReading();
                }, 2000);
            }
        }
    }

    processTarotReading() {
        const tarotMessage = document.querySelector('.tarot-message');
        if (tarotMessage) {
            // Hide the tarot card selection
            tarotMessage.style.display = 'none';
            
            // Add counselor message with tarot interpretation
            const interpretation = "선택하신 카드들을 해석해보겠습니다.<br><br>" +
                                 "✨ 첫 번째 카드: 현재 상황을 나타냅니다.<br>" +
                                 "💖 두 번째 카드: 상대방의 마음을 보여줍니다.<br>" +
                                 "🌟 세 번째 카드: 미래의 가능성을 의미합니다.<br><br>" +
                                 "전반적으로 긍정적인 에너지가 느껴집니다.";
            
            setTimeout(() => {
                this.addCounselorResponse(interpretation);
            }, 1000);
        }
    }

    // Modal functionality for point shortage
    showPointModal() {
        const modal = document.querySelector('.modal-overlay');
        if (modal) {
            modal.style.display = 'flex';
        }
    }

    hidePointModal() {
        const modal = document.querySelector('.modal-overlay');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    // System message functionality
    addSystemMessage(text) {
        const systemDiv = document.createElement('div');
        systemDiv.className = 'system-message';
        systemDiv.innerHTML = `<span class="system-text">${text}</span>`;
        
        this.appendMessage(systemDiv);
    }

    // Date divider functionality
    addDateDivider(date) {
        const dividerDiv = document.createElement('div');
        dividerDiv.className = 'date-divider';
        dividerDiv.innerHTML = `<span class="date-text">${date}</span>`;
        
        this.appendMessage(dividerDiv);
    }
}

// Modal event handlers
function setupModalEvents() {
    const modalOverlay = document.querySelector('.modal-overlay');
    const secondaryButton = document.querySelector('.modal-button.secondary');
    const primaryButton = document.querySelector('.modal-button.primary');
    
    if (secondaryButton) {
        secondaryButton.addEventListener('click', () => {
            if (modalOverlay) modalOverlay.style.display = 'none';
        });
    }
    
    if (primaryButton) {
        primaryButton.addEventListener('click', () => {
            window.location.href = 'point.html';
        });
    }
    
    // Close modal when clicking outside
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.style.display = 'none';
            }
        });
    }
}

// Initialize chat functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const chatManager = new ChatManager();
    setupModalEvents();
    
    // Make chatManager globally available for external access if needed
    window.chatManager = chatManager;
});

// Export for module usage (if using ES modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChatManager;
}