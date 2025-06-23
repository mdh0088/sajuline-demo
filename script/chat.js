/**
 * Chat Functionality JavaScript
 * 실시간 채팅 상담 기능을 관리합니다.
 */

class ChatManager {
    constructor() {
        this.consultationStartTime = Date.now();
        this.currentTarotCards = [];
        this.selectedCards = 0;
        this.maxCards = 3;
        this.isTyping = false;
        this.userPoints = 50000; // 사용자 포인트
        this.consultationCost = 100; // 분당 비용
        
        this.init();
    }

    /**
     * 채팅 시스템 초기화
     */
    init() {
        this.initializeEventListeners();
        this.startTimer();
        this.initializeTarotCards();
        this.addWelcomeMessage();
        this.scrollToBottom();
    }

    /**
     * 이벤트 리스너 설정
     */
    initializeEventListeners() {
        // 메시지 전송
        const sendButton = document.querySelector('.send-button');
        const messageInput = document.querySelector('.input-field');
        
        if (sendButton) {
            sendButton.addEventListener('click', () => this.sendMessage());
        }
        
        if (messageInput) {
            messageInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
            
            messageInput.addEventListener('input', () => {
                this.toggleSendButton();
            });
        }

        // 빠른 질문 버튼들
        const quickQuestions = document.querySelectorAll('.quick-question');
        quickQuestions.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleQuickQuestion(e));
        });

        // 타로 카드 클릭
        const tarotCards = document.querySelectorAll('.tarot-card');
        tarotCards.forEach(card => {
            card.addEventListener('click', (e) => this.handleTarotCardClick(e));
        });

        // 모달 관련
        const modal = document.querySelector('.modal-overlay');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        }

        const modalButtons = document.querySelectorAll('.modal-button');
        modalButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleModalButton(e));
        });

        // 뒤로가기 버튼
        const backButton = document.querySelector('.back-button');
        if (backButton) {
            backButton.addEventListener('click', () => this.handleBackButton());
        }
    }

    /**
     * 타이머 시작
     */
    startTimer() {
        const timerElement = document.querySelector('.timer .time');
        if (!timerElement) return;

        setInterval(() => {
            const elapsed = Date.now() - this.consultationStartTime;
            const minutes = Math.floor(elapsed / 60000);
            const seconds = Math.floor((elapsed % 60000) / 1000);
            
            timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            // 포인트 차감 체크 (매분)
            if (seconds === 0 && minutes > 0) {
                this.deductPoints();
            }
        }, 1000);
    }

    /**
     * 포인트 차감
     */
    deductPoints() {
        this.userPoints -= this.consultationCost;
        
        if (this.userPoints <= 0) {
            this.showPointModal();
        }
    }

    /**
     * 메시지 전송
     */
    sendMessage() {
        const messageInput = document.querySelector('.input-field');
        const message = messageInput?.value.trim();
        
        if (!message) return;
        
        // 사용자 메시지 추가
        this.addMessage(message, 'user');
        
        // 입력 필드 초기화
        messageInput.value = '';
        this.toggleSendButton();
        
        // 상담사 응답 시뮬레이션
        this.simulateCounselorResponse(message);
        
        this.scrollToBottom();
    }

    /**
     * 메시지 추가
     */
    addMessage(text, sender, timestamp = null) {
        const chatContainer = document.querySelector('.chat-container');
        if (!chatContainer) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const time = timestamp || new Date().toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit'
        });

        if (sender === 'user') {
            messageDiv.innerHTML = `
                <div class="message-content">
                    <div class="message-bubble">${text}</div>
                    <div class="message-time">${time}</div>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-avatar">👩‍💻</div>
                <div class="message-content">
                    <div class="message-bubble">${text}</div>
                    <div class="message-time">${time}</div>
                </div>
            `;
        }

        chatContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    /**
     * 시스템 메시지 추가
     */
    addSystemMessage(text) {
        const chatContainer = document.querySelector('.chat-container');
        if (!chatContainer) return;

        const systemDiv = document.createElement('div');
        systemDiv.className = 'system-message';
        systemDiv.innerHTML = `<div class="system-text">${text}</div>`;

        chatContainer.appendChild(systemDiv);
        this.scrollToBottom();
    }

    /**
     * 상담사 응답 시뮬레이션
     */
    simulateCounselorResponse(userMessage) {
        this.showTypingIndicator();

        setTimeout(() => {
            this.hideTypingIndicator();
            
            const responses = this.generateCounselorResponse(userMessage);
            
            responses.forEach((response, index) => {
                setTimeout(() => {
                    this.addMessage(response, 'counselor');
                }, index * 1000);
            });
        }, 1500 + Math.random() * 1000);
    }

    /**
     * 상담사 응답 생성
     */
    generateCounselorResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('사랑') || lowerMessage.includes('연애')) {
            return [
                '사랑에 대한 고민이 있으시군요. 타로 카드를 통해 더 자세히 알아보겠습니다.',
                '현재 연애운이 상승세에 있습니다. 좋은 기회가 곧 찾아올 것 같아요.'
            ];
        } else if (lowerMessage.includes('돈') || lowerMessage.includes('재물') || lowerMessage.includes('사업')) {
            return [
                '재물운에 대해 궁금하시군요. 현재 금전적인 고민이 있으신가요?',
                '올해 하반기에 좋은 투자 기회가 있을 것 같습니다. 신중하게 판단하세요.'
            ];
        } else if (lowerMessage.includes('건강')) {
            return [
                '건강 관련해서는 평소 관리가 중요합니다.',
                '스트레스 관리에 특히 신경 쓰시고, 규칙적인 생활을 하시는 것이 좋겠어요.'
            ];
        } else if (lowerMessage.includes('타로')) {
            this.initializeTarotReading();
            return ['타로 카드를 준비했습니다. 마음속으로 질문을 생각하시고 카드 3장을 선택해주세요.'];
        } else {
            return [
                '말씀해주신 내용을 바탕으로 운세를 봐드리겠습니다.',
                '좀 더 구체적으로 어떤 부분이 궁금하신지 알려주시면 더 정확한 상담을 해드릴 수 있어요.'
            ];
        }
    }

    /**
     * 타이핑 인디케이터 표시
     */
    showTypingIndicator() {
        const chatContainer = document.querySelector('.chat-container');
        if (!chatContainer || this.isTyping) return;

        this.isTyping = true;
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="typing-avatar">👩‍💻</div>
            <div class="typing-dots">
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
            </div>
        `;

        chatContainer.appendChild(typingDiv);
        this.scrollToBottom();
    }

    /**
     * 타이핑 인디케이터 숨김
     */
    hideTypingIndicator() {
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
        this.isTyping = false;
    }

    /**
     * 빠른 질문 처리
     */
    handleQuickQuestion(event) {
        const question = event.target.textContent;
        const messageInput = document.querySelector('.input-field');
        
        if (messageInput) {
            messageInput.value = question;
            messageInput.focus();
        }
    }

    /**
     * 타로 카드 초기화
     */
    initializeTarotCards() {
        const tarotCards = document.querySelectorAll('.tarot-card');
        this.currentTarotCards = Array.from(tarotCards);
        this.selectedCards = 0;
    }

    /**
     * 타로 리딩 시작
     */
    initializeTarotReading() {
        const chatContainer = document.querySelector('.chat-container');
        if (!chatContainer) return;

        const tarotDiv = document.createElement('div');
        tarotDiv.className = 'tarot-message';
        tarotDiv.innerHTML = `
            <div class="tarot-cards">
                <div class="tarot-card" data-card="1">🃏</div>
                <div class="tarot-card" data-card="2">🃏</div>
                <div class="tarot-card" data-card="3">🃏</div>
            </div>
            <div class="tarot-result">카드 3장을 선택해주세요</div>
        `;

        chatContainer.appendChild(tarotDiv);

        // 새로 생성된 카드들에 이벤트 리스너 추가
        const newCards = tarotDiv.querySelectorAll('.tarot-card');
        newCards.forEach(card => {
            card.addEventListener('click', (e) => this.handleTarotCardClick(e));
        });

        this.currentTarotCards = Array.from(newCards);
        this.selectedCards = 0;
        this.scrollToBottom();
    }

    /**
     * 타로 카드 클릭 처리
     */
    handleTarotCardClick(event) {
        const card = event.currentTarget;
        
        if (card.classList.contains('flipped') || this.selectedCards >= this.maxCards) {
            return;
        }

        card.classList.add('flipped');
        this.selectedCards++;

        // 카드 이모지 변경
        const cardEmojis = ['🌟', '❤️', '💰', '🍀', '✨', '🌙'];
        const randomEmoji = cardEmojis[Math.floor(Math.random() * cardEmojis.length)];
        card.textContent = randomEmoji;

        // 모든 카드가 선택되면 결과 표시
        if (this.selectedCards === this.maxCards) {
            setTimeout(() => {
                this.showTarotResult();
            }, 1000);
        }
    }

    /**
     * 타로 결과 표시
     */
    showTarotResult() {
        const results = [
            '과거: 어려운 시기를 잘 극복하셨군요. 그 경험이 현재의 지혜가 되었습니다.',
            '현재: 새로운 기회가 눈앞에 다가와 있습니다. 준비된 마음으로 맞이하세요.',
            '미래: 노력한 만큼의 결과를 얻게 될 것입니다. 긍정적인 변화가 기다리고 있어요.'
        ];

        results.forEach((result, index) => {
            setTimeout(() => {
                this.addMessage(result, 'counselor');
            }, (index + 1) * 1500);
        });
    }

    /**
     * 웰컴 메시지 추가
     */
    addWelcomeMessage() {
        setTimeout(() => {
            this.addMessage('안녕하세요! 명월 선생님입니다. 어떤 고민이 있으신지 편하게 말씀해주세요.', 'counselor');
        }, 1000);
    }

    /**
     * 전송 버튼 토글
     */
    toggleSendButton() {
        const sendButton = document.querySelector('.send-button');
        const messageInput = document.querySelector('.input-field');
        
        if (sendButton && messageInput) {
            sendButton.disabled = !messageInput.value.trim();
        }
    }

    /**
     * 스크롤을 아래로
     */
    scrollToBottom() {
        const chatContainer = document.querySelector('.chat-container');
        if (chatContainer) {
            setTimeout(() => {
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }, 100);
        }
    }

    /**
     * 포인트 부족 모달 표시
     */
    showPointModal() {
        const modal = document.querySelector('.modal-overlay');
        if (modal) {
            modal.style.display = 'flex';
        }
    }

    /**
     * 모달 닫기
     */
    closeModal() {
        const modal = document.querySelector('.modal-overlay');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    /**
     * 모달 버튼 처리
     */
    handleModalButton(event) {
        const action = event.target.getAttribute('data-action');
        
        switch (action) {
            case 'charge':
                this.navigateToPointCharge();
                break;
            case 'close':
                this.closeModal();
                break;
            case 'continue':
                this.closeModal();
                break;
        }
    }

    /**
     * 뒤로가기 처리
     */
    handleBackButton() {
        if (confirm('상담을 종료하시겠습니까?')) {
            this.endConsultation();
        }
    }

    /**
     * 상담 종료
     */
    endConsultation() {
        // 상담 시간 계산
        const elapsed = Date.now() - this.consultationStartTime;
        const minutes = Math.floor(elapsed / 60000);
        
        // 상담 기록 저장 (실제 구현 필요)
        const consultationData = {
            duration: minutes,
            cost: minutes * this.consultationCost,
            counselor: '명월 선생님',
            date: new Date().toISOString()
        };
        
        console.log('Consultation ended:', consultationData);
        
        // 이전 페이지로 이동
        window.location.href = 'main.html';
    }

    /**
     * 네비게이션 함수들
     */
    navigateToPointCharge() {
        window.location.href = 'point.html';
    }

    navigateToMain() {
        window.location.href = 'main.html';
    }
}

// DOM 로드 완료 시 초기화
document.addEventListener('DOMContentLoaded', () => {
    window.chatManager = new ChatManager();
});

// 페이지 언로드 시 정리
window.addEventListener('beforeunload', () => {
    if (window.chatManager) {
        // 필요한 정리 작업
    }
});

// 모듈 export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ChatManager;
}