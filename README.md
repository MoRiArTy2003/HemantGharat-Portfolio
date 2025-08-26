# Hemant Gharat - Artist & Designer Website

A modern, responsive website showcasing the work of Hemant Gharat, a contemporary artist and designer specializing in calligraphy, abstract painting, and interior design.

## Features

- **Responsive Design**: Optimized for all devices and screen sizes
- **Portfolio Gallery**: Showcase of artwork and design projects
- **Contact Form**: Functional contact form with email integration
- **Social Media Integration**: Links to Instagram, Facebook, and YouTube
- **Modern UI/UX**: Clean, professional design with smooth animations
- **SEO Optimized**: Proper meta tags and semantic HTML structure

## Pages

1. **Home** (`index.html`) - Landing page with featured work and about preview
2. **Portfolio** (`portfolio.html`) - Gallery of artwork and design projects
3. **News** (`news.html`) - Latest updates, exhibitions, and press coverage
4. **About** (`about.html`) - Artist biography and background information
5. **Contact** (`contact.html`) - Contact form and information

## Contact Information

- **Email**: g.hemant29@gmail.com
- **Phone**: +91 88790 14060
- **Social Media**:
  - Instagram: [@hheymantgharatt](https://www.instagram.com/hheymantgharatt/?igsh=aDBuaDJyNjBwMHBh#)
  - Facebook: [hemant.gharat](https://www.facebook.com/hemant.gharat)
  - YouTube: [@hemantgharat](https://www.youtube.com/@hemantgharat)

## Contact Form Setup

The contact form is configured to send emails to `g.hemant29@gmail.com` when users submit the form using **EmailJS** - a client-side email service that requires no server-side code.

### Requirements

- Any web hosting service (static hosting works perfectly)
- EmailJS account (free tier available)
- Gmail account for email service

### Setup Instructions

1. **Follow EmailJS Setup Guide**: See `EMAILJS_SETUP.md` for detailed instructions
2. **Create EmailJS Account**: Sign up at [EmailJS.com](https://www.emailjs.com/)
3. **Configure Email Service**: Connect your Gmail account
4. **Create Email Templates**: Set up notification and confirmation templates
5. **Update Public Key**: Replace the placeholder in `contact.html`
6. **Test**: Submit a test contact form to verify emails are being sent

### EmailJS Benefits

- ✅ **No PHP required** - Works on any static hosting
- ✅ **Free tier available** - 200 emails per month
- ✅ **Professional emails** - Custom templates and branding
- ✅ **Automatic confirmations** - Users get confirmation emails
- ✅ **Secure** - Encrypted API calls
- ✅ **Reliable** - 99.9% uptime guarantee

### Alternative Email Solutions

If you prefer not to use EmailJS:

1. **Formspree**: Use Formspree.io for simple form handling
2. **Netlify Forms**: If hosting on Netlify, use their built-in form handling
3. **Google Forms**: Free but less professional appearance
4. **Mailchimp**: For marketing-focused forms

## File Structure

```
website/
├── index.html          # Home page
├── about.html          # About page
├── portfolio.html      # Portfolio page
├── news.html          # News page
├── contact.html       # Contact page
├── styles.css         # Main stylesheet
├── contact.css        # Contact page styles
├── about.css          # About page styles
├── portfolio.css      # Portfolio page styles
├── news.css           # News page styles
├── script.js          # Main JavaScript
├── contact.js         # Contact form JavaScript (EmailJS)
├── portfolio.js       # Portfolio gallery JavaScript
├── news.js            # News page JavaScript
├── .htaccess          # Server configuration
├── 404.html           # Custom error page
├── README.md          # Project documentation
├── EMAILJS_SETUP.md   # EmailJS setup guide
└── images/            # Image assets
    ├── Misc/          # Miscellaneous images
    ├── News/          # News images
    └── Paintings/     # Artwork images
```

## Customization

### Colors and Styling
- Main colors are defined in `styles.css`
- Each page has its own CSS file for specific styling
- Font families: Inter (sans-serif) and Allura (cursive)

### Content Updates
- Update text content directly in HTML files
- Replace images in the `images/` directory
- Modify contact information in all HTML files

### Social Media Links
- Instagram: Update the Instagram URL in all HTML files
- Facebook: Update the Facebook URL in all HTML files
- YouTube: Update the YouTube URL in all HTML files

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimizations

- Optimized images for web
- Minified CSS and JavaScript (recommended for production)
- Lazy loading for images (can be implemented)
- CDN for external resources (Font Awesome, Google Fonts)

## Security Considerations

- Input validation and sanitization in PHP
- CSRF protection (recommended for production)
- Rate limiting for contact form (recommended)
- HTTPS encryption (recommended for production)

## Deployment

1. **Local Development**: Use a local web server (XAMPP, WAMP, etc.)
2. **Shared Hosting**: Upload files to your web hosting provider
3. **VPS/Dedicated Server**: Deploy to your own server
4. **Static Hosting**: Convert to static site if using alternative email solutions

## Support

For technical support or customization requests, contact the developer or refer to the documentation of the technologies used.

## License

This website is created for Hemant Gharat. All rights reserved. 
