// Contact Page JavaScript

// Form validation and submission
const contactForm = document.getElementById('contact-form');
const submitBtn = document.querySelector('.submit-btn');

// Form validation functions
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validateName(name) {
    return name.trim().length >= 2;
}

function validateMessage(message) {
    return message.trim().length >= 10;
}

function showError(field, message) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.add('error');
    
    // Remove existing error message
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error message
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    formGroup.appendChild(errorMessage);
}

function removeError(field) {
    const formGroup = field.closest('.form-group');
    formGroup.classList.remove('error');
    
    const errorMessage = formGroup.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function showSuccess(message) {
    // Remove existing success message
    const existingSuccess = document.querySelector('.success-message');
    if (existingSuccess) {
        existingSuccess.remove();
    }
    
    // Add success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = message;
    
    // Insert before the form
    contactForm.parentNode.insertBefore(successMessage, contactForm);
    
    // Scroll to success message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Real-time validation
const nameField = document.getElementById('name');
const emailField = document.getElementById('email');
const messageField = document.getElementById('message');

nameField.addEventListener('blur', () => {
    if (!validateName(nameField.value)) {
        showError(nameField, 'Please enter a valid name (at least 2 characters)');
    } else {
        removeError(nameField);
    }
});

emailField.addEventListener('blur', () => {
    if (!validateEmail(emailField.value)) {
        showError(emailField, 'Please enter a valid email address');
    } else {
        removeError(emailField);
    }
});

messageField.addEventListener('blur', () => {
    if (!validateMessage(messageField.value)) {
        showError(messageField, 'Please enter a message (at least 10 characters)');
    } else {
        removeError(messageField);
    }
});

// Clear errors on input
[nameField, emailField, messageField].forEach(field => {
    field.addEventListener('input', () => {
        removeError(field);
    });
});

// Form submission
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validate all required fields
    let isValid = true;
    
    if (!validateName(nameField.value)) {
        showError(nameField, 'Please enter a valid name (at least 2 characters)');
        isValid = false;
    }
    
    if (!validateEmail(emailField.value)) {
        showError(emailField, 'Please enter a valid email address');
        isValid = false;
    }
    
    if (!validateMessage(messageField.value)) {
        showError(messageField, 'Please enter a message (at least 10 characters)');
        isValid = false;
    }
    
    if (!isValid) {
        return;
    }
    
    // Show loading state
    submitBtn.classList.add('loading');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    // Collect form data
    const formData = {
        name: nameField.value.trim(),
        email: emailField.value.trim(),
        subject: document.getElementById('subject').value || 'New Contact Form Submission',
        message: messageField.value.trim(),
        budget: document.getElementById('budget').value || 'Not specified',
        timeline: document.getElementById('timeline').value || 'Not specified',
        timestamp: new Date().toISOString()
    };
    
    try {
        // Send email using EmailJS
        const templateParams = {
            to_email: 'g.hemant29@gmail.com',
            from_name: formData.name,
            from_email: formData.email,
            subject: formData.subject,
            message: formData.message,
            budget: formData.budget,
            timeline: formData.timeline,
            timestamp: formData.timestamp
        };

        // Send email to you
        await emailjs.send('service_hemant_gharat', 'template_contact_form', templateParams);
        
        // Send confirmation email to the user
        const userTemplateParams = {
            to_email: formData.email,
            from_name: 'Hemant Gharat',
            user_name: formData.name,
            subject: formData.subject,
            message: formData.message
        };
        
        await emailjs.send('service_hemant_gharat', 'template_user_confirmation', userTemplateParams);
        
        // Show success message
        showSuccess('Thank you for your message! I will get back to you within 24-48 hours.');
        
        // Reset form
        contactForm.reset();
        
        // Remove all error states
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
            const errorMessage = group.querySelector('.error-message');
            if (errorMessage) {
                errorMessage.remove();
            }
        });
        
    } catch (error) {
        console.error('Error submitting form:', error);
        showError(submitBtn, 'There was an error sending your message. Please try again or contact me directly at g.hemant29@gmail.com');
    } finally {
        // Reset button state
        submitBtn.classList.remove('loading');
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    }
});

// Character counter for message field
messageField.addEventListener('input', () => {
    const maxLength = 1000;
    const currentLength = messageField.value.length;
    
    // Remove existing counter
    const existingCounter = messageField.parentNode.querySelector('.char-counter');
    if (existingCounter) {
        existingCounter.remove();
    }
    
    // Add character counter
    const counter = document.createElement('div');
    counter.className = 'char-counter';
    counter.style.cssText = `
        font-size: 0.875rem;
        color: ${currentLength > maxLength ? '#e74c3c' : '#666'};
        text-align: right;
        margin-top: 0.25rem;
    `;
    counter.textContent = `${currentLength}/${maxLength} characters`;
    
    messageField.parentNode.appendChild(counter);
    
    // Show error if over limit
    if (currentLength > maxLength) {
        showError(messageField, `Message is too long. Please keep it under ${maxLength} characters.`);
    } else {
        removeError(messageField);
    }
});

// Auto-resize textarea
messageField.addEventListener('input', () => {
    messageField.style.height = 'auto';
    messageField.style.height = Math.min(messageField.scrollHeight, 300) + 'px';
});

// Subject field change handler
document.getElementById('subject').addEventListener('change', (e) => {
    const subject = e.target.value;
    const messageField = document.getElementById('message');
    
    // Update placeholder based on subject
    const placeholders = {
        'commission': 'Tell me about the artwork you\'d like me to create...',
        'collaboration': 'Describe the collaboration opportunity you have in mind...',
        'exhibition': 'Tell me about the exhibition opportunity...',
        'workshop': 'Describe the workshop you\'d like me to conduct...',
        'other': 'Tell me about your inquiry...'
    };
    
    messageField.placeholder = placeholders[subject] || 'Tell me about your project or inquiry...';
});

// Social media link handlers
document.querySelectorAll('.social-section .social-link').forEach(link => {
    link.addEventListener('click', (e) => {
        // Add click tracking (replace with actual analytics)
        console.log('Social link clicked:', link.querySelector('span').textContent);
    });
});

// FAQ item expand/collapse (if needed)
document.querySelectorAll('.faq-item').forEach(item => {
    item.addEventListener('click', () => {
        // Add expand/collapse functionality if needed
        console.log('FAQ item clicked:', item.querySelector('h4').textContent);
    });
});

// Form field focus effects
document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(field => {
    field.addEventListener('focus', () => {
        field.closest('.form-group').style.transform = 'scale(1.02)';
    });
    
    field.addEventListener('blur', () => {
        field.closest('.form-group').style.transform = 'scale(1)';
    });
});

// Contact item hover effects
document.querySelectorAll('.contact-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-5px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
    });
});

// Smooth scroll to form when clicking contact links
document.querySelectorAll('a[href="#contact-form"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        contactForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Form accessibility improvements
document.querySelectorAll('.form-group label').forEach(label => {
    const field = document.getElementById(label.getAttribute('for'));
    if (field) {
        // Add aria-describedby for better screen reader support
        const fieldId = field.id;
        const descriptionId = `${fieldId}-description`;
        
        // Create description element
        const description = document.createElement('div');
        description.id = descriptionId;
        description.className = 'field-description';
        description.style.cssText = 'font-size: 0.875rem; color: #666; margin-top: 0.25rem;';
        
        // Add descriptions based on field type
        const descriptions = {
            'name': 'Enter your full name as you\'d like it to appear in correspondence.',
            'email': 'Enter a valid email address where I can reach you.',
            'subject': 'Select the most appropriate category for your inquiry.',
            'message': 'Provide details about your project, timeline, and any specific requirements.',
            'budget': 'This helps me understand the scope of your project (optional).',
            'timeline': 'When do you need this project completed? (optional)'
        };
        
        description.textContent = descriptions[fieldId] || '';
        field.parentNode.appendChild(description);
        
        // Add aria-describedby attribute
        field.setAttribute('aria-describedby', descriptionId);
    }
}); 