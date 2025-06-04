    document.addEventListener('DOMContentLoaded', function() {
        const modal = document.getElementById("chatModal");
        const startChatBtn = document.getElementById("startChatBtn");
        const closeBtn = document.getElementById("closeChatBtn");
        const sendBtn = document.getElementById("sendMessage");
        const userInput = document.getElementById("userMessage");
        const chatMessages = document.getElementById("chatMessages");
        
        startChatBtn.addEventListener('click', function(e) {
            e.preventDefault();
            modal.style.display = "flex";
        });
        
        function closeChat() {
            modal.style.display = "none";
        }
        
        closeBtn.addEventListener('click', closeChat);
        
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                closeChat();
            }
        });

        sendBtn.addEventListener('click', sendMessage);
        
        userInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        function sendMessage() {
            const messageText = userInput.value.trim();
            
            if (messageText === '') {
                return; 
            }
            
            const userMessage = document.createElement('div');
            userMessage.className = 'message user-message';
            userMessage.innerHTML = `
                <p>${messageText}</p>
                <span class="message-time">${getCurrentTime()}</span>
            `;
            
            chatMessages.appendChild(userMessage);
            
            userInput.value = '';
            
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            setTimeout(function() {
                const managerMessage = document.createElement('div');
                managerMessage.className = 'message manager-message';
                managerMessage.innerHTML = `
                    <p>${getManagerResponse(messageText)}</p>
                    <span class="message-time">${getCurrentTime()}</span>
                `;
                
                chatMessages.appendChild(managerMessage);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, Math.random() * 1000 + 1000); 
        }
        
        function getCurrentTime() {
            const now = new Date();
            return now.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
            });
        }
        
        function getManagerResponse(userMessage) {
            const responses = [
                "Thank you for your message! Our specialist will contact you shortly.",
                "I understand your question. Let me check the available options for you.",
                "Great question! I'll provide you with detailed information right away.",
                "I'm here to help! Could you please provide more details?",
                "Thank you for reaching out. I'll do my best to assist you.",
                "I see what you're asking about. Let me get you the most up-to-date information.",
                "That's a common question. Here's what I can tell you...",
                "I appreciate your interest! Let me connect you with the right specialist."
            ];
            
            const lowerMessage = userMessage.toLowerCase();
            
            if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('цена')) {
                return "Our pricing varies depending on the program. Please check our Courses & Prices page for detailed information.";
            }
            
            if (lowerMessage.includes('schedule') || lowerMessage.includes('time') || lowerMessage.includes('расписание')) {
                return "We offer flexible scheduling options. Our trainers are available from 6 AM to 10 PM daily.";
            }
            
            if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('привет')) {
                return "Hello! Welcome to Health & Fitness Tracker. How can I assist you today?";
            }
            
            if (lowerMessage.includes('help') || lowerMessage.includes('support') || lowerMessage.includes('помощь')) {
                return "I'm here to help! You can ask me about our services, pricing, schedules, or anything else you'd like to know.";
            }
            
            return responses[Math.floor(Math.random() * responses.length)];
        }
    });