// ============================================================================
// FOREST KEEPER - INTERACTIVE MAP SYSTEM
// Complete JavaScript Code - Fully Revised
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🌿 Forest Keeper - Interactive Map System Initialized');
    
    // Initialize global variable for popup navigation
    window.currentLink = "";
    
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
        console.log('✅ Floating leaves animation created');
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
        console.log('✅ Stats counter animation initialized');
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
        });
        
        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        console.log('✅ Scroll effects initialized');
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
        
        console.log('✅ Page load animation initialized');
    }

    // ========================
    // ENHANCED MAP INTERACTIONS
    // ========================
    function enhanceMapInteractions() {
        const mapImages = document.querySelectorAll('.map img');
        const mapContainer = document.querySelector('.map');
        
        if (!mapImages.length || !mapContainer) {
            console.warn('⚠️ Map elements not found');
            return;
        }
        
        console.log(`🗺️ Found ${mapImages.length} interactive islands`);
        
        // Add interactive class and cursor to all map images
        mapImages.forEach(img => {
            img.classList.add('interactive-hover');
            img.style.cursor = 'pointer';
        });
        
        mapImages.forEach(img => {
            const pulauName = img.getAttribute('data-pulau');
            console.log(`🏝️ Setting up island: ${pulauName}`);
            
            // Mouse Enter - Show hover effects
            img.addEventListener('mouseenter', (event) => {
                img.style.filter = 'drop-shadow(0 0 20px rgba(76, 175, 80, 0.7)) brightness(1.2)';
                img.classList.add('pulse');
                
                // Add border glow to container
                mapContainer.style.boxShadow = '0 0 30px rgba(76, 175, 80, 0.4)';
                mapContainer.style.borderColor = 'rgba(76, 175, 80, 0.6)';
                
                showMapTooltip(event, pulauName);
            });
            
            // Mouse Leave - Remove hover effects
            img.addEventListener('mouseleave', () => {
                img.style.filter = 'drop-shadow(0 5px 15px rgba(0, 0, 0, 0.3)) brightness(1)';
                img.classList.remove('pulse');
                
                // Reset container border
                mapContainer.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.4)';
                mapContainer.style.borderColor = 'rgba(76, 175, 80, 0.3)';
                
                removeMapTooltip();
            });
            
            // Click Event - Show popup and navigate
            img.addEventListener('click', function(e) {
                e.preventDefault();
                
                console.log(`🖱️ Island clicked: ${pulauName}`);
                
                // Pulse animation
                this.style.animation = 'pulse 0.5s';
                setTimeout(() => {
                    this.style.animation = '';
                }, 500);
                
                // Add click effect to container
                mapContainer.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    mapContainer.style.transform = 'scale(1)';
                }, 200);
                
                // Map island names to their corresponding HTML pages
                let link = '';
                
                switch(pulauName) {
                    case 'Sumatra': 
                    case 'Sumatera': 
                        link = 'sumatera.html'; 
                        break;
                    case 'Sulawesi': 
                        link = 'Sulawesi.html'; 
                        break;
                    case 'Kalimantan': 
                        link = 'Kalimantan.html'; 
                        break;
                    case 'Jawa': 
                        link = 'Jawa.html'; 
                        break;
                    case 'Nusa Tenggara': 
                        link = 'nusa-tenggara.html'; 
                        break;
                    case 'Papua': 
                        link = 'Papua.html'; 
                        break;
                    default:
                        console.warn(`⚠️ No link mapping for: ${pulauName}`);
                }
                
                if (link) {
                    console.log(`✅ Opening popup for ${pulauName} → ${link}`);
                    showPopup(link, pulauName);
                } else {
                    console.error(`❌ No link found for island: ${pulauName}`);
                    alert(`Halaman untuk ${pulauName} belum tersedia.`);
                }
            });
        });
        
        console.log('✅ Interactive map initialized successfully');
    }

    // ========================
    // MAP TOOLTIP SYSTEM
    // ========================
    function showMapTooltip(event, pulauName) {
        // Remove existing tooltip if any
        const existingTooltip = document.querySelector('.peta-tooltip');
        if (existingTooltip) {
            existingTooltip.remove();
        }
        
        // Create new tooltip
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
        
        // Update tooltip position
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
    // POPUP MODAL SYSTEM
    // ========================
    function initPopup() {
        const popup = document.getElementById('popup');
        const popupText = document.getElementById('popup-text');
        const btnKunjungi = document.getElementById('kunjungi');
        const btnTutup = document.getElementById('tutup');
        
        if (!popup || !popupText || !btnKunjungi || !btnTutup) {
            console.warn('⚠️ Popup elements not found');
            return;
        }
        
        console.log('🔔 Popup system initialized');
        
        // Button "Kunjungi" - Navigate to island page
        btnKunjungi.addEventListener('click', function(e) {
            e.preventDefault();
            console.log(`🚀 Navigating to: ${window.currentLink}`);
            
            if (window.currentLink) {
                // Close animation
                popup.style.opacity = '0';
                popup.querySelector('.popup-box').style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    popup.style.display = 'none';
                    // Navigate to the selected island page
                    window.location.href = window.currentLink;
                }, 300);
            } else {
                console.error('❌ No link available');
                alert('Terjadi kesalahan. Link tidak tersedia.');
            }
        });
        
        // Hover effect for Kunjungi button
        btnKunjungi.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 10px 25px rgba(42, 92, 57, 0.5)';
        });
        
        btnKunjungi.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(42, 92, 57, 0.3)';
        });
        
        // Button "Batal" - Close popup
        btnTutup.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('❌ Popup cancelled');
            
            popup.style.opacity = '0';
            popup.querySelector('.popup-box').style.transform = 'scale(0.8)';
            
            setTimeout(() => {
                popup.style.display = 'none';
                window.currentLink = "";
            }, 300);
        });
        
        // Hover effect for Tutup button
        btnTutup.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.5)';
        });
        
        btnTutup.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
        });
        
        // Click outside popup to close
        popup.addEventListener('click', function(e) {
            if (e.target === this) {
                console.log('❌ Popup closed by clicking outside');
                
                popup.style.opacity = '0';
                popup.querySelector('.popup-box').style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    this.style.display = 'none';
                    window.currentLink = "";
                }, 300);
            }
        });
        
        console.log('✅ Popup event listeners attached');
    }

    // ========================
    // CUSTOM SLIDER SYSTEM
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
        
        // Add click handlers to "See More" buttons
        const seeMoreButtons = document.querySelectorAll('.content button');
        seeMoreButtons.forEach((button, index) => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                showDetailModal(index);
                
                button.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    button.style.transform = 'scale(1)';
                }, 200);
            });
        });
        
        console.log('✅ Custom slider initialized');
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
                (currentPage === '' && linkPage === 'index.html')) {
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
        
        console.log('✅ Navigation initialized');
    }

    // ========================
    // SWIPER CARD SLIDER
    // ========================
    function initSwiper() {
        const swiperContainer = document.querySelector('.swiper-wrapper');
        if (!swiperContainer) return;
        
        const swiper = new Swiper('.slider-wrapper', {
            loop: true,
            grabCursor: true,
            spaceBetween: 30,
            
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true
            },
            
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            
            breakpoints: {
                0: {
                    slidesPerView: 1
                },
                768: {
                    slidesPerView: 2
                },
                1024: {
                    slidesPerView: 3
                }
            }
        });
        
        console.log('✅ Swiper card slider initialized');
    }

    // ========================
    // INITIALIZE ALL FEATURES
    // ========================
    function initializeAll() {
        console.log('🚀 Starting initialization...');
        
        createFloatingLeaves();
        animateCounters();
        initScrollEffects();
        initPageLoad();
        enhanceMapInteractions();
        initCustomSlider();
        initPopup();
        initNavigation();
        initSwiper();
        
        console.log('✅ All features initialized successfully!');
        console.log('🌿 Forest Keeper Interactive Map is ready!');
    }
    
    // Start initialization
    initializeAll();
});

// ============================================================================
// GLOBAL FUNCTIONS
// ============================================================================

/**
 * Show popup modal for island navigation
 * @param {string} link - URL to navigate to
 * @param {string} namaPulau - Name of the island
 */
function showPopup(link, namaPulau) {
    console.log(`📢 showPopup called with link: ${link}, island: ${namaPulau}`);
    
    // Store the link globally so it can be accessed by the button
    window.currentLink = link;
    
    // Normalize the island name for display
    const namaLengkap = namaPulau === 'Sumatra' || namaPulau === 'Sumatera' ? 'Sumatra' : namaPulau;
    
    const popup = document.getElementById('popup');
    const popupText = document.getElementById('popup-text');
    
    if (!popup || !popupText) {
        console.error('❌ Popup elements not found!');
        return;
    }
    
    popupText.textContent = `Apakah Anda ingin mengunjungi halaman Pulau ${namaLengkap}?`;
    
    popup.style.display = 'flex';
    popup.style.opacity = '0';
    popup.querySelector('.popup-box').style.transform = 'scale(0.8)';
    
    // Trigger animation
    setTimeout(() => {
        popup.style.opacity = '1';
        popup.querySelector('.popup-box').style.transform = 'scale(1)';
    }, 10);
    
    console.log('✅ Popup displayed successfully');
}

/**
 * Show detailed modal for species information
 * @param {number} index - Index of the species
 */
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
        },
        {
            name: "Bekantan",
            description: "Primata endemik Kalimantan dengan hidung panjang yang khas.",
            habitat: "Hutan mangrove Kalimantan",
            conservation: "Endangered",
            fact: "Jantan memiliki hidung yang sangat besar untuk menarik betina."
        },
        {
            name: "Kantong Semar",
            description: "Tumbuhan karnivora yang menangkap serangga.",
            habitat: "Hutan hujan Kalimantan",
            conservation: "Various (some endangered)",
            fact: "Menggunakan kantong berisi cairan untuk mencerna mangsa."
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

// ============================================================================
// ADDITIONAL CSS ANIMATIONS (Injected via JavaScript)
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.textContent = `
        /* Tooltip Animation */
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
        
        /* Pulse Animation */
        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.05);
            }
        }
        
        .pulse {
            animation: pulse 0.5s ease-in-out;
        }
        
        /* Species Modal Styles */
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
            transform: scale(1.2) rotate(90deg);
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
        
        /* Tooltip Arrow */
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
        
        /* Interactive Hover Effects */
        .interactive-hover {
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1);
        }
        
        .interactive-hover:hover {
            transform: translateY(-5px);
        }
        
        /* Loading Animation */
        .loading.hidden {
            opacity: 0;
            pointer-events: none;
        }
        
        /* Back to Top Button */
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #2a5c39, #4caf50);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 5px 15px rgba(42, 92, 57, 0.3);
        }
        
        .back-to-top.show {
            opacity: 1;
            visibility: visible;
        }
        
        .back-to-top:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(42, 92, 57, 0.5);
        }
    `;
    document.head.appendChild(style);
    
    console.log('✅ Additional CSS animations injected');
});
