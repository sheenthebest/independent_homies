document.addEventListener('DOMContentLoaded', () => {
    let allGalleryImages = config.galleryImages;
    let currentImageIndex = 0;

    function customAlert(message) {
        const alertBox = document.getElementById('custom-alert');
        const alertMessage = document.getElementById('custom-alert-message');
        const closeButton = document.getElementById('custom-alert-close');
        const alertContent = document.querySelector('.custom-alert-content');
    
        alertMessage.textContent = message;
        alertBox.style.display = 'block';
        
        alertBox.offsetHeight;
        
        alertBox.classList.add('show');
    
        function closeAlert() {
            alertBox.classList.remove('show');
            alertContent.style.animation = 'slideUp 0.5s ease-out forwards';
    
            setTimeout(() => {
                alertBox.style.display = 'none';
                alertContent.style.animation = '';
            }, 500);
        }
    
        closeButton.onclick = closeAlert;
    
        window.onclick = function(event) {
            if (event.target == alertBox) {
                closeAlert();
            }
        }
    } 

    function loadGalleryImages() {
        const galleryPreview = document.querySelector('.gallery-preview');
        
        for (let i = 0; i < 5 && i < allGalleryImages.length; i++) {
            const img = document.createElement('img');
            img.dataset.src = `images/${allGalleryImages[i]}`;
            img.alt = 'Scéna z boje ArmA Reforger';
            img.loading = 'lazy';
            img.addEventListener('click', () => openGalleryModal(i));
            galleryPreview.appendChild(img);
        }
    }

    function openGalleryModal(index) {
        const modal = document.getElementById('gallery-modal');
        currentImageIndex = index;
        updateModalImage();
        modal.style.display = "flex";
    }

    function updateModalImage() {
        const modalImg = document.getElementById('modal-image');
        modalImg.src = `images/${allGalleryImages[currentImageIndex]}`;
    }

    function closeGalleryModal() {
        const modal = document.getElementById('gallery-modal');
        modal.style.display = "none";
    }

    function changeImage(n) {
        currentImageIndex += n;
        if (currentImageIndex >= allGalleryImages.length) {
            currentImageIndex = 0;
        } else if (currentImageIndex < 0) {
            currentImageIndex = allGalleryImages.length - 1;
        }
        updateModalImage();
    }

    function checkServerStatus() {
        const serverList = document.getElementById('server-list');
        serverList.innerHTML = '';
    
        config.servers.forEach(server => {
            const serverDiv = document.createElement('div');
            serverDiv.className = 'server-info';
            serverDiv.innerHTML = `
                <h3>${server.name}</h3>
                <p>IP: ${server.ip}</p>
                <p>Status: <span class="status-indicator">${config.serverStatusChecking}</span></p>
                <p>Hráči: <span class="player-count">${config.serverStatusChecking}</span></p>
                <button class="steam-join">
                    <i class="fab fa-steam"></i>
                    ${config.serverJoinButtonText}
                </button>
            `;
            serverList.appendChild(serverDiv);
    
            const joinButton = serverDiv.querySelector('.steam-join');
            joinButton.addEventListener('click', () => {
                const steamProtocol = `steam://rungameid/1874880//connect=${server.ip}`;
                window.location.href = steamProtocol;
            });
    
            fetch(`https://api.battlemetrics.com/servers/${server.battlemetricsID}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Síťová odpověď nebyla v pořádku');
                    }
                    return response.json();
                })
                .then(data => {
                    const statusIndicator = serverDiv.querySelector('.status-indicator');
                    const playerCount = serverDiv.querySelector('.player-count');
                    
                    if (data.data.attributes.status === 'online') {
                        statusIndicator.textContent = 'Online';
                        statusIndicator.style.color = '#00ff00';
                        playerCount.textContent = `${data.data.attributes.players}/${data.data.attributes.maxPlayers}`;
                    } else {
                        statusIndicator.textContent = 'Offline';
                        statusIndicator.style.color = '#ff0000';
                        playerCount.textContent = 'N/A';
                    }
                })
                .catch(error => {
                    console.error('Chyba při kontrole stavu serveru:', error);
                    serverDiv.querySelector('.status-indicator').textContent = 'Chyba';
                    serverDiv.querySelector('.status-indicator').style.color = '#ff0000';
                    serverDiv.querySelector('.player-count').textContent = 'N/A';
                });
        });
    }

    function handleApplicationSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        
        if (validateForm(formData)) {
            console.log('Přihláška odeslána:', Object.fromEntries(formData));
            customAlert(config.applicationSuccessMessage);
            form.reset();
        }
    }

    function validateForm(formData) {
        let isValid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.get('name')) {
            customAlert(config.formValidationMessages.nameRequired);
            isValid = false;
        }

        if (!emailRegex.test(formData.get('email'))) {
            customAlert(config.formValidationMessages.invalidEmail);
            isValid = false;
        }

        return isValid;
    }

    function populateCommunityHighlights() {
        const highlightsList = document.getElementById('community-highlights-list');
        config.communityHighlights.forEach(highlight => {
            const li = document.createElement('li');
            li.innerHTML = `<i class="fas ${highlight.icon}"></i> ${highlight.text}`;
            highlightsList.appendChild(li);
        });
    }

    function handleScrollToTop() {
        const scrollButton = document.getElementById('scroll-to-top');
    
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollButton.style.display = 'block';
            } else {
                scrollButton.style.display = 'none';
            }
        });
    
        scrollButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    function changeBackgroundImage() {
        const bg1 = document.querySelector('.hero .bg1');
        const bg2 = document.querySelector('.hero .bg2');
        const backgrounds = config.backgroundImages.hero;
        let currentIndex = 0;
    
        function preloadImage(url) {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = resolve;
                img.onerror = reject;
                img.src = url;
            });
        }
    
        async function updateBackground() {
            const nextIndex = (currentIndex + 1) % backgrounds.length;
            const nextImageUrl = `images/${backgrounds[nextIndex]}`;
    
            try {
                await preloadImage(nextImageUrl);
    
                if (bg1.style.opacity === '1' || bg1.style.opacity === '') {
                    bg2.style.backgroundImage = `url('${nextImageUrl}')`;
                    bg2.style.opacity = '1';
                    bg1.style.opacity = '0';
                } else {
                    bg1.style.backgroundImage = `url('${nextImageUrl}')`;
                    bg1.style.opacity = '1';
                    bg2.style.opacity = '0';
                }
    
                currentIndex = nextIndex;
            } catch (error) {
                console.error('Chyba při načítání obrázku:', error);
            }
        }
    
        bg1.style.backgroundImage = `url('images/${backgrounds[0]}')`;
        bg1.style.opacity = '1';
    
        setInterval(updateBackground, config.backgroundChangeInterval);
    }

    function addParallaxEffect() {
        const serverSection = document.querySelector('.server-section');
        const background = serverSection.querySelector('.server-section-background');
        
        function updateParallax() {
            const scrollPosition = window.pageYOffset;
            const sectionRect = serverSection.getBoundingClientRect();
            
            if (sectionRect.top < window.innerHeight && sectionRect.bottom > 0) {
                const sectionTop = sectionRect.top + scrollPosition;
                const parallaxSpeed = 0.4;
                const yOffset = (scrollPosition - sectionTop) * parallaxSpeed;
                background.style.transform = `translateY(${yOffset}px)`;
            }
        }
    
        window.addEventListener('scroll', updateParallax);
        window.addEventListener('resize', updateParallax);
        updateParallax();
    }
    
    function animateOnScroll() {
        const sections = document.querySelectorAll('section');
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
    
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    observer.unobserve(entry.target);
                }
            });
        }, options);
    
        sections.forEach(section => {
            section.classList.add('animate-on-scroll');
            observer.observe(section);
        });
    }

    function initializeConfig() {
        const setTextContent = (id, text) => {
            const element = document.getElementById(id);
            if (element) element.textContent = text;
        };
    
        const setImageSrc = (id, src) => {
            const element = document.getElementById(id);
            if (element) element.src = `images/${src}`;
        };
    
        setTextContent('page-title', config.pageTitle);
        setTextContent('community-name', config.communityName);
        setTextContent('footer-community-name', config.communityName);
        setTextContent('hero-tagline', config.heroTagline);
        setTextContent('cta-button', config.ctaButtonText);
        setTextContent('discord-button-text', config.discordButtonText);
        setTextContent('about-section-title', config.aboutSectionTitle);
        setTextContent('about-text', config.aboutText);
        setTextContent('server-section-title', config.serverSectionTitle);
        setTextContent('gallery-section-title', config.gallerySectionTitle);
        setTextContent('apply-section-title', config.applySectionTitle);
        setTextContent('apply-button', config.applyButtonText);
        setTextContent('team-section-title', config.teamSectionTitle);
        setTextContent('footer-rights', config.footerText);
        setTextContent('current-year', new Date().getFullYear());
        setTextContent('custom-alert-close', config.customAlertCloseText);
    
        setImageSrc('about-logo', config.aboutLogo);
    
        const serverSection = document.querySelector('.server-section-background');
        if (serverSection) {
            serverSection.style.backgroundImage = `url('images/${config.backgroundImages.server}')`;
        }
    
        const applySection = document.querySelector('.apply-section');
        if (applySection) {
            applySection.style.backgroundImage = `url('images/${config.backgroundImages.apply}')`;
        }
    
        const scrollToTop = document.getElementById('scroll-to-top');
        if (scrollToTop) {
            scrollToTop.title = config.scrollToTopText;
        }
    
        const closeBtn = document.querySelector('.close');
        if (closeBtn) closeBtn.textContent = config.galleryModalCloseText;
    
        const prevBtn = document.querySelector('.prev');
        if (prevBtn) prevBtn.textContent = config.galleryModalPrevText;
    
        const nextBtn = document.querySelector('.next');
        if (nextBtn) nextBtn.textContent = config.galleryModalNextText;
    }

    function populateTeamMembers() {
        const teamGrid = document.getElementById('team-grid');
        config.teamMembers.forEach(member => {
            const memberDiv = document.createElement('div');
            memberDiv.className = 'team-member';
            
            let socialHTML = '';
            if (member.showSocials && member.steam) {
                socialHTML = `
                    <div class="team-member-social">
                        <a href="${member.steam}" target="_blank" rel="noopener noreferrer" title="Steam Profil">
                            <i class="fab fa-steam"></i>
                        </a>
                    </div>
                `;
            }
            
            memberDiv.innerHTML = `
                <img src="images/${member.image}" alt="${member.name}">
                <div class="team-member-info">
                    <h3>${member.name}</h3>
                    <p class="role">${member.role}</p>
                    <p class="description">${member.description || ''}</p>
                </div>
                ${socialHTML}
            `;
            teamGrid.appendChild(memberDiv);
        });
    }

    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    loadGalleryImages();
    checkServerStatus();
    changeBackgroundImage();
    addParallaxEffect();
    animateOnScroll();
    initializeConfig();
    populateTeamMembers();
    populateCommunityHighlights();
    lazyLoadImages();
    handleScrollToTop();

    const applicationForm = document.getElementById('application-form');
    applicationForm.addEventListener('submit', handleApplicationSubmit);

    const modal = document.getElementById('gallery-modal');
    const closeBtn = modal.querySelector('.close');
    const prevBtn = modal.querySelector('.prev');
    const nextBtn = modal.querySelector('.next');

    closeBtn.addEventListener('click', closeGalleryModal);
    prevBtn.addEventListener('click', () => changeImage(-1));
    nextBtn.addEventListener('click', () => changeImage(1));

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeGalleryModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (modal.style.display === "flex") {
            if (e.key === "ArrowLeft") changeImage(-1);
            if (e.key === "ArrowRight") changeImage(1);
            if (e.key === "Escape") closeGalleryModal();
        }
    });

    const discordButton = document.getElementById('discord-button');
    discordButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.open(config.discordInviteLink, '_blank');
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});