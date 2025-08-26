# EmailJS Setup Guide for Contact Form

This guide will help you set up EmailJS to handle contact form submissions without any PHP dependencies.

## What is EmailJS?

EmailJS is a client-side email service that allows you to send emails directly from JavaScript without any server-side code. It's perfect for static websites and eliminates the need for PHP or other server-side languages.

## Step-by-Step Setup

### 1. Create EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

### 2. Add Email Service

1. Log in to your EmailJS dashboard
2. Go to "Email Services" tab
3. Click "Add New Service"
4. Choose your email provider:
   - **Gmail** (recommended for g.hemant29@gmail.com)
   - **Outlook**
   - **Yahoo**
   - **Custom SMTP**
5. Follow the authentication steps for your chosen provider
6. Name your service: `service_hemant_gharat`

### 3. Create Email Templates

#### Template 1: Contact Form Notification (for you)

1. Go to "Email Templates" tab
2. Click "Create New Template"
3. Name it: `template_contact_form`
4. Set the following content:

**Subject:**
```
New Contact Form Submission: {{subject}}
```

**Email Body:**
```
New contact form submission from your website:

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}
Budget: {{budget}}
Timeline: {{timeline}}
Timestamp: {{timestamp}}

Message:
{{message}}

---
This email was sent from your website contact form.
```

#### Template 2: User Confirmation (for visitors)

1. Create another template
2. Name it: `template_user_confirmation`
3. Set the following content:

**Subject:**
```
Thank you for contacting Hemant Gharat
```

**Email Body:**
```
Dear {{user_name}},

Thank you for reaching out to me through my website. I have received your message and will get back to you within 24-48 hours.

Here's a copy of your message:
Subject: {{subject}}
Message: {{message}}

Best regards,
Hemant Gharat
Contemporary Artist & Designer

---
This is an automated response. Please do not reply to this email.
```

### 4. Get Your Public Key

1. Go to "Account" tab in EmailJS dashboard
2. Copy your "Public Key"
3. Replace `YOUR_EMAILJS_PUBLIC_KEY` in `contact.html` with your actual public key

### 5. Update the Website

1. Open `contact.html`
2. Find this line:
   ```javascript
   emailjs.init("YOUR_EMAILJS_PUBLIC_KEY");
   ```
3. Replace `YOUR_EMAILJS_PUBLIC_KEY` with your actual public key from EmailJS

### 6. Test the Contact Form

1. Upload your website files to your hosting provider
2. Go to the contact page
3. Fill out and submit the contact form
4. Check your email (g.hemant29@gmail.com) for the notification
5. Check the email address you used in the form for the confirmation

## EmailJS Free Plan Limits

- **200 emails per month** (perfect for most small websites)
- **2 email templates**
- **1 email service**

## Paid Plans (if needed)

- **Personal**: $15/month - 1,000 emails, 5 templates, 2 services
- **Business**: $25/month - 10,000 emails, 10 templates, 5 services
- **Enterprise**: Custom pricing

## Troubleshooting

### Common Issues:

1. **"Service not found" error**
   - Make sure your service name is exactly `service_hemant_gharat`
   - Check that the service is active in your EmailJS dashboard

2. **"Template not found" error**
   - Make sure your template names are exactly `template_contact_form` and `template_user_confirmation`
   - Check that the templates are active

3. **Emails not sending**
   - Verify your email service authentication
   - Check your EmailJS dashboard for error logs
   - Ensure your public key is correct

4. **CORS errors**
   - EmailJS handles CORS automatically
   - Make sure you're using the latest EmailJS CDN link

### Testing Locally:

1. Use a local web server (not just opening the HTML file)
2. You can use Live Server in VS Code or any local server
3. EmailJS works perfectly with local development

## Security Features

- EmailJS uses secure API calls
- No sensitive data is stored on your server
- All communication is encrypted
- Rate limiting prevents spam

## Alternative Setup (if needed)

If you prefer not to use EmailJS, you can also use:

1. **Formspree.io** - Simple form handling
2. **Netlify Forms** - If hosting on Netlify
3. **Google Forms** - Free but less professional
4. **Mailchimp** - For marketing-focused forms

## Support

- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- EmailJS Community: [https://community.emailjs.com/](https://community.emailjs.com/)
- Email Support: support@emailjs.com

---

**Note**: This setup completely eliminates the need for PHP and will work on any static hosting service like GitHub Pages, Netlify, Vercel, or traditional web hosting.

