# Aman Kumar — Personal Portfolio & Systems Showcase

> **Electrical Engineering Undergraduate @ Indian Institute of Technology Mandi (2026 – 2030)**  
> *Systems, low-level architecture, software engineering, and clean UI/UX design.*

---

## ⚡ Overview

A modern, high-performance, single-page portfolio engineered for **Aman Kumar**. The site is inspired by an engineering mission-control console combined with clean, human-crafted Apple-level polish. Built completely in **pure semantic HTML5, modern CSS3, and vanilla JavaScript (ES6+)** with **zero build tools, zero frameworks, and zero external runtime dependencies** — deployable directly to **GitHub Pages**.

- **Live URL**: [https://kuaman-student.github.io/](https://kuaman-student.github.io/)
- **Repository**: [https://github.com/kuaman-student](https://github.com/kuaman-student)
- **Profile Avatar**: [GitHub Avatar](https://avatars.githubusercontent.com/u/301948178?v=4)
- **Contact Email**: [amankr022008@gmail.com](mailto:amankr022008@gmail.com)

---

## 🛠️ Architecture & Tech Stack

- **HTML5**: Semantic tags, accessible landmarks, OpenGraph meta tags, and structured microdata.
- **CSS3**: CSS Custom Properties (Theme tokens), CSS Grid, Flexbox, glassmorphism (`backdrop-filter`), responsive fluid typography via `clamp()`, and hardware-accelerated animations.
- **Vanilla JavaScript (ES6+)**:
  - Asynchronous JSON project loader via `fetch('./projects.json')` (with embedded fallback for local `file://` protocol execution).
  - Dynamic typewriter terminal text animation.
  - Interactive HTML5 canvas particle/node network with mouse proximity physics.
  - Real-time GitHub API telemetry (live repository count, followers, following, gists, and recent repo stream).
  - Live GitHub contribution graph synced via `ghchart`.
  - Client-side category filtering and real-time search indexer.
  - One-click clipboard copy utilities with custom toast notifications.
  - Interactive dispatch console contact form.
  - Scroll progress bar and smooth active navigation spy via `IntersectionObserver`.

---

## 📂 Project Structure

```text
MyPortfolio/
├── index.html        # Main single-page application entry point
├── style.css         # Complete styling, design tokens & responsive media queries
├── script.js         # Dynamic rendering, GitHub API, canvas & interactions
├── projects.json     # Project catalog & hidden design manifests
└── README.md         # Documentation & deployment guide
```

---

## 🔐 Hidden Admin Mechanism

The portfolio includes an administrative mode for displaying creative and UI/UX design prototypes (e.g., Figma files, Canva packaging designs, logos) alongside software engineering projects.

- **Standard Visitor View (`index.html`)**:
  - Displays all 8 software engineering projects (Python, C++, Web, Firebase, etc.).
  - The "UI & Design" filter tab is hidden.
- **Admin View (`index.html?admin=true`)**:
  - Appending `?admin=true` unseals the `_hidden_projects` array from `projects.json`.
  - Unlocks the **"UI & Design"** filter button.
  - Displays the active **"⚡ ADMIN MODE"** pulsing indicator in the header and status banner.
  - A toggle link in the footer allows switching between Public and Admin view.

---

## 🚀 How to Run & Deploy

### Local Preview (Browser)
1. Double-click `index.html` or open it directly in any modern web browser (Chrome, Edge, Firefox, Safari).
2. To test HTTP fetching with a local server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Or Node.js npx
   npx serve .
   ```
   Open `http://localhost:8000` or `http://localhost:8000/?admin=true`.

### GitHub Pages Deployment
1. Initialize git in this directory (if not already done):
   ```bash
   git init
   git add .
   git commit -m "feat: complete modern portfolio for Aman Kumar"
   ```
2. Link to your GitHub repository:
   ```bash
   git branch -M main
   git remote add origin https://github.com/kuaman-student/kuaman-student.github.io.git
   git push -u origin main
   ```
3. In your GitHub repository settings, go to **Settings > Pages > Branch**, select `main` (root `/`), and click **Save**. Your site will be live within minutes!

---

## 👤 Profile & Social Links

- **Name**: Aman Kumar
- **College**: Indian Institute of Technology Mandi (IIT Mandi), Himachal Pradesh
- **Department**: Electrical Engineering (B.Tech 2026 – 2030)
- **Club**: ACM Student Chapter — IIT Mandi (UI/UX Designer & Creative Member)
- **GitHub**: [@kuaman-student](https://github.com/kuaman-student)
- **LinkedIn**: [Aman Kumar](https://www.linkedin.com/in/aman-kumar-a94464418/)
- **Tech Blog**: [TechGenHub](https://techgenhub.blogspot.com)
- **Instagram**: [@kuaman_2008](https://www.instagram.com/kuaman_2008/)

---

© 2026 Aman Kumar. Electrical Engineering @ IIT Mandi.
