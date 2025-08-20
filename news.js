// News Page JavaScript

// News filtering functionality
const categoryButtons = document.querySelectorAll('.category-btn');
const newsItems = document.querySelectorAll('.news-item');

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        
        // Update active button
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter news items with animation
        newsItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            
            if (category === 'all' || itemCategory === category) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Modal functionality
const modal = document.getElementById('newsModal');
const closeModal = document.querySelector('.close-modal');
const viewNewsBtns = document.querySelectorAll('.view-news-btn');

// News data (in a real application, this would come from a database)
const newsData = {
    'Art & Design Magazine Feature': {
        title: 'Art & Design Magazine Feature',
        description: 'Featured as one of the emerging artists in contemporary calligraphy and design. The article explores the unique approach to combining traditional calligraphy techniques with modern design principles, highlighting the innovative work that has been gaining recognition in the art community.',
        date: 'March 2024',
        category: 'Press Coverage',
        source: 'Art & Design Magazine'
    },
    'Creative Process Interview': {
        title: 'Creative Process Interview',
        description: 'In-depth discussion about the creative process behind calligraphy and design work. This interview delves into the methodology, inspiration sources, and the journey from concept to completion, offering insights into the artistic approach and philosophy.',
        date: 'February 2024',
        category: 'Interview',
        source: 'Creative Process Channel'
    },
    'Design Excellence Award': {
        title: 'Design Excellence Award',
        description: 'Received the prestigious Design Excellence Award for innovative calligraphy work. This recognition celebrates the groundbreaking approach to traditional art forms and the contribution to advancing the field of contemporary calligraphy.',
        date: 'January 2024',
        category: 'Award',
        source: 'Design Council'
    },
    'Solo Exhibition Opening': {
        title: 'Solo Exhibition Opening',
        description: 'Successful opening of "Harmony in Form" solo exhibition at Contemporary Art Gallery. The exhibition showcased a comprehensive collection of calligraphy, abstract paintings, and interior design concepts, receiving critical acclaim and strong public interest.',
        date: 'December 2023',
        category: 'Exhibition',
        source: 'Contemporary Art Gallery'
    },
    'Local News Feature': {
        title: 'Local News Feature',
        description: 'Featured in local newspaper for contributions to the arts community. The article highlighted the impact on local culture and the commitment to fostering artistic growth in the community through workshops and public art projects.',
        date: 'November 2023',
        category: 'Press Coverage',
        source: 'Local Daily News'
    },
    'Podcast Interview': {
        title: 'Podcast Interview',
        description: 'Guest appearance on "Art & Creativity" podcast discussing interior design philosophy. The conversation explored the intersection of art and functionality, sharing insights on creating spaces that are both beautiful and practical.',
        date: 'October 2023',
        category: 'Interview',
        source: 'Art & Creativity Podcast'
    },
    'Artist of the Year': {
        title: 'Artist of the Year',
        description: 'Named Artist of the Year by the Regional Arts Council for outstanding contributions. This honor recognizes the significant impact on the regional arts scene and the dedication to promoting artistic excellence and cultural enrichment.',
        date: 'September 2023',
        category: 'Award',
        source: 'Regional Arts Council'
    },
    'Group Exhibition': {
        title: 'Group Exhibition',
        description: 'Participated in "Contemporary Perspectives" group exhibition with Modern Art Collective. The exhibition brought together diverse artistic voices, showcasing the collaborative spirit and shared vision for contemporary art.',
        date: 'August 2023',
        category: 'Exhibition',
        source: 'Modern Art Collective'
    }
};

// Open modal when clicking on news item
viewNewsBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const newsTitle = btn.closest('.overlay-content').querySelector('h3').textContent;
        openModal(newsTitle);
    });
});

// Open modal function
function openModal(newsTitle) {
    const news = newsData[newsTitle];
    if (news) {
        document.getElementById('modalTitle').textContent = news.title;
        document.getElementById('modalDescription').textContent = news.description;
        document.getElementById('modalDate').textContent = news.date;
        document.getElementById('modalCategory').textContent = news.category;
        document.getElementById('modalSource').textContent = news.source;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

// Close modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// News item click to open modal
newsItems.forEach(item => {
    item.addEventListener('click', () => {
        const newsTitle = item.querySelector('.news-info h3').textContent;
        openModal(newsTitle);
    });
});

// Smooth scroll to top when category changes
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        setTimeout(() => {
            window.scrollTo({
                top: document.querySelector('.news-grid').offsetTop - 100,
                behavior: 'smooth'
            });
        }, 100);
    });
});

// Lazy loading for news images (if real images are added)
const newsImages = document.querySelectorAll('.news-image img');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        }
    });
});

newsImages.forEach(img => imageObserver.observe(img));

// Add loading animation for news items
window.addEventListener('load', () => {
    newsItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Hover effects for news items
newsItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
    });
});

// Category button hover effects
categoryButtons.forEach(button => {
    button.addEventListener('mouseenter', () => {
        if (!button.classList.contains('active')) {
            button.style.transform = 'translateY(-2px)';
        }
    });
    
    button.addEventListener('mouseleave', () => {
        if (!button.classList.contains('active')) {
            button.style.transform = 'translateY(0)';
        }
    });
});

