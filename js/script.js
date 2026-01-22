document.addEventListener('DOMContentLoaded', function() {
    
    // 1. ACTIVE LINK COLOR
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
        
        // Back To Top Button logic
        const backToTopBtn = document.getElementById('backToTop');
        if(backToTopBtn) {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        }
    });

    // 2. TYPING EFFECT
    const textElement = document.getElementById('typingText');
    if (textElement) {
        const textToType = "ROG STRIX G15 REVIEW_"; 
        let i = 0;
        function typeWriter() {
            if (i < textToType.length) {
                let currentText = textElement.innerHTML.replace('_', '');
                textElement.innerHTML = currentText + textToType.charAt(i) + (i < textToType.length -1 ? "_" : "");
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => {
                    textElement.innerHTML = textElement.innerHTML.replace('_', '');
                }, 1000);
            }
        }
        setTimeout(typeWriter, 500);
    }

    // 3. CAROUSEL LOGIC
    const carouselCards = document.querySelectorAll('.carousel-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentIndex = 0;
    const totalCards = carouselCards.length;

    function updateCarousel() {
        carouselCards.forEach((card, index) => {
            card.classList.remove('active', 'prev', 'next');
            if (index === currentIndex) {
                card.classList.add('active');
            } else if (index === currentIndex - 1 || (currentIndex === 0 && index === totalCards - 1)) {
                card.classList.add('prev');
            } else if (index === currentIndex + 1 || (currentIndex === totalCards - 1 && index === 0)) {
                card.classList.add('next');
            }
        });
    }

    if(nextBtn) nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalCards;
        updateCarousel();
    });

    if(prevBtn) prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updateCarousel();
    });

    // Initialize Carousel
    if(carouselCards.length > 0) updateCarousel();


    // 4. TIPS ACCORDION
    const tipHeaders = document.querySelectorAll('.tip-header');
    tipHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const currentTip = header.parentElement;
            currentTip.classList.toggle('active');
        });
    });

    // 5. CONTACT BUBBLE ANIMATION
    const contactContainer = document.getElementById('contactContainer');
    if (contactContainer) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    contactContainer.classList.add('active-bubble');
                } else {
                    contactContainer.classList.remove('active-bubble');
                }
            });
        }, { threshold: 0.3 });
        observer.observe(document.getElementById('contact'));
    }

    // 6. BACK TO TOP CLICK
    const backToTopBtn = document.getElementById('backToTop');
    if(backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 7. CHATBOT LOGIC
    const chatToggle = document.getElementById('chatToggle');
    const chatWindow = document.getElementById('chatWindow');
    const closeChat = document.getElementById('closeChat');
    const sendBtn = document.getElementById('sendBtn');
    const chatInput = document.getElementById('chatInput');
    const chatBody = document.getElementById('chatBody');

    if (chatToggle && chatWindow) {
        chatToggle.addEventListener('click', () => {
            chatWindow.classList.toggle('active');
        });

        closeChat.addEventListener('click', () => {
            chatWindow.classList.remove('active');
        });

        function sendMessage() {
            const text = chatInput.value.trim();
            if (text === "") return;
            
            // User Message
            const div = document.createElement('div');
            div.classList.add('message', 'user-message');
            div.innerHTML = text;
            chatBody.appendChild(div);
            chatBody.scrollTop = chatBody.scrollHeight;
            chatInput.value = '';
            
            // Bot Reply
            setTimeout(() => {
                let reply = "I can help with specs, pricing, or gaming tests. What do you need?";
                if (text.toLowerCase().includes("hello") || text.toLowerCase().includes("hi")) {
                    reply = "Hello! Ready to explore the ROG Strix?";
                } else if (text.toLowerCase().includes("price")) {
                    reply = "The ROG Strix G15 starts around RM 5,899 depending on specs.";
                }
                
                const divBot = document.createElement('div');
                divBot.classList.add('message', 'bot-message');
                divBot.innerHTML = reply;
                chatBody.appendChild(divBot);
                chatBody.scrollTop = chatBody.scrollHeight;
            }, 800);
        }

        sendBtn.addEventListener('click', sendMessage);
        
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
});