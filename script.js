document.addEventListener('DOMContentLoaded', () => {
    // ========================
    // INITIALIZATION
    // ========================
    console.log('Forest Keeper - About Page Initialized');
    
    // ========================
    // FLOATING LEAVES ANIMATION
    // ========================
    function createFloatingLeaves() {
        const leavesContainer = document.getElementById('floatingLeaves');
        if (!leavesContainer) return;
        
        const leafCount = 15;
        
        for (let i = 0; i < leafCount; i++) {
            const leaf = document.createElement('div');
            leaf.className = 'leaf';
            
            const size = Math.random() * 30 + 20;
            const startX = Math.random() * 100;
            const duration = Math.random() * 10 + 10;
            const delay = Math.random() * 5;
            
            leaf.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${startX}%;
                animation-delay: ${delay}s;
                animation-duration: ${duration}s;
            `;
            
            leavesContainer.appendChild(leaf);
        }
    }

    // ========================
    // RAIN EFFECT
    // ========================
    function createRainEffect() {
        const hero = document.querySelector('.about-hero');
        if (!hero) return;
        
        for (let i = 0; i < 30; i++) {
            const drop = document.createElement('div');
            drop.className = 'raindrop';
            
            const left = Math.random() * 100;
            const duration = Math.random() * 1 + 0.5;
            const delay = Math.random() * 2;
            
            drop.style.cssText = `
                left: ${left}%;
                animation-duration: ${duration}s;
                animation-delay: ${delay}s;
            `;
            
            hero.appendChild(drop);
        }
    }

    // ========================
    // STATS COUNTER ANIMATION
    // ========================
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        const speed = 200;
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count'));
            if (!target) return;
            
            const increment = target / speed;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.floor(current);
                    setTimeout(updateCounter, 1);
                } else {
                    counter.textContent = target;
                }
            };
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(counter);
        });
    }

    // ========================
    // SCROLL EFFECTS
    // ========================
    function initScrollEffects() {
        const header = document.querySelector('header');
        const backToTop = document.getElementById('backToTop');
        
        if (!header || !backToTop) return;
        
        window.addEventListener('scroll', () => {
            // Header scroll effect
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Back to top button
            if (window.scrollY > 500) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
            
            // Parallax effect for hero
            const hero = document.querySelector('.about-hero');
            if (hero) {
                const scrolled = window.scrollY;
                const rate = scrolled * 0.5;
                hero.style.backgroundPosition = `center ${rate}px`;
            }
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ========================
    // PAGE LOAD ANIMATION
    // ========================
    function initPageLoad() {
        const loadingScreen = document.getElementById('loadingScreen');
        
        if (!loadingScreen) return;
        
        window.addEventListener('load', () => {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 1000);
        });
        
        // Fallback in case load event doesn't fire
        setTimeout(() => {
            if (document.readyState === 'complete') {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }
        }, 2000);
    }

    // ========================
    // ENHANCED MAP INTERACTIONS
    // ========================
    function enhanceMapInteractions() {
        const mapImages = document.querySelectorAll('.map img');
        const mapContainer = document.querySelector('.map');
        
        if (!mapImages.length || !mapContainer) return;
        
        // Add interactive class to all map images
        mapImages.forEach(img => {
            img.classList.add('interactive-hover');
        });
        
        mapImages.forEach(img => {
            img.addEventListener('mouseenter', (event) => {
                img.style.filter = 'drop-shadow(0 0 20px rgba(76, 175, 80, 0.7)) brightness(1.2)';
                img.classList.add('pulse');
                
                // Add border glow to container
                mapContainer.style.boxShadow = '0 0 30px rgba(76, 175, 80, 0.4)';
                mapContainer.style.borderColor = 'rgba(76, 175, 80, 0.6)';
                
                showMapTooltip(event, img.getAttribute('data-pulau'));
            });
            
            img.addEventListener('mouseleave', () => {
                img.style.filter = 'drop-shadow(0 5px 15px rgba(0, 0, 0, 0.3)) brightness(1)';
                img.classList.remove('pulse');
                
                // Reset container border
                mapContainer.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.4)';
                mapContainer.style.borderColor = 'rgba(76, 175, 80, 0.3)';
                
                removeMapTooltip();
            });
            
            img.addEventListener('click', function() {
                this.style.animation = 'pulse 0.5s';
                setTimeout(() => {
                    this.style.animation = '';
                }, 500);
                
                // Add click effect to container
                mapContainer.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    mapContainer.style.transform = 'scale(1)';
                }, 200);
                
                // Show popup
                const pulauName = this.getAttribute('data-pulau');
                let link = '';
                
                switch(pulauName) {
                    case 'Sumatera': link = 'sumatera.html'; break;
                    case 'Sulawesi': link = 'Sulawesi.html'; break;
                    case 'Kalimantan': link = 'Kalimantan.html'; break;
                    case 'Jawa': link = 'Jawa.html'; break;
                    case 'Nusa Tenggara': link = 'nusa-tenggara.html'; break;
                    case 'Papua': link = 'Papua.html'; break;
                }
                
                if (link) {
                    showPopup(link, pulauName);
                }
            });
        });
    }

    // ========================
    // MAP TOOLTIP
    // ========================
    function showMapTooltip(event, pulauName) {
        const existingTooltip = document.querySelector('.peta-tooltip');
        if (existingTooltip) {
            existingTooltip.remove();
        }
        
        const tooltip = document.createElement('div');
        tooltip.className = 'peta-tooltip';
        tooltip.textContent = `Pulau ${pulauName}`;
        tooltip.style.cssText = `
            position: fixed;
            background: linear-gradient(135deg, #2a5c39, #4caf50);
            color: white;
            padding: 10px 25px;
            border-radius: 25px;
            font-size: 14px;
            font-weight: 600;
            z-index: 1000;
            pointer-events: none;
            white-space: nowrap;
            transform: translate(-50%, -120%);
            box-shadow: 0 10px 25px rgba(42, 92, 57, 0.5);
            border: 2px solid rgba(255, 255, 255, 0.3);
            backdrop-filter: blur(10px);
            animation: tooltipFadeIn 0.3s ease-out;
        `;
        
        document.body.appendChild(tooltip);
        
        const updateTooltip = () => {
            const rect = event.target.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top - 10;
            
            tooltip.style.left = `${x}px`;
            tooltip.style.top = `${y}px`;
        };
        
        updateTooltip();
        
        // Store reference for cleanup
        event.target.tooltip = tooltip;
        event.target.updateTooltip = updateTooltip;
        
        window.addEventListener('scroll', updateTooltip);
        window.addEventListener('resize', updateTooltip);
    }

    function removeMapTooltip() {
        const tooltip = document.querySelector('.peta-tooltip');
        if (tooltip) {
            window.removeEventListener('scroll', tooltip.updateTooltip);
            window.removeEventListener('resize', tooltip.updateTooltip);
            tooltip.remove();
        }
    }

    // ========================
    // CUSTOM SLIDER
    // ========================
    function initCustomSlider() {
        const next = document.querySelector('.next');
        const prev = document.querySelector('.prev');
        const slide = document.querySelector('.slide');
        
        if (!next || !prev || !slide) return;
        
        next.addEventListener('click', () => {
            const items = document.querySelectorAll('.slide .item');
            if (items.length > 0) {
                slide.appendChild(items[0]);
            }
        });
        
        prev.addEventListener('click', () => {
            const items = document.querySelectorAll('.slide .item');
            if (items.length > 0) {
                slide.prepend(items[items.length - 1]);
            }
        });
        
        // Add click handlers to all "Lihat Detail" buttons
        const seeMoreButtons = document.querySelectorAll('.content button');
        seeMoreButtons.forEach((button, index) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                showDetailModal(index);
                
                // Button click effect
                button.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    button.style.transform = 'scale(1)';
                }, 200);
            });
        });
    }

    // ========================
    // PULAU CARD INTERACTIONS
    // ========================
    function initPulauCardInteractions() {
        const pulauCards = document.querySelectorAll('.pulau-card');
        
        pulauCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
                card.style.boxShadow = '0 20px 40px rgba(42, 92, 57, 0.4)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
                card.style.boxShadow = 'none';
            });
            
            const button = card.querySelector('.pulau-btn');
            if (button) {
                button.addEventListener('click', (e) => {
                    e.stopPropagation();
                    // Button click effect
                    button.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        button.style.transform = 'scale(1)';
                    }, 200);
                });
            }
        });
    }

    // ========================
    // POPUP FUNCTIONALITY
    // ========================
    function initPopup() {
        const popup = document.getElementById('popup');
        const popupText = document.getElementById('popup-text');
        const btnKunjungi = document.getElementById('kunjungi');
        const btnTutup = document.getElementById('tutup');
        
        if (!popup || !popupText || !btnKunjungi || !btnTutup) return;
        
        window.currentLink = "";
        
        btnKunjungi.addEventListener('click', function() {
            if (window.currentLink) {
                popup.style.opacity = '0';
                popup.querySelector('.popup-box').style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    popup.style.display = 'none';
                    window.location.href = window.currentLink;
                }, 300);
            }
        });
        
        btnTutup.addEventListener('click', function() {
            popup.style.opacity = '0';
            popup.querySelector('.popup-box').style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                popup.style.display = 'none';
                window.currentLink = "";
            }, 300);
        });
        
        popup.addEventListener('click', function(e) {
            if (e.target === this) {
                popup.style.opacity = '0';
                popup.querySelector('.popup-box').style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    this.style.display = 'none';
                    window.currentLink = "";
                }, 300);
            }
        });
    }

    // ========================
    // NAVIGATION ACTIVE STATE
    // ========================
    function initNavigation() {
        const navLinks = document.querySelectorAll('.navbar a');
        const currentPage = window.location.pathname.split('/').pop();
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            
            if (linkPage === currentPage || 
                (currentPage === '' && linkPage === 'index.html') ||
                (currentPage === 'about.html' && linkPage === 'about.html')) {
                link.classList.add('active');
            }
            
            link.addEventListener('mouseenter', () => {
                if (!link.classList.contains('active')) {
                    link.style.color = '#4caf50';
                }
            });
            
            link.addEventListener('mouseleave', () => {
                if (!link.classList.contains('active')) {
                    link.style.color = '#fff';
                }
            });
        });
    }

    // ========================
    // DARK MODE TOGGLE
    // ========================
    function initDarkModeToggle() {
        const darkModeToggle = document.createElement('button');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        darkModeToggle.id = 'darkModeToggle';
        darkModeToggle.style.cssText = `
            position: fixed;
            bottom: 90px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #2a5c39;
            color: white;
            border: none;
            cursor: pointer;
            z-index: 1000;
            box-shadow: 0 4px 10px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            transition: all 0.3s ease;
        `;
        
        document.body.appendChild(darkModeToggle);
        
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const icon = darkModeToggle.querySelector('i');
            if (document.body.classList.contains('dark-mode')) {
                icon.className = 'fas fa-sun';
                darkModeToggle.style.background = '#f1c40f';
                darkModeToggle.style.color = '#333';
            } else {
                icon.className = 'fas fa-moon';
                darkModeToggle.style.background = '#2a5c39';
                darkModeToggle.style.color = 'white';
            }
        });
    }

    // ========================
    // ADDITIONAL ANIMATIONS
    // ========================
    function addAnimations() {
        // Add glow effect to important headings
        document.querySelectorAll('.logo, .hero-title, .section-title h2, .judul h2').forEach(el => {
            el.classList.add('text-glow');
        });
        
        // Add fade-in animation to cards
        const cards = document.querySelectorAll('.pulau-card, .stat-item');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100 + (index * 100));
        });
    }

    // ========================
    // INITIALIZE ALL FEATURES
    // ========================
    function initializeAll() {
        createFloatingLeaves();
        createRainEffect();
        animateCounters();
        initScrollEffects();
        initPageLoad();
        enhanceMapInteractions();
        initCustomSlider();
        initPulauCardInteractions();
        initPopup();
        initNavigation();
        initDarkModeToggle();
        addAnimations();
        
        console.log('All features initialized successfully');
    }
    
    // Start initialization
    initializeAll();
});

// ========================
// GLOBAL FUNCTIONS
// ========================

let currentLink = "";

function showPopup(link, namaPulau) {
    currentLink = link;
    const namaLengkap = namaPulau;
    
    document.getElementById('popup-text').textContent = 
        `Apakah Anda ingin mengunjungi halaman Pulau ${namaLengkap}?`;
    
    const popup = document.getElementById('popup');
    popup.style.display = 'flex';
    
    setTimeout(() => {
        popup.style.opacity = '1';
        popup.querySelector('.popup-box').style.transform = 'scale(1)';
    }, 10);
}

function showDetailModal(index) {
    const speciesData = [
        {
            name: "Rafflesia Arnoldi",
            description: "Bunga terbesar di dunia dengan diameter mencapai 1 meter. Hidup sebagai parasit pada tumbuhan inang.",
            habitat: "Hutan hujan tropis Sumatra",
            conservation: "Critically Endangered",
            fact: "Mengeluarkan bau busuk untuk menarik lalat sebagai penyerbuk."
        },
        {
            name: "Macan Tutul Jawa",
            description: "Predator puncak endemik Jawa dengan corak tutul yang unik.",
            habitat: "Hutan tropis Jawa",
            conservation: "Critically Endangered",
            fact: "Memiliki variasi warna hitam yang dikenal sebagai 'macan kumbang'."
        },
        {
            name: "Harimau Sumatera",
            description: "Subspesies harimau terkecil dengan loreng yang rapat.",
            habitat: "Hutan Sumatra",
            conservation: "Critically Endangered",
            fact: "Satu-satunya subspesies harimau yang tersisa di Indonesia."
        },
        {
            name: "Burung Maleo",
            description: "Burung endemik Sulawesi yang terkenal dengan telur besarnya.",
            habitat: "Hutan Sulawesi",
            conservation: "Endangered",
            fact: "Tidak mengerami telurnya sendiri, menggunakan panas bumi untuk menetas."
        },
        {
            name: "Anggrek Hitam Papua",
            description: "Anggrek langka dengan bunga hitam yang eksotis.",
            habitat: "Hutan Papua",
            conservation: "Vulnerable",
            fact: "Bunganya memiliki warna hitam pekat yang sangat langka di dunia anggrek."
        },
        {
            name: "Bunga Edelweis Jawa",
            description: "Bunga abadi yang tumbuh di pegunungan tinggi.",
            habitat: "Pegunungan Jawa",
            conservation: "Protected",
            fact: "Disebut 'bunga abadi' karena bisa bertahan lama tanpa layu."
        }
    ];
    
    const species = speciesData[index] || speciesData[0];
    
    // Check if modal already exists
    const existingModal = document.getElementById('speciesModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modalHTML = `
        <div class="species-modal" id="speciesModal">
            <div class="modal-content">
                <button class="close-modal">&times;</button>
                <h2>${species.name}</h2>
                <div class="modal-info">
                    <p><strong>Deskripsi:</strong> ${species.description}</p>
                    <p><strong>Habitat:</strong> ${species.habitat}</p>
                    <p><strong>Fakta Menarik:</strong> ${species.fact}</p>
                    <p><strong>Status Konservasi:</strong> <span class="status-badge">${species.conservation}</span></p>
                </div>
                <button class="modal-action-btn">Pelajari Lebih Lanjut</button>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = document.getElementById('speciesModal');
    const closeBtn = modal.querySelector('.close-modal');
    const actionBtn = modal.querySelector('.modal-action-btn');
    
    // Show modal with animation
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.modal-content').style.transform = 'scale(1)';
    }, 10);
    
    // Close button handler
    closeBtn.addEventListener('click', () => {
        modal.style.opacity = '0';
        modal.querySelector('.modal-content').style.transform = 'scale(0.8)';
        setTimeout(() => modal.remove(), 300);
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeBtn.click();
        }
    });
    
    // Action button handler
    actionBtn.addEventListener('click', () => {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(species.name + ' Indonesia')}`, '_blank');
    });
}

// ========================
// ADDITIONAL CSS ANIMATIONS (injected via JavaScript)
// ========================
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes tooltipFadeIn {
            from {
                opacity: 0;
                transform: translate(-50%, -140%);
            }
            to {
                opacity: 1;
                transform: translate(-50%, -120%);
            }
        }
        
        .species-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s;
        }
        
        .species-modal .modal-content {
            background: linear-gradient(145deg, #0a1a0a, #051505);
            padding: 40px;
            border-radius: 16px;
            max-width: 500px;
            width: 90%;
            transform: scale(0.8);
            transition: transform 0.3s;
            position: relative;
            border: 2px solid #2a5c39;
            color: white;
            box-shadow: 0 30px 60px rgba(0,0,0,0.5);
        }
        
        .species-modal .close-modal {
            position: absolute;
            top: 15px;
            right: 15px;
            background: none;
            border: none;
            font-size: 28px;
            cursor: pointer;
            color: #8bc34a;
            transition: all 0.3s ease;
        }
        
        .species-modal .close-modal:hover {
            color: white;
            transform: scale(1.2);
        }
        
        .species-modal h2 {
            color: #8bc34a;
            margin-bottom: 20px;
            font-size: 2em;
        }
        
        .modal-info p {
            margin-bottom: 15px;
            line-height: 1.6;
        }
        
        .status-badge {
            display: inline-block;
            padding: 5px 12px;
            background: linear-gradient(135deg, #e74c3c, #c0392b);
            color: white;
            border-radius: 20px;
            font-size: 12px;
            font-weight: bold;
        }
        
        .modal-action-btn {
            background: linear-gradient(135deg, #2a5c39, #4caf50);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 25px;
            cursor: pointer;
            margin-top: 20px;
            font-weight: 600;
            transition: all 0.3s ease;
            width: 100%;
        }
        
        .modal-action-btn:hover {
            background: linear-gradient(135deg, #4caf50, #8bc34a);
            transform: translateY(-3px);
            box-shadow: 0 10px 20px rgba(42, 92, 57, 0.3);
        }
        
        .peta-tooltip::after {
            content: '';
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            border-width: 8px;
            border-style: solid;
            border-color: #2a5c39 transparent transparent transparent;
        }
        
        .text-glow {
            text-shadow: 0 0 10px rgba(76, 175, 80, 0.5),
                         0 0 20px rgba(76, 175, 80, 0.3),
                         0 0 30px rgba(76, 175, 80, 0.1);
        }
        
        .interactive-hover {
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1);
        }
        
        .interactive-hover:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(42, 92, 57, 0.3);
        }
    `;
    document.head.appendChild(style);
});