# Project PULSE website

One-page website for **Project PULSE** (Student Wellbeing, Support and Safety), a flagship project of the [Tyler Nicholas Foundation](https://tyler-nicholas-foundation.online/).

Plain HTML, CSS and JavaScript. No build step, no frameworks.

## Structure

```
index.html              The whole site (Home + About sections)
assets/css/style.css    All styles (colours are set at the top in :root)
assets/js/main.js       Loading screen, mobile menu, survey embeds, nav highlighting
assets/img/             Logos, banner and favicons
.nojekyll               Tells GitHub Pages to serve files as-is
```

## Publish on GitHub Pages

1. Upload everything in this folder to the root of your repository.
2. Go to **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`.
3. To use a custom domain, add it under **Custom domain** on the same page.

## Adding the stakeholder survey

In `index.html`, find `id="stakeholderForm"` and fill in:

- `data-src` with the Google Form embed link (the one ending in `?embedded=true`)
- `data-height` with the height number from Google's embed code

Until `data-src` is filled in, the button shows a short "available shortly" message.

## Links

- Contact: https://tyler-nicholas-foundation.online/contact/
- Privacy Policy: https://tyler-nicholas-foundation.online/privacy
- Terms of Use: https://tyler-nicholas-foundation.online/terms
