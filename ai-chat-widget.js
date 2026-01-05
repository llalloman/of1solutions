// AI Chat Widget - Cliente
class AIChatWidget {
    constructor() {
        this.isOpen = false;
        this.messages = [];
        this.init();
    }

    init() {
        this.createWidget();
        this.attachEventListeners();
        this.addWelcomeMessage();
    }

    createWidget() {
        const chatHTML = `
            <div id="ai-chat-widget" class="ai-chat-widget">
                <button id="ai-chat-toggle" class="ai-chat-toggle" aria-label="Abrir chat">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                    <span class="ai-chat-badge">AI</span>
                </button>

                <div id="ai-chat-container" class="ai-chat-container" style="display: none;">
                    <div class="ai-chat-header">
                        <div class="ai-chat-header-info">
                            <h3>Asistente OF1 Solutions</h3>
                            <span class="ai-chat-status">
                                <span class="status-dot"></span>
                                Disponible 24/7
                            </span>
                        </div>
                        <button id="ai-chat-close" class="ai-chat-close" aria-label="Cerrar chat">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M18 6L6 18M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>

                    <div id="ai-chat-messages" class="ai-chat-messages"></div>

                    <div class="ai-chat-input-container">
                        <input 
                            type="text" 
                            id="ai-chat-input" 
                            class="ai-chat-input" 
                            placeholder="Escribe tu mensaje..."
                            autocomplete="off"
                        />
                        <button id="ai-chat-send" class="ai-chat-send" aria-label="Enviar mensaje">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                            </svg>
                        </button>
                    </div>

                    <div class="ai-chat-footer">
                        <span>Powered by Cloudflare Workers AI</span>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatHTML);
    }

    attachEventListeners() {
        const toggle = document.getElementById('ai-chat-toggle');
        const close = document.getElementById('ai-chat-close');
        const send = document.getElementById('ai-chat-send');
        const input = document.getElementById('ai-chat-input');

        toggle.addEventListener('click', () => this.toggleChat());
        close.addEventListener('click', () => this.toggleChat());
        send.addEventListener('click', () => this.sendMessage());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        const container = document.getElementById('ai-chat-container');
        const toggle = document.getElementById('ai-chat-toggle');
        
        if (this.isOpen) {
            container.style.display = 'flex';
            toggle.style.display = 'none';
            document.getElementById('ai-chat-input').focus();
        } else {
            container.style.display = 'none';
            toggle.style.display = 'flex';
        }
    }

    addWelcomeMessage() {
        this.addMessage('bot', '¡Hola! 👋 Soy el asistente virtual de OF1 SOLUTIONS. ¿En qué puedo ayudarte hoy?');
        this.addQuickReplies([
            '¿Qué servicios ofrecen?',
            '¿Cómo los contacto?',
            'Horarios de atención',
            'Información sobre precios'
        ]);
    }

    addMessage(type, content) {
        const messagesContainer = document.getElementById('ai-chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `ai-chat-message ai-chat-message--${type}`;
        
        const messageContent = document.createElement('div');
        messageContent.className = 'ai-chat-message-content';
        messageContent.textContent = content;
        
        messageDiv.appendChild(messageContent);
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        this.messages.push({ type, content, timestamp: new Date() });
    }

    addQuickReplies(replies) {
        const messagesContainer = document.getElementById('ai-chat-messages');
        const quickRepliesDiv = document.createElement('div');
        quickRepliesDiv.className = 'ai-chat-quick-replies';

        replies.forEach(reply => {
            const button = document.createElement('button');
            button.className = 'ai-chat-quick-reply';
            button.textContent = reply;
            button.addEventListener('click', () => {
                document.getElementById('ai-chat-input').value = reply;
                this.sendMessage();
                quickRepliesDiv.remove();
            });
            quickRepliesDiv.appendChild(button);
        });

        messagesContainer.appendChild(quickRepliesDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    addTypingIndicator() {
        const messagesContainer = document.getElementById('ai-chat-messages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'ai-chat-message ai-chat-message--bot';
        typingDiv.id = 'ai-typing-indicator';
        
        const typingContent = document.createElement('div');
        typingContent.className = 'ai-chat-message-content ai-chat-typing';
        typingContent.innerHTML = '<span></span><span></span><span></span>';
        
        typingDiv.appendChild(typingContent);
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    removeTypingIndicator() {
        const indicator = document.getElementById('ai-typing-indicator');
        if (indicator) indicator.remove();
    }

    async sendMessage() {
        const input = document.getElementById('ai-chat-input');
        const message = input.value.trim();

        if (!message) return;

        // Agregar mensaje del usuario
        this.addMessage('user', message);
        input.value = '';

        // Mostrar indicador de escritura
        this.addTypingIndicator();

        try {
            const response = await fetch('/ai-chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message })
            });

            const data = await response.json();
            this.removeTypingIndicator();

            if (data.reply) {
                this.addMessage('bot', data.reply);
            } else {
                this.addMessage('bot', 'Lo siento, no pude procesar tu mensaje. ¿Podrías intentarlo de nuevo?');
            }

        } catch (error) {
            console.error('Chat error:', error);
            this.removeTypingIndicator();
            this.addMessage('bot', 'Disculpa, estoy teniendo problemas de conexión. Por favor escríbenos directamente a info@of1solutions.com o WhatsApp: +593 983 904 993');
        }
    }
}

// Inicializar el chat cuando la página cargue
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new AIChatWidget();
    });
} else {
    new AIChatWidget();
}
