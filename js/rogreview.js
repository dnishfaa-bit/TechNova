// Simple Toggle Chatbot
const chatToggle = document.getElementById('chatToggle');
const chatWindow = document.getElementById('chatWindow');
const closeChat = document.getElementById('closeChat');
const sendBtn = document.getElementById('sendBtn');
const chatInput = document.getElementById('chatInput');
const chatBody = document.getElementById('chatBody');

chatToggle.addEventListener('click', () => {
    chatWindow.classList.toggle('active');
});

closeChat.addEventListener('click', () => {
    chatWindow.classList.remove('active');
});

sendBtn.addEventListener('click', () => {
    const text = chatInput.value;
    if(text) {
        const div = document.createElement('div');
        div.style.textAlign = 'right';
        div.style.marginBottom = '10px';
        div.innerText = text;
        chatBody.appendChild(div);
        chatInput.value = '';
        
        // Auto reply
        setTimeout(() => {
            const botDiv = document.createElement('div');
            botDiv.style.textAlign = 'left';
            botDiv.style.color = '#00f3ff';
            botDiv.innerText = "Thanks for reading the review! Any questions?";
            chatBody.appendChild(botDiv);
        }, 1000);
    }
});// JavaScript Document