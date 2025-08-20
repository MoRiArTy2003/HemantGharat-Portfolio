// Portfolio Page JavaScript

// Portfolio filtering functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.getAttribute('data-filter');
        
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter portfolio items with animation
        portfolioItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
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
const modal = document.getElementById('projectModal');
const closeModal = document.querySelector('.close-modal');
const viewProjectBtns = document.querySelectorAll('.view-project-btn');

// Project data (in a real application, this would come from a database)
const projectData = {
    'Elegant Script': {
        title: 'Elegant Script',
        description: 'A beautiful hand-lettered calligraphy piece showcasing elegant script writing. This work demonstrates mastery of traditional calligraphy techniques with modern design principles.',
        category: 'Calligraphy & Design',
        year: '2024',
        medium: 'Hand-lettered calligraphy'
    },
    'Abstract Harmony': {
        title: 'Abstract Harmony',
        description: 'A contemporary abstract painting that explores the relationship between color, form, and emotion. This piece was created using oil on canvas and represents a personal journey through artistic expression.',
        category: 'Abstract Painting',
        year: '2024',
        medium: 'Oil on canvas'
    },
    'Modern Living Space': {
        title: 'Modern Living Space',
        description: 'A sophisticated residential interior design project that combines modern aesthetics with functional living. This space emphasizes clean lines, natural materials, and comfortable living.',
        category: 'Interior Design',
        year: '2024',
        medium: 'Residential interior design'
    },
    'Wedding Invitations': {
        title: 'Wedding Invitations',
        description: 'Custom calligraphy design for wedding invitations featuring elegant typography and sophisticated layout. Each invitation is hand-crafted with attention to detail and personal touch.',
        category: 'Calligraphy & Design',
        year: '2024',
        medium: 'Custom calligraphy design'
    },
    'Color Symphony': {
        title: 'Color Symphony',
        description: 'An acrylic painting that celebrates the power of color and its ability to evoke emotion. This piece uses bold, vibrant colors to create a sense of energy and movement.',
        category: 'Abstract Painting',
        year: '2024',
        medium: 'Acrylic on canvas'
    },
    'Cozy Corner': {
        title: 'Cozy Corner',
        description: 'A warm and inviting living room design that creates the perfect space for relaxation and entertainment. This design focuses on comfort, functionality, and aesthetic appeal.',
        category: 'Interior Design',
        year: '2024',
        medium: 'Living room design'
    },
    'Inspirational Quotes': {
        title: 'Inspirational Quotes',
        description: 'Calligraphy artwork featuring inspirational quotes and meaningful words. Each piece is carefully crafted to inspire and motivate through beautiful typography and thoughtful design.',
        category: 'Calligraphy & Design',
        year: '2024',
        medium: 'Calligraphy artwork'
    },
    'Emotional Flow': {
        title: 'Emotional Flow',
        description: 'A mixed media abstract painting that captures the flow of emotions through dynamic brushstrokes and layered textures. This piece explores the connection between art and human emotion.',
        category: 'Abstract Painting',
        year: '2024',
        medium: 'Mixed media on canvas'
    },
    'Serene Bedroom': {
        title: 'Serene Bedroom',
        description: 'A peaceful master bedroom design that promotes rest and relaxation. This space features calming colors, soft textures, and thoughtful lighting to create the perfect sanctuary.',
        category: 'Interior Design',
        year: '2024',
        medium: 'Master bedroom design'
    }
};

// Open modal when clicking on project
viewProjectBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const projectTitle = btn.closest('.overlay-content').querySelector('h3').textContent;
        openModal(projectTitle);
    });
});

// Open modal function
function openModal(projectTitle) {
    const project = projectData[projectTitle];
    if (project) {
        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalDescription').textContent = project.description;
        document.getElementById('modalCategory').textContent = project.category;
        document.getElementById('modalYear').textContent = project.year;
        document.getElementById('modalMedium').textContent = project.medium;
        
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

// Portfolio item click to open modal
portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
        const projectTitle = item.querySelector('.overlay-content h3').textContent;
        openModal(projectTitle);
    });
});

// Smooth scroll to top when filter changes
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        setTimeout(() => {
            window.scrollTo({
                top: document.querySelector('.portfolio-grid').offsetTop - 100,
                behavior: 'smooth'
            });
        }, 100);
    });
});

// Lazy loading for portfolio images (if real images are added)
const portfolioImages = document.querySelectorAll('.portfolio-image img');
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

portfolioImages.forEach(img => imageObserver.observe(img));

// Add loading animation for portfolio items
window.addEventListener('load', () => {
    portfolioItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Hover effects for portfolio items
portfolioItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
    });
});

// Filter button hover effects
filterButtons.forEach(button => {
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