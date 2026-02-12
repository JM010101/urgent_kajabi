# Kajabi Implementation Guide
## Homepage + Events & Registration Page

This guide will walk you through implementing the homepage and events page in your Kajabi site.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Homepage Setup](#homepage-setup)
3. [Events Page Setup](#events-page-setup)
4. [Registration System Setup](#registration-system-setup)
5. [Adding & Editing Events](#adding--editing-events)
6. [Customization Tips](#customization-tips)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, ensure you have:
- ✅ Kajabi account with site access
- ✅ Admin access to your Kajabi site
- ✅ Basic understanding of HTML/CSS (helpful but not required)
- ✅ Access to upload images/assets

---

## Homepage Setup

### Step 1: Create a New Page

1. Log into your Kajabi dashboard
2. Navigate to **Website** → **Pages**
3. Click **"Create New Page"**
4. Name it "Homepage" or "Home"
5. Choose **"Custom Page"** template

### Step 2: Add Custom Code

1. In the page editor, click on **"Code"** or **"Custom Code"** section
2. Copy the entire contents of `homepage.html`
3. Paste into the HTML/Custom Code section
4. Save the page

### Step 3: Add CSS Styles

1. In Kajabi, go to **Website** → **Theme** → **Custom CSS**
2. Copy the entire contents of `styles.css`
3. Paste into the Custom CSS section
4. Save changes

### Step 4: Add JavaScript

1. In the same Custom Code section or in **Theme Settings** → **Custom JavaScript**
2. Copy the entire contents of `script.js`
3. Paste into the JavaScript section
4. Save changes

### Step 5: Update Assets

Replace placeholder images and update:
- Logo image (`logo.png`)
- Hero section images
- Course images
- Event images
- Testimonial images
- Contact section image

**To upload images in Kajabi:**
1. Go to **Website** → **Files**
2. Upload your images
3. Copy the image URLs
4. Replace placeholder URLs in the HTML

### Step 6: Update Content

Customize the following sections:
- **Top Bar**: Update contact information, social media links
- **Navigation**: Update menu links to match your site structure
- **Hero Section**: Update headline, description, CTA button
- **Services**: Update service descriptions
- **About Section**: Update about content
- **Courses**: Update course information
- **Events**: Update event previews
- **Testimonials**: Update testimonial information
- **Contact Form**: Connect to Kajabi form (see below)
- **Footer**: Update footer links and information

### Step 7: Set as Homepage

1. Go to **Website** → **Settings** → **Pages**
2. Set your new page as the homepage
3. Or update your navigation to link to `/homepage`

---

## Events Page Setup

### Step 1: Create Events Page

1. Navigate to **Website** → **Pages**
2. Click **"Create New Page"**
3. Name it "Events"
4. Choose **"Custom Page"** template

### Step 2: Add Events Page Code

1. Copy the entire contents of `events-page.html`
2. Paste into the page's Custom Code section
3. Save the page

### Step 3: Add Events JavaScript

1. In the same page or in Theme Custom JavaScript
2. Copy the entire contents of `events-script.js`
3. Paste into the JavaScript section
4. Save changes

### Step 4: Update Event Data

In `events-script.js`, update the `eventsData` object with your actual events:

```javascript
const eventsData = {
    'event-1': {
        id: 'event-1',
        title: 'Your Event Title',
        date: 'March 15, 2024',
        time: '10:00 AM - 2:00 PM EST',
        location: 'Virtual Event - Zoom Link Provided',
        type: 'virtual' // or 'in-person'
    },
    // Add more events...
};
```

### Step 5: Update Event Cards in HTML

In `events-page.html`, find the event cards and update:
- Event images
- Event titles
- Event descriptions
- Event dates/times
- Event locations
- Event categories (for filtering)

---

## Registration System Setup

### Option 1: Using Kajabi Forms (Recommended)

#### Step 1: Create a Kajabi Form

1. Go to **Contacts** → **Forms**
2. Click **"Create New Form"**
3. Name it "Event Registration"
4. Add the following fields:
   - First Name (required)
   - Last Name (required)
   - Email (required)
   - Phone Number
   - School/Organization
   - Job Title
   - Newsletter Subscription (checkbox)
   - Terms & Conditions (checkbox, required)

#### Step 2: Get Form Embed Code

1. In your form settings, find the **"Embed Code"** or **"Form ID"**
2. Copy the form ID or embed code

#### Step 3: Integrate with Registration Modal

Update the `handleRegistration` function in `events-script.js`:

```javascript
function handleRegistration(event) {
    event.preventDefault();
    
    const form = document.getElementById('registrationForm');
    const formData = new FormData(form);
    
    // Submit to Kajabi form
    Kajabi.form.submit({
        formId: 'YOUR_FORM_ID_HERE',
        data: {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            organization: formData.get('organization'),
            title: formData.get('title')
        }
    }).then(function(response) {
        // Success
        closeRegistrationModal();
        showSuccessMessage();
    }).catch(function(error) {
        // Error handling
        alert('Registration failed. Please try again.');
    });
}
```

### Option 2: Using Kajabi Offers (Free Registration)

#### Step 1: Create a Free Offer

1. Go to **Products** → **Offers**
2. Click **"Create New Offer"**
3. Set price to **$0.00** (Free)
4. Name it something like "Event Registration - [Event Name]"
5. Save the offer

#### Step 2: Get Offer URL

1. In the offer settings, copy the offer URL
2. It will look like: `https://yoursite.com/offers/[offer-id]`

#### Step 3: Update Registration Button

In `events-page.html` or `events-script.js`, update the registration button to redirect to the offer:

```javascript
function openRegistrationModal(eventId) {
    // Instead of opening modal, redirect to offer
    const offerUrl = getOfferUrlForEvent(eventId);
    window.location.href = offerUrl;
}

function getOfferUrlForEvent(eventId) {
    // Map event IDs to offer URLs
    const offerMap = {
        'event-1': '/offers/your-offer-id-1',
        'event-2': '/offers/your-offer-id-2',
        // etc.
    };
    return offerMap[eventId] || '/events';
}
```

### Option 3: Automated Email Confirmation

#### Step 1: Set Up Email Automation

1. Go to **Automations** → **Email Sequences**
2. Create a new sequence named "Event Registration Confirmation"
3. Add a trigger: **"Form Submitted"** or **"Offer Purchased"**
4. Select your registration form or offer

#### Step 2: Create Confirmation Email

1. In the email sequence, add an email
2. Include:
   - Thank you message
   - Event details (date, time, location)
   - Virtual link (if applicable)
   - Calendar invite (optional)
   - Contact information for questions

#### Step 3: Set Email Timing

- Set to send **immediately** after registration
- Or set a delay if needed

---

## Adding & Editing Events

### Method 1: Edit HTML Directly

1. Go to your Events page in Kajabi
2. Edit the Custom Code
3. Find the event card you want to edit
4. Update the event information:

```html
<div class="event-card-detailed" data-category="upcoming virtual">
    <div class="event-image">
        <img src="YOUR_IMAGE_URL" alt="Event Name">
        <div class="event-badge virtual">Virtual</div>
    </div>
    <div class="event-details">
        <div class="event-date">
            <i class="fas fa-calendar-alt"></i>
            <span>March 15, 2024</span>
        </div>
        <div class="event-time">
            <i class="fas fa-clock"></i>
            <span>10:00 AM - 2:00 PM EST</span>
        </div>
        <h3>Your Event Title</h3>
        <p>Your event description here...</p>
        <div class="event-location">
            <i class="fas fa-video"></i>
            <span>Virtual Event - Zoom Link Provided</span>
        </div>
        <div class="event-actions">
            <button class="btn btn-primary" onclick="openRegistrationModal('event-1')">
                Register Now - Free
            </button>
            <a href="/events/your-event-slug" class="btn btn-outline">Learn More</a>
        </div>
    </div>
</div>
```

### Method 2: Use Kajabi Blog Posts (Advanced)

You can use Kajabi's blog feature to manage events:

1. Create a blog category "Events"
2. Create blog posts for each event
3. Use Liquid template code to pull events dynamically
4. This requires more advanced customization

### Method 3: Create Event Detail Pages

For each event, create a dedicated page:

1. **Website** → **Pages** → **Create New Page**
2. Name it after your event
3. Add detailed event information
4. Link from the "Learn More" button on events page

---

## Customization Tips

### Colors

To change the color scheme, update CSS variables in `styles.css`:

```css
:root {
    --primary-green: #2d5016;  /* Change this */
    --dark-green: #1a3009;     /* Change this */
    --light-green: #4a7c2a;    /* Change this */
}
```

### Fonts

To change fonts, update the `font-family` in the `body` selector:

```css
body {
    font-family: 'Your Font', sans-serif;
}
```

### Mobile Menu

The mobile menu is automatically handled. To customize:
- Edit the mobile menu styles in `styles.css`
- Adjust breakpoints in media queries

### Forms

To customize form styling:
- Edit `.contact-form` and `.registration-form` styles
- Update form field styles in `styles.css`

---

## Troubleshooting

### Issue: Styles Not Loading

**Solution:**
- Ensure CSS is added to Theme Custom CSS, not just page code
- Clear browser cache
- Check for CSS syntax errors

### Issue: JavaScript Not Working

**Solution:**
- Ensure JavaScript is added to Theme Custom JavaScript or page code
- Check browser console for errors
- Verify jQuery/Kajabi scripts are loaded (if needed)

### Issue: Forms Not Submitting

**Solution:**
- Verify Kajabi form ID is correct
- Check that form fields match Kajabi form fields
- Test form submission in Kajabi dashboard first

### Issue: Images Not Displaying

**Solution:**
- Verify image URLs are correct
- Ensure images are uploaded to Kajabi Files
- Check image file permissions

### Issue: Mobile Layout Issues

**Solution:**
- Test on actual mobile device
- Check media query breakpoints
- Verify viewport meta tag is present

### Issue: Registration Modal Not Opening

**Solution:**
- Check browser console for JavaScript errors
- Verify `events-script.js` is loaded
- Ensure event IDs match between HTML and JavaScript

---

## Next Steps

1. ✅ Test all functionality on desktop and mobile
2. ✅ Set up email automation for confirmations
3. ✅ Add your actual content and images
4. ✅ Test registration flow end-to-end
5. ✅ Set up analytics tracking (if desired)
6. ✅ Train your team on how to add/edit events

---

## Support Resources

- **Kajabi Help Center**: https://help.kajabi.com
- **Kajabi Community**: https://community.kajabi.com
- **Kajabi University**: For advanced customization courses

---

## Quick Reference: File Locations

- **Homepage HTML**: `homepage.html`
- **Events Page HTML**: `events-page.html`
- **Styles**: `styles.css`
- **Homepage JavaScript**: `script.js`
- **Events JavaScript**: `events-script.js`

---

## Notes

- All code is ready to use but may need minor adjustments based on your Kajabi theme
- Test thoroughly before going live
- Keep backups of your original code
- Update event data regularly to keep content fresh

Good luck with your implementation! 🚀
