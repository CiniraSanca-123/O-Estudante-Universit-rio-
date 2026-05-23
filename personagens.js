
        const characters = [
            {
                name: "Rebeca",
                description: "A Rebeca é VELOZ, espontânea e inteligente.",
                image: "image/rebeca.jpeg"
            },
            {
                name: "Leonardo",
                description: "O Leonardo é ESTRATEGISTA, observador e habilidoso.",
                image: "image/leonardo.jpeg"
            },
            {
                name: "Ana",
                description: "A Ana é CURIOSA, alegre e sempre positiva.",
                image: "image/ana.jpeg"
            }
        ];

        let currentIndex = 0;
        let isAnimating = false;

        // Create particles
        function createParticles() {
            const container = document.getElementById('particles');
            for (let i = 0; i < 30; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 15 + 's';
                particle.style.animationDuration = (10 + Math.random() * 10) + 's';
                container.appendChild(particle);
            }
        }

        // Create thumbnails
        function createThumbnails() {
            const container = document.getElementById('thumbnails');
            characters.forEach((char, index) => {
                const thumb = document.createElement('div');
                thumb.className = 'thumb' + (index === 0 ? ' active' : '');
                thumb.onclick = () => goToSlide(index);
                thumb.innerHTML = `<img src="${char.image}" alt="${char.name}">`;
                container.appendChild(thumb);
            });
        }

        // Create cards
        function createCards() {
            const container = document.getElementById('cardsWrapper');
            characters.forEach((char, index) => {
                const card = document.createElement('div');
                card.className = 'card' + getCardClass(index);
                card.innerHTML = `
                    <div class="corner-deco tl"></div>
                    <div class="corner-deco tr"></div>
                    <div class="corner-deco bl"></div>
                    <div class="corner-deco br"></div>
                    <img src="${char.image}" alt="${char.name}">
                    <div class="char-info">
                        <div class="char-name">${char.name}</div>
                        <div class="char-desc">${char.description}</div>
                    </div>
                `;
                container.appendChild(card);
            });
        }

        // Create dots
        function createDots() {
            const container = document.getElementById('dotsContainer');
            characters.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.className = 'dot' + (index === 0 ? ' active' : '');
                dot.onclick = () => goToSlide(index);
                container.appendChild(dot);
            });
        }

        function getCardClass(index) {
            const diff = index - currentIndex;
            const len = characters.length;

            if (diff === 0) return ' active';
            if (diff === 1 || diff === -(len - 1)) return ' next';
            if (diff === -1 || diff === (len - 1)) return ' prev';
            return ' hidden';
        }

        function updateCarousel() {
            const cards = document.querySelectorAll('.card');
            const thumbs = document.querySelectorAll('.thumb');
            const dots = document.querySelectorAll('.dot');
            const glowBg = document.getElementById('glowBg');

            cards.forEach((card, index) => {
                card.className = 'card' + getCardClass(index);
            });

            thumbs.forEach((thumb, index) => {
                thumb.classList.toggle('active', index === currentIndex);
            });

            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });

            glowBg.classList.toggle('visible', true);
        }

        function moveSlide(direction) {
            if (isAnimating) return;
            isAnimating = true;

            currentIndex = (currentIndex + direction + characters.length) % characters.length;
            updateCarousel();

            setTimeout(() => { isAnimating = false; }, 600);
        }

        function goToSlide(index) {
            if (isAnimating || index === currentIndex) return;
            isAnimating = true;

            currentIndex = index;
            updateCarousel();

            setTimeout(() => { isAnimating = false; }, 600);
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') moveSlide(-1);
            if (e.key === 'ArrowRight') moveSlide(1);
        });

        // Touch/swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) moveSlide(1);
                else moveSlide(-1);
            }
        });

        // Auto-play (optional)
        let autoPlayInterval;
        function startAutoPlay() {
            autoPlayInterval = setInterval(() => moveSlide(1), 5000);
        }

        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }

        // Initialize
        createParticles();
        createThumbnails();
        createCards();
        createDots();
        updateCarousel();

        // Pause auto-play on hover
        document.querySelector('.main-stage').addEventListener('mouseenter', stopAutoPlay);
        document.querySelector('.main-stage').addEventListener('mouseleave', startAutoPlay);

        // Start auto-play
        // startAutoPlay();
    