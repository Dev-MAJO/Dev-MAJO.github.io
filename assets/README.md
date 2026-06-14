# Adding your own content

This folder is where your personal files live. The site currently uses
placeholders so it runs immediately — replace them with your real files
using the steps below.

## 1. Add your resume

Put your resume PDF in this folder and name it exactly:

```
assets/resume.pdf
```

The "Download Resume" button in the hero section already points to
`assets/resume.pdf`, so as soon as the file exists, the button works.

## 2. Add your video projects (3 video edits)

You don't need to upload large video files to GitHub. The easiest options:

- **Upload the video to YouTube** (Unlisted is fine if you don't want it
  public) and copy the link.
- Or upload to **Google Drive** and set sharing to "Anyone with the link".

Then in `index.html`, find each video project card (search for
`Watch video`) and replace:

```html
<a href="#" class="project-link">Watch video ↗</a>
```

with your real link, e.g.:

```html
<a href="https://youtu.be/your-video-id" target="_blank" rel="noopener" class="project-link">Watch video ↗</a>
```

### Optional: real thumbnails instead of the icon placeholder
Add an image (e.g. `assets/projects/video-1.jpg`) to this folder, then
in `index.html` replace the placeholder `<div class="project-thumb thumb-video">...</div>`
contents with:

```html
<img src="assets/projects/video-1.jpg" alt="Video project thumbnail" />
```

## 3. Add your Figma design sample

1. In Figma, click **Share → Copy link** (make sure link sharing is
   turned on, "Anyone with the link can view").
2. In `index.html`, find the card titled **"Landing Page Concept — Figma"**
   and replace:

```html
<a href="#" class="project-link">View in Figma ↗</a>
```

with your Figma share link, e.g.:

```html
<a href="https://www.figma.com/file/your-file-id" target="_blank" rel="noopener" class="project-link">View in Figma ↗</a>
```

You can also rename the card title/description to match your actual
design (e.g. if it's a mobile app screen instead of a landing page).

## 4. Connect the contact form (optional but recommended)

Right now the form validates input but doesn't send anywhere. The
quickest free option is **Formspree**:

1. Go to https://formspree.io and sign up (free tier is fine).
2. Create a new form — you'll get an endpoint like
   `https://formspree.io/f/abc123`.
3. In `index.html`, update the `<form>` tag:

```html
<form class="contact-form reveal" id="contactForm" action="https://formspree.io/f/abc123" method="POST" novalidate>
```

4. In `script.js`, the validation already runs on submit. Once the
   `action` attribute is set, you can let the form submit normally after
   validation passes (or follow Formspree's fetch/AJAX docs to keep the
   custom success message).

## 5. Update real project descriptions

The SEO/content and support case study cards use general placeholder
descriptions. Swap in real numbers, client types (keep names anonymous
if needed), or screenshots of articles/dashboards you're proud of.
