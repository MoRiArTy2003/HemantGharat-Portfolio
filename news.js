// News Page JavaScript - Isolated Version with Enhanced Animations

// Use a unique namespace to avoid conflicts
window.NewsPage = window.NewsPage || {};

(function() {
    'use strict';
    
    // Initialize when DOM is ready
    function initNewsPage() {
        console.log('Initializing News Page functionality...');
        
        // Check if we're on the news page
        const newsContainer = document.querySelector('.news-items');
        if (!newsContainer) {
            console.log('Not on news page, skipping initialization');
            return;
        }
        
        // Helper: normalize src
        const normalizeSrc = (s) => (s || '').replace(/\\/g, '/').replace(/\s+/g, '%20');
        
        // Provided image lists (normalized to forward slashes)
        const exhibitionsMisc = [
            'images/Misc/PHOTO-2025-07-25-10-34-02.jpg',
            'images/Misc/PHOTO-2025-07-25-10-34-03(1).jpg',
            'images/Misc/PHOTO-2025-07-25-10-34-03.jpg',
            'images/Misc/PHOTO-2025-07-25-10-34-09.jpg'
        ];
        const awardsMisc = [
            'images/Misc/PHOTO-2025-07-25-10-34-17.jpg',
            'images/Misc/PHOTO-2025-07-25-10-34-11.jpg',
            'images/Misc/PHOTO-2025-07-25-10-34-16(1).jpg',
            'images/Misc/PHOTO-2025-07-25-10-34-16.jpg',
            'images/Misc/PHOTO-2025-07-25-10-34-17(1).jpg',
            'images/Misc/PHOTO-2025-07-25-10-34-22(1).jpg'
        ];
        const newsImages = [
            'images/News/PHOTO-2025-07-25-10-33-59.jpg',
            'images/News/PHOTO-2025-07-25-10-34-03(1).jpg',
            'images/News/PHOTO-2025-07-25-10-34-03.jpg',
            'images/News/PHOTO-2025-07-25-10-34-04.jpg',
            'images/News/PHOTO-2025-07-25-10-34-06(1).jpg',
            'images/News/PHOTO-2025-07-25-10-34-06.jpg',
            'images/News/PHOTO-2025-07-25-10-34-10(1).jpg',
            'images/News/PHOTO-2025-07-25-10-34-10.jpg',
            'images/News/PHOTO-2025-07-25-10-34-23.jpg'
        ];
        
        // Helper to create a news item card with category
        function createNewsItem(src, title, subtitle, metaLabel, categoryKey) {
            const wrapper = document.createElement('div');
            wrapper.className = 'news-item';
            if (categoryKey) wrapper.setAttribute('data-category', categoryKey);
            wrapper.innerHTML = `
                <div class="news-image">
                    <img src="${src}" alt="${title}" loading="lazy" decoding="async">
                    <div class="news-overlay">
                        <div class="overlay-content">
                            <h3>${title}</h3>
                            <p>${subtitle}</p>
                            <button class="view-news-btn">View Details</button>
                        </div>
                    </div>
                </div>
                <div class="news-info">
                    <div class="news-meta">
                        <span class="news-date">2024</span>
                        <span class="news-category">${metaLabel}</span>
                    </div>
                    <h3>${title}</h3>
                    <p>${subtitle}</p>
                </div>
            `;
            return wrapper;
        }
        
        // De-duplicate and append once
        if (!newsContainer.dataset.generated) {
            const existing = new Set(
                Array.from(document.querySelectorAll('.news-image img')).map(i => normalizeSrc(i.getAttribute('src')))
            );
            newsImages.forEach((src) => {
                const norm = normalizeSrc(src);
                if (!existing.has(norm)) {
                    existing.add(norm);
                    newsContainer.appendChild(createNewsItem(norm, 'News Feature', 'Latest coverage and updates', 'Press', 'press'));
                }
            });
            exhibitionsMisc.forEach((src) => {
                const norm = normalizeSrc(src);
                if (!existing.has(norm)) {
                    existing.add(norm);
                    newsContainer.appendChild(createNewsItem(norm, 'Exhibition Highlight', 'Gallery showcase and events', 'Exhibition', 'exhibitions'));
                }
            });
            awardsMisc.forEach((src) => {
                const norm = normalizeSrc(src);
                if (!existing.has(norm)) {
                    existing.add(norm);
                    newsContainer.appendChild(createNewsItem(norm, 'Award & Recognition', 'Honors and accolades', 'Awards & Recognition', 'awards'));
                }
            });
            newsContainer.dataset.generated = 'true';
        }
        
        // Re-query items after potential dynamic append
        const categoryButtons = document.querySelectorAll('.category-btn');
        const newsItems = document.querySelectorAll('.news-item');
        const modal = document.getElementById('newsModal');
        const closeModal = document.querySelector('.close-modal');
        
        // Add lazy loading / broken image cleanup for all news images
        document.querySelectorAll('.news-image img').forEach(img => {
            if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
            if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
            img.addEventListener('error', () => {
                const card = img.closest('.news-item');
                if (card) card.remove();
            }, { once: true });
        });
        
        // Initialize category filtering with enhanced animations
        function initCategoryFiltering() {
            if (categoryButtons.length === 0) return;
            categoryButtons.forEach(function(button) {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    const category = this.getAttribute('data-category');
                    categoryButtons.forEach(function(btn) {
                        btn.classList.remove('active');
                        btn.style.transform = 'translateY(0) scale(1)';
                    });
                    this.classList.add('active');
                    this.style.transform = 'translateY(-3px) scale(1.05)';
                    let visibleCount = 0;
                    document.querySelectorAll('.news-item').forEach(function(item) {
                        const itemCategory = item.getAttribute('data-category');
                        const matches = category === 'all' || itemCategory === category;
                        if (matches) {
                            item.style.display = 'block';
                            setTimeout(() => {
                                item.style.opacity = '1';
                                item.style.transform = 'translateY(0) scale(1)';
                            }, visibleCount * 100);
                            visibleCount++;
                        } else {
                            item.style.opacity = '0';
                            item.style.transform = 'translateY(20px) scale(0.95)';
                            setTimeout(() => {
                                item.style.display = 'none';
                            }, 300);
                        }
                    });
                });
            });
        }
        
        // Modal functionality (generic)
        function initModal() {
            const viewButtons = document.querySelectorAll('.view-news-btn');
            function openModalGeneric(title, description, categoryLabel) {
                if (!modal) return;
                const modalTitle = document.getElementById('modalTitle');
                const modalDescription = document.getElementById('modalDescription');
                const modalDate = document.getElementById('modalDate');
                const modalCategory = document.getElementById('modalCategory');
                const modalSource = document.getElementById('modalSource');
                if (modalTitle) modalTitle.textContent = title || 'News Detail';
                if (modalDescription) modalDescription.textContent = description || 'More details coming soon.';
                if (modalDate) modalDate.textContent = '2024';
                if (modalCategory) modalCategory.textContent = categoryLabel || 'News';
                if (modalSource) modalSource.textContent = '—';
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
                setTimeout(() => {
                    const modalContent = modal.querySelector('.modal-content');
                    modalContent.style.opacity = '1';
                    modalContent.style.transform = 'translateY(0) scale(1)';
                }, 10);
            }
            viewButtons.forEach(function(btn) {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    const card = this.closest('.news-item');
                    const title = card?.querySelector('.overlay-content h3')?.textContent || card?.querySelector('.news-info h3')?.textContent || 'News Detail';
                    const categoryLabel = card?.querySelector('.news-category')?.textContent || 'News';
                    openModalGeneric(title, 'Click through to see more details and images.', categoryLabel);
                });
            });
            if (closeModal) {
                closeModal.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    closeModalWithAnimation();
                });
            }
            window.addEventListener('click', function(e) {
                if (e.target === modal) {
                    closeModalWithAnimation();
                }
            });
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && modal && modal.style.display === 'block') {
                    closeModalWithAnimation();
                }
            });
            function closeModalWithAnimation() {
                const modalContent = modal.querySelector('.modal-content');
                modalContent.style.opacity = '0';
                modalContent.style.transform = 'translateY(-50px) scale(0.95)';
                setTimeout(() => {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                    modalContent.style.opacity = '1';
                    modalContent.style.transform = 'translateY(0) scale(1)';
                }, 300);
            }
        }
        
        initCategoryFiltering();
        initModal();
        console.log('News functionality initialized successfully!');
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initNewsPage);
    } else {
        initNewsPage();
    }
    window.addEventListener('load', function() {
        if (!window.NewsPage.initialized) {
            console.log('Initializing from window load...');
            initNewsPage();
            window.NewsPage.initialized = true;
        }
    });
    window.NewsPage.init = initNewsPage;
})();

