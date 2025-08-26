// Portfolio Page JavaScript - Isolated Version with Enhanced Animations

// Use a unique namespace to avoid conflicts
window.PortfolioPage = window.PortfolioPage || {};

(function() {
    'use strict';
    
    // Initialize when DOM is ready
    function initPortfolioPage() {
        console.log('Initializing Portfolio Page functionality...');
        
        // Check if we're on the portfolio page
        const portfolioContainer = document.querySelector('.portfolio-items');
        if (!portfolioContainer) {
            console.log('Not on portfolio page, skipping initialization');
            return;
        }
        
        // Get all elements
        const filterButtons = document.querySelectorAll('.filter-btn');
        const modal = document.getElementById('projectModal');
        const closeModal = document.querySelector('.close-modal');
        const viewProjectBtns = document.querySelectorAll('.view-project-btn');
        
        // Helpers
        function normalizeSrc(src) { return (src || '').replace(/\\/g, '/').replace(/\s+/g, '%20'); }
        function fileBase(src) {
            const s = normalizeSrc(src);
            const name = s.split('/').pop() || '';
            return name.replace(/\.[^.]+$/, '');
        }
        function prettifyFromFilename(src) {
            const base = fileBase(src);
            // Remove common camera-like prefixes
            const cleaned = base.replace(/^PHOTO[-_]/i, '')
                                .replace(/\d{4}-\d{2}-\d{2}[-_]\d{2}[-_]\d{2}[-_]\d{2}(\([0-9]+\))?/g, '')
                                .replace(/[-_]+/g, ' ')
                                .trim();
            if (cleaned) return cleaned.replace(/\b\w/g, c => c.toUpperCase());
            return 'Untitled Work';
        }
        function descriptionForCategory(category) {
            switch (category) {
                case 'calligraphy': return 'Hand-crafted lettering exploring rhythm, balance, and negative space.';
                case 'abstract': return 'Expressive composition focusing on color, form, and texture.';
                case 'interior': return 'Functional spatial design emphasizing comfort, light, and materiality.';
                default: return 'Original creative work from the studio.';
            }
        }
        
        // BEGIN dynamic append from user-provided lists with de-duplication
        if (portfolioContainer && !portfolioContainer.dataset.generated) {
            const existingSrcSet = new Set(
                Array.from(document.querySelectorAll('.portfolio-image img'))
                    .map(img => normalizeSrc(img.getAttribute('src')))
            );
            
            const calligraphyImages = [
                'images/Paintings/PHOTO-2025-07-25-10-34-28(1).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-28(2).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-29(1).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-29.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-30(1).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-30.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-31(1).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-31(2).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-31(3).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-32(2).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-33(2).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-33(3).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-35-02(1).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-35-02(2).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-36(1).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-36(2).jpg'
            ];
            const interiorImages = [
                'images/Misc/PHOTO-2025-07-25-10-33-58.jpg',
                'images/Misc/PHOTO-2025-07-25-10-34-02(1).jpg',
                'images/Misc/PHOTO-2025-07-25-10-34-23.jpg',
                'images/Misc/PHOTO-2025-07-25-10-34-45.jpg',
                'images/Misc/PHOTO-2025-07-25-10-34-46.jpg',
                'images/Misc/PHOTO-2025-07-25-10-34-17(2).jpg'
            ];
            const abstractImages = [
                'images/Paintings/PHOTO-2025-07-25-10-33-58.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-33-59.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-00(1).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-00(2).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-00.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-01(1).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-01(2).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-01.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-02.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-04(1).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-04.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-05(1).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-05(2).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-05.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-06(1).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-06.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-07(1).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-07(2).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-07.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-08(1).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-08(2).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-08.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-09(1).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-09.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-11.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-14(1).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-14(2).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-14.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-15(1).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-15(2).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-15(3).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-15.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-16.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-18(1).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-18.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-19(1).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-19.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-20.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-21(1).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-21(2).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-21.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-22.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-24(1).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-24(2).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-24.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-25(1).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-25(2).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-25.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-26(1).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-26(2).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-26(3).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-26.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-27(1).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-27(2).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-27.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-33(1).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-33.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-34(1).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-34(2).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-34.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-35(1).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-35(2).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-35(3).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-35.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-36(3).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-36.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-37.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-38(1).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-38(2).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-38(3).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-38.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-39(1).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-39.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-40(1).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-40(2).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-40.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-41(1).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-41(2).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-41(3).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-41.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-42(1).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-42(2).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-42.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-43(1).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-43(2).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-43(3).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-43.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-44(1).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-44(2).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-44.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-45(1).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-45(2).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-45(3).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-45.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-46(1).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-46.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-47(1).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-47(2).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-47(3).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-47.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-48(1).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-48(2).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-48.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-49(1).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-49(2).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-49(3).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-49.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-50(1).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-50(2).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-50.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-51(2).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-51.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-52(1).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-52(2).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-52.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-53(1).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-53(2).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-53(3).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-53.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-54(1).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-54(2).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-54.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-55(1).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-55.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-56(1).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-56(2).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-56.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-57(1).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-57.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-58(1).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-58(2).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-58.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-59(1).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-34-59.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-35-00(1).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-35-00.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-35-02.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-35-03(1).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-35-03.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-35-04(1).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-35-04(2).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-35-04.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-35-05.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-35-06.jpg',
                'images/Paintings/PHOTO-2025-07-25-10-35-07(1).jpg',
                'images/Paintings/PHOTO-2025-07-25-10-35-07.jpg',
                'images/Misc/PHOTO-2025-07-25-10-34-13(2).jpg',
                'images/Misc/PHOTO-2025-07-25-10-34-13.jpg',
                'images/Misc/PHOTO-2025-07-25-10-34-21.jpg',
                'images/Misc/PHOTO-2025-07-25-10-34-37.jpg'
            ];
            function createItem(src, title, subtitle, cat) {
                const el = document.createElement('div');
                el.className = 'portfolio-item';
                el.setAttribute('data-category', cat);
                const smartTitle = prettifyFromFilename(src) || title;
                const smartDesc = subtitle || descriptionForCategory(cat);
                el.innerHTML = `
                    <div class="portfolio-image">
                        <img src="${src}" alt="${smartTitle}" loading="lazy" decoding="async">
                        <div class="portfolio-overlay">
                            <div class="overlay-content">
                                <h3>${smartTitle}</h3>
                                <p>${smartDesc}</p>
                                <button class="view-project-btn">View Project</button>
                            </div>
                        </div>
                    </div>`;
                return el;
            }
            [...calligraphyImages.map(s => ({s, c:'calligraphy'})),
             ...interiorImages.map(s => ({s, c:'interior'})),
             ...abstractImages.map(s => ({s, c:'abstract'}))]
             .forEach(({s, c}) => {
                const norm = normalizeSrc(s);
                if (!existingSrcSet.has(norm)) {
                    existingSrcSet.add(norm);
                    portfolioContainer.appendChild(createItem(norm, 'Portfolio Work', descriptionForCategory(c), c));
                }
             });
            portfolioContainer.dataset.generated = 'true';
        }
        // END dynamic append

        // Relabel existing static cards with smart titles/descriptions
        (function relabelExisting() {
            document.querySelectorAll('.portfolio-item').forEach(item => {
                const img = item.querySelector('.portfolio-image img');
                const cat = item.getAttribute('data-category') || 'portfolio';
                const titleEl = item.querySelector('.overlay-content h3');
                const descEl = item.querySelector('.overlay-content p');
                if (img && titleEl && descEl) {
                    const generatedTitle = prettifyFromFilename(img.getAttribute('src'));
                    if (generatedTitle) titleEl.textContent = generatedTitle;
                    if (!descEl.textContent || /Calligraphy|Abstract|Interior|Project|Design|Painting/i.test(descEl.textContent)) {
                        descEl.textContent = descriptionForCategory(cat);
                    }
                    img.alt = titleEl.textContent;
                }
            });
        })();
        
        // Filtering with animations
        function initPortfolioFiltering() {
            const allItems = () => document.querySelectorAll('.portfolio-item');
            filterButtons.forEach(function(button) {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    const filter = this.getAttribute('data-filter');
                    filterButtons.forEach(function(btn) {
                        btn.classList.remove('active');
                        btn.style.transform = 'translateY(0) scale(1)';
                    });
                    this.classList.add('active');
                    this.style.transform = 'translateY(-3px) scale(1.05)';
                    let visibleCount = 0;
                    allItems().forEach(function(item) {
                        const category = item.getAttribute('data-category');
                        const matches = filter === 'all' || category === filter;
                        if (matches) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                                item.style.transform = 'translateY(0) scale(1)';
                            }, visibleCount * 60);
                            visibleCount++;
            } else {
                item.style.opacity = '0';
                            item.style.transform = 'translateY(20px) scale(0.95)';
                            setTimeout(() => { item.style.display = 'none'; }, 250);
            }
        });
    });
});
        }
        
        // Add lazy-loading and broken-image cleanup to all images
        function enhanceImages() {
            const imgs = document.querySelectorAll('.portfolio-image img');
            imgs.forEach(img => {
                if (!img.hasAttribute('loading')) img.setAttribute('loading', 'lazy');
                if (!img.hasAttribute('decoding')) img.setAttribute('decoding', 'async');
                img.addEventListener('error', () => {
                    const item = img.closest('.portfolio-item');
                    if (item) item.remove();
                }, { once: true });
            });
        }
        
        // Modal
        function initModal() {
            function openModal(projectTitle) {
                const projectData = {};
                const modalTitle = document.getElementById('modalTitle');
                const modalDescription = document.getElementById('modalDescription');
                const modalCategory = document.getElementById('modalCategory');
                const modalYear = document.getElementById('modalYear');
                const modalMedium = document.getElementById('modalMedium');
                if (modalTitle) modalTitle.textContent = projectTitle;
                if (modalDescription) modalDescription.textContent = 'Detailed project view with additional visuals.';
                if (modalCategory) modalCategory.textContent = 'Portfolio';
                if (modalYear) modalYear.textContent = '2024';
                if (modalMedium) modalMedium.textContent = '—';
                const modal = document.getElementById('projectModal');
                if (!modal) return;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
                setTimeout(() => {
                    const modalContent = modal.querySelector('.modal-content');
                    modalContent.style.opacity = '1';
                    modalContent.style.transform = 'translateY(0) scale(1)';
                }, 10);
            }
            document.querySelectorAll('.view-project-btn').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    const card = this.closest('.portfolio-item');
                    const title = card?.querySelector('.overlay-content h3')?.textContent || 'Project';
                    openModal(title);
                });
            });
            if (closeModal) closeModal.addEventListener('click', closeModalWithAnimation);
            const modal = document.getElementById('projectModal');
            window.addEventListener('click', (e) => { if (e.target === modal) closeModalWithAnimation(); });
            document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal && modal.style.display === 'block') closeModalWithAnimation(); });
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
        
        initPortfolioFiltering();
        enhanceImages();
        initModal();
        console.log('Portfolio functionality initialized successfully!');
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPortfolioPage);
    } else {
        initPortfolioPage();
    }
    window.addEventListener('load', function() {
        if (!window.PortfolioPage.initialized) {
            console.log('Initializing portfolio from window load...');
            initPortfolioPage();
            window.PortfolioPage.initialized = true;
        }
    });
    window.PortfolioPage.init = initPortfolioPage;
})(); 