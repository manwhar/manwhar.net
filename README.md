# Research Portfolio (GitHub Pages) — Static Template

A dark-themed, scannable, research-reviewer-friendly portfolio site for REU applications.
Everything is static HTML/CSS/JS (no build tools, no frameworks).

## Deploy to GitHub Pages

1. Create a GitHub repository (e.g., `yourname.github.io` or any repo name).
2. Commit and push this folder’s contents to the repo root.
3. In GitHub:
   - **Settings → Pages**
   - **Build and deployment → Source**: select **Deploy from a branch**
   - Choose branch **main** (or `master`) and folder **/(root)**
4. Wait for deployment. Your site will be published at the URL shown in **Settings → Pages**.

Tip: This template uses **relative links** so it works both:
- when opened locally (double-click `index.html`), and
- when hosted as a project site on GitHub Pages.

## Replace text + links

Search for the word **"dummy"** across the repo and replace it with your content.

Key places to edit:
- `index.html`: name, tagline, about paragraph, research interests, featured projects, contact email
- `projects.html`: project summaries, tags, and links to project detail pages
- `projects/*.html`: the project writeups (abstract, contributions, methods, results, links)

### Resume link

Put your PDF here:
- `assets/Resume.pdf`

The site already links to it as a placeholder.

### GitHub + email

Update these placeholders:
- GitHub: `https://github.com/manwhar`
- Email: `mjhawar@ucsc.edu`

There’s also a **Copy email** button on the home page.

## Replace images

Images are SVG placeholders located in:
- `assets/img/`

Replace these files with your own images (or keep the filenames and swap contents):
- `placeholder-hero.svg`
- `placeholder-headshot.svg`
- `placeholder-project-1.svg` … `placeholder-project-4.svg`

### Headshot note

The headshot is displayed in a circular frame. Use a square photo for best results; it will be cropped to a circle.

## Add your interactive demos

Demo pages are intentionally not embedded anywhere. They live in:
- `demos/particle-demo.html`
- `demos/ml-demo.html`
- `demos/probabilistic-demo.html`

Each demo page contains an empty container:
- `#demo-root`

To add a demo:
1. Open the relevant `demos/*.html` file.
2. Paste your simulation/visualization code and mount/render into the element with id `demo-root`.
3. Keep the rest of the page minimal so reviewers can focus.

## Add a new project

1. Duplicate an existing project page in `projects/` (e.g., `projects/ml-agent.html`).
2. Rename it (e.g., `projects/my-new-project.html`).
3. Add a new card on `projects.html`:
   - Update the title, summary, tags
   - Point the link to your new project page
4. Optionally add it to the “Featured Projects” section on `index.html`.

## Add a new demo page

1. Duplicate a file in `demos/` (e.g., `demos/ml-demo.html`).
2. Rename it.
3. Link to it from:
   - `index.html` (Interactive Demos section)
   - and/or the relevant project detail page in `projects/`

## Keeping it REU-appropriate (quick tips)

- Lead with **1–2 sentence summaries** and clear tags (Simulation/ML/etc.).
- Prefer **one strong figure** per project over many screenshots.
- Include **evaluation details** (metrics, baselines, ablations) whenever possible.
- Keep writing concise: reviewers often skim.
- Make links obvious: resume, GitHub, email should be easy to find.
