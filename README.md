# 🚀 Shlok Sharma — CS Portfolio Website

A modern, animated personal portfolio website for a Computer Science student. Built entirely with vanilla HTML, CSS, and JavaScript — no frameworks, no dependencies, one file.

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Status](https://img.shields.io/badge/status-live-brightgreen?style=flat)

---

## 🌐 Live Demo

> [View Portfolio →](https://your-username.github.io/portfolio)  
> *(Replace with your GitHub Pages or hosting URL)*

---

## ✨ Features

### Design & Animations
- **Glassmorphism UI** — frosted-glass cards with backdrop blur and transparent borders
- **Gradient text** — cyan-to-pink gradient on headings and the logo
- **Floating orbs** — ambient radial blobs that drift in the hero background
- **Slide-up hero** — page load animation fades and lifts hero content into view
- **Shimmer hover effect** — light sweep across project cards on hover
- **Scroll-triggered reveals** — project cards and education items fade in as they enter the viewport
- **Active nav highlight** — current section link turns cyan as you scroll

### Sections
| Section | Description |
|---|---|
| **Hero** | Full-viewport intro with name, title, and CTA buttons |
| **About** | Bio, role summary, and a hoverable skills grid |
| **Projects** | 6 project cards with tech tags, descriptions, and links |
| **Education** | Timeline-style education history and certifications |
| **Contact** | Links to Email, LinkedIn, GitHub, and Twitter |

---

## 🎨 Design System

### Color Palette
| Variable | Hex | Usage |
|---|---|---|
| `--primary` | `#00d9ff` | Cyan — highlights, borders, active states |
| `--secondary` | `#ff006e` | Pink — gradients, project links |
| `--accent` | `#8338ec` | Purple — gradient third stop |
| `--dark-bg` | `#0a0e27` | Deep navy — page background |
| `--dark-card` | `#1a1f3a` | Card backgrounds |
| `--text-primary` | `#f5f5f5` | Headings and body copy |
| `--text-secondary` | `#b0b0b0` | Muted descriptions |

### Typography
- **Segoe UI** (system font stack) — no external font dependency required

---

## 📁 Project Structure

```
portfolio/
└── index.html    # All HTML, CSS, and JS in one file
```

---

## 🚀 Getting Started

No install. No build step. Just open the file.

```bash
# Clone the repo
git clone https://github.com/your-username/portfolio.git

# Open directly in browser
open index.html
```

Or serve it locally:

```bash
# Python
python -m http.server 8080

# Node
npx serve .
```

Then visit `http://localhost:8080`.

---

## 🛠️ Customisation Guide

### Update your personal info
```html
<h1>Hi, I'm <span>Your Name</span></h1>
<p>Your Title | Your Stack | Your Tagline</p>
```

### Add a project card
Copy any `.project-card` block inside `#projects`:
```html
<div class="project-card">
    <h3>Project Name</h3>
    <p>Short description of what it does.</p>
    <div class="project-tags">
        <span class="tag">React</span>
        <span class="tag">Node.js</span>
    </div>
    <a href="https://github.com/your-repo" class="project-link">View Project →</a>
</div>
```

### Add a skill
Drop a new div inside `.skills-grid`:
```html
<div class="skill-tag">TypeScript</div>
```

### Update contact links
```html
<a href="mailto:you@email.com" class="contact-link">📧 Email</a>
<a href="https://linkedin.com/in/yourprofile" class="contact-link">💼 LinkedIn</a>
<a href="https://github.com/yourusername" class="contact-link">🐙 GitHub</a>
```

### Change the colour scheme
All colours are CSS custom properties — update `:root` once and the whole site follows:
```css
:root {
    --primary: #00d9ff;
    --secondary: #ff006e;
    --accent: #8338ec;
}
```

---

## 🌍 Deploy to GitHub Pages

1. Push `index.html` to your repo
2. Go to **Settings → Pages**
3. Set source: **Deploy from branch → main → / (root)**
4. Your site goes live at `https://your-username.github.io/repo-name`

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout Changes |
|---|---|
| `≤ 768px` | Nav gap reduced, hero title scales down, buttons stack full-width, contact links stack vertically |

---

## 🧩 JavaScript Overview

All scripts are at the bottom of `index.html`:

```
├── Smooth scroll        — anchor clicks scroll to target section via scrollIntoView
├── Scroll reveal        — IntersectionObserver fades in .project-card & .education-item
└── Active nav tracking  — scroll listener highlights the current section's nav link
```

---

## 📄 License

MIT — free to use, fork, and adapt. Credit appreciated but not required.

---

> Built with passion ✨ by [Shlok Sharma](https://www.linkedin.com/in/shloksharma-4167842a7)
