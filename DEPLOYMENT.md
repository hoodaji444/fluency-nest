# Fluency Nest — Deployment & Setup Guide

## Table of Contents
1. [Website Overview](#overview)
2. [Editing Business Information](#editing)
3. [Form Backend Setup](#form-backend)
4. [Deploying to Hostinger](#hostinger)
5. [Domain Connection & HTTPS](#domain)
6. [Viewing Student Enquiries](#enquiries)
7. [Google Analytics Setup](#analytics)
8. [Ongoing Maintenance](#maintenance)

---

## 1. Website Overview {#overview}

**Technology Stack:** Next.js 15 (App Router) + TypeScript + Vanilla CSS  
**Form Backend:** Server-side API route (`/api/enquiry`)  
**Hosting Compatibility:** Requires Node.js hosting (not shared PHP hosting)

### What is included:
- Full homepage with all requested sections
- German A1, A2, B1, B2 course cards
- French and English language course cards  
- Working enquiry form with validation + spam protection
- Google Sheets integration (requires setup)
- Email notification support (requires setup)
- Privacy Policy page
- Terms & Conditions page
- Floating WhatsApp button
- Mobile-responsive design
- SEO metadata

---

## 2. Editing Business Information {#editing}

**All business details are centralised in ONE file:**

📄 `src/lib/config.ts`

Open this file and update:
- Institute phone number
- WhatsApp number  
- Email address
- Address
- Social media links
- Opening hours
- Course descriptions, durations, fees

After editing, rebuild and redeploy the site.

---

## 3. Form Backend Setup {#form-backend}

The enquiry form (`/api/enquiry`) supports two backends:

### Option A: Google Sheets (Recommended — Free)

1. Create a new Google Sheet with these column headers in Row 1:
   ```
   Timestamp | Name | Mobile | Email | Course | Mode | City | Timing | Goal | Message
   ```

2. In Google Sheets, go to **Extensions → Apps Script** and paste this code:
   ```javascript
   function doPost(e) {
     var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     var data = JSON.parse(e.postData.contents);
     
     sheet.appendRow([
       data.timestamp,
       data.name,
       data.mobile,
       data.email || '',
       data.course || '',
       data.mode || '',
       data.city || '',
       data.timing || '',
       data.goal || '',
       data.message || ''
     ]);
     
     return ContentService.createTextOutput(
       JSON.stringify({ success: true })
     ).setMimeType(ContentService.MimeType.JSON);
   }
   ```

3. Click **Deploy → New Deployment → Web App**
   - Execute as: **Me**
   - Who has access: **Anyone**

4. Copy the Web App URL.

5. Add to your `.env.local` file:
   ```
   GOOGLE_SHEET_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_ID/exec
   ```

### Option B: Email Notifications (Gmail)

1. Enable 2-Factor Authentication on your Gmail account.
2. Go to **Google Account → Security → App Passwords**.
3. Create an App Password for "Mail".
4. Add to `.env.local`:
   ```
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASS=your-16-character-app-password
   NOTIFY_EMAIL=info@fluencynest.in
   ```

> 💡 You can enable BOTH options simultaneously — enquiries will be saved to Google Sheets AND an email notification will be sent.

---

## 4. Deploying to Hostinger {#hostinger}

> ⚠️ **Important:** This is a Next.js application. It **requires Node.js hosting**, not standard shared PHP hosting.

### Hostinger Hosting Options:

| Option | Compatible | Notes |
|--------|-----------|-------|
| Shared Hosting | ❌ No | PHP-based, not compatible |
| VPS Hosting | ✅ Yes | Recommended — full control |
| Cloud Hosting | ✅ Yes | Good performance |

### Recommended: Vercel (Easiest — Free Tier Available)

Vercel is made by the creators of Next.js and offers the smoothest deployment:

1. Create a free account at [vercel.com](https://vercel.com)
2. Import your project from GitHub or upload it
3. Add your environment variables in the Vercel dashboard
4. Vercel will automatically build and deploy
5. Connect your Hostinger domain (see next section)

### Alternative: Hostinger VPS

1. Log in to your Hostinger VPS
2. Install Node.js (v18 or later):
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
   apt-get install -y nodejs
   ```
3. Upload your project files via SFTP or Git
4. Install dependencies:
   ```bash
   npm install
   ```
5. Build the production app:
   ```bash
   npm run build
   ```
6. Start the application:
   ```bash
   npm start
   ```
7. Use PM2 to keep it running:
   ```bash
   npm install -g pm2
   pm2 start npm --name "fluent-nest" -- start
   pm2 save
   pm2 startup
   ```
8. Configure Nginx as a reverse proxy (port 3000 → port 80/443)

---

## 5. Domain Connection & HTTPS {#domain}

### Connecting Your Hostinger Domain to Vercel:

1. In Vercel dashboard → Your Project → **Settings → Domains**
2. Add your domain (e.g., `fluencynest.in` and `www.fluencynest.in`)
3. Vercel will provide DNS records to add

4. Log into your Hostinger account → **Domains → DNS Zone**
5. Add the DNS records Vercel provided:
   - Type: `A` Record → Points to Vercel's IP
   - Type: `CNAME` → `www` → `cname.vercel-dns.com`

6. DNS propagation typically takes 15 minutes to 48 hours.

7. **HTTPS** is automatically enabled by Vercel (free SSL certificate).

### For Hostinger VPS:

1. Install Certbot for free SSL:
   ```bash
   apt install certbot python3-certbot-nginx
   certbot --nginx -d fluencynest.in -d www.fluencynest.in
   ```

---

## 6. Viewing Student Enquiries {#enquiries}

### If using Google Sheets:
- Open your Google Sheet directly — all enquiries appear in rows automatically.
- You can **filter, sort, and export** as CSV or Excel at any time.
- Share the sheet with your team members as needed.

### If using Email Notifications Only:
- Each new enquiry sends a formatted email to your NOTIFY_EMAIL address.

### Emergency Fallback:
- Even if both integrations fail, all enquiries are logged to your server console (accessible via Vercel dashboard → Logs, or via PM2 logs on VPS).

---

## 7. Google Analytics Setup {#analytics}

1. Create a Google Analytics 4 account at [analytics.google.com](https://analytics.google.com)
2. Create a new property for your website
3. Get your **Measurement ID** (format: `G-XXXXXXXXXX`)
4. Add to `src/app/layout.tsx`:

```tsx
// Add inside <head> section:
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`}
  strategy="afterInteractive"
/>
<Script id="gtag-init" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

Also: `npm install next/script` and add `import Script from 'next/script'`.

---

## 8. Adding Real Student Testimonials {#maintenance}

The testimonials section currently shows placeholder cards. To add real testimonials:

1. Open `src/components/HomePage.tsx`
2. Find the testimonials section (search for `STUDENT TESTIMONIALS`)
3. Replace each placeholder card with real student data:

```tsx
// Replace the placeholder with:
<div className={styles.testimonialCard}>
  <div className={styles.testimonialStars}>
    {[...Array(5)].map((_, j) => (
      <Star key={j} size={16} fill="#f59e0b" color="#f59e0b" />
    ))}
  </div>
  <p style={{ fontSize: "0.95rem", color: "#4a5568", lineHeight: 1.7, marginBottom: "20px" }}>
    "Your genuine student feedback here..."
  </p>
  <div className={styles.testimonialAuthor}>
    <div className={styles.testimonialAvatar}>P</div>
    <div>
      <div className={styles.testimonialName}>Priya Sharma</div>
      <div className={styles.testimonialCourse}>German B1 Graduate, Delhi</div>
    </div>
  </div>
</div>
```

## 9. Adding Real Google Maps Embed

1. Go to [Google Maps](https://maps.google.com) and search for your address
2. Click **Share → Embed a map → Copy HTML**
3. In `src/components/HomePage.tsx`, find the `contactMap` section
4. Replace the `mapPlaceholder` div with the embed code:

```tsx
<div className={styles.contactMap}>
  <iframe
    src="YOUR_GOOGLE_MAPS_EMBED_URL"
    width="100%"
    height="460"
    style={{ border: 0 }}
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    title="Fluency Nest location on Google Maps"
  />
</div>
```

---

## 10. Additional Paid Services Summary

| Service | Cost | Required |
|---------|------|----------|
| Hostinger Domain (already owned) | Already paid | ✅ Have it |
| Hostinger VPS Hosting | ~₹500–2000/month | Required for VPS route |
| Vercel Free Tier | Free | Option A (recommended) |
| Gmail App Password | Free | For email notifications |
| Google Sheets | Free | For enquiry storage |
| Google Analytics | Free | Optional |
| SSL Certificate (Vercel) | Free | Automatic |

> 💡 **Recommended Setup:** Deploy to Vercel (free tier) + Connect Hostinger domain + Use Google Sheets for enquiry storage. Total additional cost: ₹0.
