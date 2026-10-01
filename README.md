# Project PULSE website

One-page website for **Project PULSE** (Student Wellbeing, Support and Safety), a flagship project of the [Tyler Nicholas Foundation](https://tyler-nicholas-foundation.online/).

Plain HTML, CSS and JavaScript. No build step, no frameworks.

## Structure

```
index.html              Home page (project overview, demo link, surveys)
about.html              About page (Meet Tyler Nicholas, mission, objectives, privacy, TNF)
assets/css/style.css    All styles (colours are set at the top in :root)
assets/js/main.js       Loading screen, mobile menu, survey embeds, photo protection
assets/img/             Logos, banner and favicons
.nojekyll               Tells GitHub Pages to serve files as-is
```

## Publish on GitHub Pages

1. Upload everything in this folder to the root of your repository.
2. Go to **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`.
3. To use a custom domain, add it under **Custom domain** on the same page.

## Loading screen timing

At the top of `index.html` and `about.html`, inside the `<head>`, change:

- `FIRST_VISIT = 6000` (6 seconds on the first page someone opens)
- `BETWEEN_PAGES = 900` (when moving between Home and About in the same visit)

## Surveys

Both Google Forms live in `index.html` (`id="studentForm"` and `id="stakeholderForm"`).
They load only when someone taps the survey button, which keeps the page fast.

## Demo link

"Test Our Exemplary Page" points to https://projectpulsetestpage.tyler-nicholas-foundation.online

## Links

- Contact: https://tyler-nicholas-foundation.online/contact/
- Privacy Policy: https://tyler-nicholas-foundation.online/privacy
- Terms of Use: https://tyler-nicholas-foundation.online/terms
