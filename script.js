/**
 * AMAN KUMAR — PORTFOLIO JAVASCRIPT
 * Architecture: Pure Vanilla ES6+, Zero Dependencies
 * Features:
 *  - URL Parameter Admin Mode (?admin=true) for hidden design projects
 *  - Dynamic Projects loader from projects.json (with file:// fallback)
 *  - GitHub Live Telemetry (User Stats & Recent Repositories)
 *  - Interactive Canvas Mesh Background
 *  - Typewriter Dynamic Header
 *  - Scroll Progress & Active Nav Highlight
 *  - Clipboard Actions & Toast Feedback
 *  - Contact Form Dispatcher
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =========================================================================
  // 1. GLOBAL STATE & CONFIGURATION
  // =========================================================================
  const CONFIG = {
    githubUsername: 'kuaman-student',
    userApiUrl: 'https://api.github.com/users/kuaman-student',
    reposApiUrl: 'https://api.github.com/users/kuaman-student/repos?sort=updated&per_page=6',
    email: 'amankr022008@gmail.com',
    typewriterRoles: [
      'Electrical Engineering @ IIT Mandi',
      'System-Level Software Engineer',
      'Under the Hood: Compilers & Memory',
      'UI/UX Designer @ ACM IIT Mandi',
      'Full-Stack Web Architect'
    ]
  };

  // Check URL params for Admin Mode (?admin=true)
  const urlParams = new URLSearchParams(window.location.search);
  const isAdmin = urlParams.get('admin') === 'true';

  let allProjects = [];
  let currentFilter = 'all';
  let searchQuery = '';

  // Fallback Data in case projects.json fetch is blocked by browser CORS on local file://
  const FALLBACK_PROJECTS = {
    projects: [
      {
        id: "DEV-01",
        title: "StudyOS",
        category: "code",
        badge: "FEATURED",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80",
        link: "https://github.com/kuaman-student/StudyOS",
        github: "https://github.com/kuaman-student/StudyOS",
        description: "Feature-rich Python terminal study application with task management, analytics, user profile JSON configuration, and customizable color themes.",
        tags: ["Python", "CLI", "JSON", "Terminal"]
      },
      {
        id: "DEV-02",
        title: "SimCompanies Tools",
        category: "code",
        badge: "AUTOMATION",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
        link: "https://github.com/kuaman-student/simcompanies-tools",
        github: "https://github.com/kuaman-student/simcompanies-tools",
        description: "Real-time market monitoring and automation tool for SimCompanies — Firebase RTDB, price analytics, alert system.",
        tags: ["Python", "Firebase", "REST APIs", "Automation"]
      },
      {
        id: "DEV-03",
        title: "Engineering Branch Explorer",
        category: "code",
        badge: "WEB APP",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80",
        link: "https://github.com/kuaman-student/engineering-branch-explorer",
        github: "https://github.com/kuaman-student/engineering-branch-explorer",
        description: "Interactive web app to explore IIT engineering branches, admission cutoffs, curriculum insights, and career directions.",
        tags: ["HTML", "CSS", "JavaScript"]
      },
      {
        id: "DEV-04",
        title: "Quiz Master Arena",
        category: "code",
        badge: "WEB APP",
        image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800&auto=format&fit=crop&q=80",
        link: "https://github.com/kuaman-student/quiz-master-arena",
        github: "https://github.com/kuaman-student/quiz-master-arena",
        description: "Modern web-based MCQ answer checker with custom answer keys, countdown timer, instant analytics, and detailed review.",
        tags: ["HTML", "CSS", "JavaScript"]
      },
      {
        id: "DEV-05",
        title: "JEE Ultimate Tracker",
        category: "code",
        badge: "DASHBOARD",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80",
        link: "https://github.com/kuaman-student/jee-ultimate-tracker",
        github: "https://github.com/kuaman-student/jee-ultimate-tracker",
        description: "Web dashboard for JEE prep — subject-wise syllabus tracking, daily study hours, test analytics, and countdown.",
        tags: ["JavaScript", "HTML", "CSS"]
      },
      {
        id: "DEV-06",
        title: "PlanMyClass",
        category: "code",
        badge: "WEB APP",
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&auto=format&fit=crop&q=80",
        link: "https://github.com/kuaman-student/PlanMyClass",
        github: "https://github.com/kuaman-student/PlanMyClass",
        description: "Classroom planning app for timetable organization and lecture scheduling.",
        tags: ["JavaScript", "HTML", "CSS"]
      },
      {
        id: "DEV-07",
        title: "Oncology Analytics Portal",
        category: "code",
        badge: "DATA",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80",
        link: "https://github.com/kuaman-student/Oncology-Analytics-Portal",
        github: "https://github.com/kuaman-student/Oncology-Analytics-Portal",
        description: "Python-based analytics application for exploring medical oncology data patterns and patient record insights.",
        tags: ["Python", "Data Analysis", "Healthcare"]
      },
      {
        id: "DEV-08",
        title: "C++ & DSA Practice",
        category: "code",
        badge: "ALGORITHMS",
        image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop&q=80",
        link: "https://github.com/kuaman-student/cpp-dsa-striver",
        github: "https://github.com/kuaman-student/cpp-dsa-striver",
        description: "Daily C++ and DSA practice following Striver's A2Z sheet — sorting, searching, graphs, DP, and more.",
        tags: ["C++", "DSA", "Algorithms"]
      }
    ],
    _hidden_projects: [
      {
        id: "DSG-01",
        title: "Dreamy Choco — Packaging Design",
        category: "design",
        tool: "canva",
        badge: "DESIGN",
        image: "https://snipboard.io/mOGxc5.jpg",
        link: "https://canva.link/yx46m58r84vh0c3",
        description: "Full packaging design for a blackberry-flavored chocolate bar — front, back, in-use shots, and a matching thank-you card.",
        tags: ["Canva", "Packaging"]
      },
      {
        id: "DSG-02",
        title: "Four Dots — Game Logo",
        category: "design",
        tool: "canva",
        badge: "LOGO",
        image: "https://snipboard.io/0jXbgr.jpg",
        link: "https://canva.link/ao82ncevmt6b6rs",
        description: "Circular node-based logo for the game Four Dots.",
        tags: ["Canva", "Logo"]
      },
      {
        id: "DSG-03",
        title: "DMC App — UI Design",
        category: "design",
        tool: "figma",
        badge: "UI/UX",
        image: "https://snipboard.io/3fP0rM.jpg",
        link: "https://www.figma.com/design/UQK84vxVKmVoeKnKkgAR0z",
        description: "Complete mobile UI flow — login, permissions, club screens, and error states.",
        tags: ["Figma", "Mobile UI"]
      },
      {
        id: "DSG-04",
        title: "TechGenHub — Blog Logo",
        category: "design",
        tool: "canva",
        badge: "LOGO",
        image: "https://snipboard.io/TW9pCG.jpg",
        link: "https://canva.link/s02c82ykh7ladt2",
        description: "Circuit-styled lion logo for TechGenHub blog.",
        tags: ["Canva", "Logo", "Branding"]
      },
      {
        id: "DSG-05",
        title: "Truecaller — App Prototype",
        category: "design",
        tool: "figma",
        badge: "PROTOTYPE",
        image: "https://snipboard.io/8RDgsS.jpg",
        link: "https://www.figma.com/design/FmtayQfA7P7kPXGWeQh2tQ",
        description: "Complete mobile UI prototype for Truecaller app — Figma.",
        tags: ["Figma", "Prototype"]
      }
    ]
  };

  // =========================================================================
  // 2. ADMIN MODE INITIALIZATION
  // =========================================================================
  function initAdminMode() {
    const adminHeaderBadge = document.getElementById('adminHeaderBadge');
    const adminNoticeBanner = document.getElementById('adminNoticeBanner');
    const designFilterBtn = document.getElementById('designFilterBtn');
    const footerAdminStatus = document.getElementById('footerAdminStatus');
    const adminToggleLink = document.getElementById('adminToggleLink');

    if (isAdmin) {
      if (adminHeaderBadge) adminHeaderBadge.style.display = 'inline-flex';
      if (adminNoticeBanner) adminNoticeBanner.style.display = 'block';
      if (designFilterBtn) designFilterBtn.style.display = 'inline-flex';
      if (footerAdminStatus) footerAdminStatus.textContent = 'Mode: Admin (Internal Unlocked)';
      if (adminToggleLink) {
        adminToggleLink.textContent = '[Disable Admin]';
        adminToggleLink.href = window.location.pathname; // remove query param
      }
      showToast('Admin Mode Active: Design prototypes unlocked.', 'info');
    } else {
      if (adminHeaderBadge) adminHeaderBadge.style.display = 'none';
      if (adminNoticeBanner) adminNoticeBanner.style.display = 'none';
      if (designFilterBtn) designFilterBtn.style.display = 'none';
      if (footerAdminStatus) footerAdminStatus.textContent = 'Mode: Public';
      if (adminToggleLink) {
        adminToggleLink.textContent = '[Enable Admin]';
        adminToggleLink.href = '?admin=true';
      }
    }
  }

  // =========================================================================
  // 3. TOAST NOTIFICATIONS
  // =========================================================================
  function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = '⚡';
    if (type === 'success') icon = '✓';
    if (type === 'error') icon = '✕';

    toast.innerHTML = `
      <span class="toast-icon font-mono">${icon}</span>
      <span class="toast-text">${message}</span>
    `;

    container.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    // Auto dismiss after 3.5s
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        if (toast.parentNode === container) {
          container.removeChild(toast);
        }
      }, 300);
    }, 3500);
  }

  // =========================================================================
  // 4. SCROLL PROGRESS & HEADER SCROLL BEHAVIOR
  // =========================================================================
  function initScrollTracking() {
    const progressBar = document.getElementById('scrollProgressBar');
    const siteHeader = document.getElementById('siteHeader');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      if (progressBar) {
        progressBar.style.width = `${progress}%`;
      }

      if (siteHeader) {
        if (scrollTop > 40) {
          siteHeader.classList.add('scrolled');
        } else {
          siteHeader.classList.remove('scrolled');
        }
      }

      // Active Section Navigation Tracking
      let currentSectionId = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
          currentSectionId = section.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
        }
      });
    }, { passive: true });
  }

  // =========================================================================
  // 5. MOBILE MENU DRAWER
  // =========================================================================
  function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const navMobile = document.getElementById('navMobile');
    const mobileLinks = document.querySelectorAll('.nav-mobile-link, .nav-mobile .btn');

    if (!menuToggle || !navMobile) return;

    const toggleMenu = (open) => {
      const isOpen = open !== undefined ? open : !navMobile.classList.contains('open');
      menuToggle.classList.toggle('open', isOpen);
      navMobile.classList.toggle('open', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      navMobile.setAttribute('aria-hidden', String(!isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    menuToggle.addEventListener('click', () => toggleMenu());

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => toggleMenu(false));
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMobile.classList.contains('open')) {
        toggleMenu(false);
      }
    });
  }

  // =========================================================================
  // 6. HERO CANVAS PARTICLE NETWORK
  // =========================================================================
  function initHeroCanvas() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let particles = [];
    const particleCount = Math.min(Math.floor((width * height) / 18000), 60);
    const maxDistance = 140;

    let mouse = { x: null, y: null, radius: 120 };

    window.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = Math.random() * 1.5 + 1;
        this.baseColor = Math.random() > 0.4 ? 'rgba(99, 102, 241,' : 'rgba(34, 211, 238,';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse proximity interaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.hypot(dx, dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            this.x -= Math.cos(angle) * force * 1.5;
            this.y -= Math.sin(angle) * force * 1.5;
          }
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${this.baseColor} 0.6)`;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    let animationFrameId;
    function animate() {
      ctx.clearRect(0, 0, width, height);

      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDistance) {
            const opacity = (1 - dist / maxDistance) * 0.22;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Update and draw particles
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    }

    // Only run when tab is visible
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        animate();
      }
    });

    animate();
  }

  // =========================================================================
  // 7. HERO TYPEWRITER EFFECT
  // =========================================================================
  function initTypewriter() {
    const el = document.getElementById('typewriterText');
    if (!el) return;

    const roles = CONFIG.typewriterRoles;
    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    const typeSpeed = 75;
    const deleteSpeed = 35;
    const holdTime = 2200;

    function tick() {
      const currentRole = roles[roleIdx];

      if (isDeleting) {
        el.textContent = currentRole.substring(0, charIdx - 1);
        charIdx--;
      } else {
        el.textContent = currentRole.substring(0, charIdx + 1);
        charIdx++;
      }

      let timeout = isDeleting ? deleteSpeed : typeSpeed;

      if (!isDeleting && charIdx === currentRole.length) {
        timeout = holdTime;
        isDeleting = true;
      } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        roleIdx = (roleIdx + 1) % roles.length;
        timeout = 400;
      }

      setTimeout(tick, timeout);
    }

    tick();
  }

  // =========================================================================
  // 8. PROJECTS FETCH & RENDER ENGINE
  // =========================================================================
  async function loadProjectsData() {
    try {
      const response = await fetch('./projects.json');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      processProjects(data);
    } catch (err) {
      console.warn('Projects.json fetch encountered an issue (e.g. file:// CORS). Using fallback data:', err);
      processProjects(FALLBACK_PROJECTS);
    }
  }

  function processProjects(data) {
    let combined = [];

    if (data.projects && Array.isArray(data.projects)) {
      combined = [...data.projects];
    }

    // Admin mode unseals hidden projects
    if (isAdmin && data._hidden_projects && Array.isArray(data._hidden_projects)) {
      combined = [...combined, ...data._hidden_projects];
    }

    allProjects = combined;
    updateFilterCounts();
    renderProjects();
  }

  function updateFilterCounts() {
    const countAll = document.getElementById('countAll');
    const countCode = document.getElementById('countCode');
    const countDesign = document.getElementById('countDesign');

    const totalCount = allProjects.length;
    const codeCount = allProjects.filter(p => p.category === 'code').length;
    const designCount = allProjects.filter(p => p.category === 'design').length;

    if (countAll) countAll.textContent = totalCount;
    if (countCode) countCode.textContent = codeCount;
    if (countDesign) countDesign.textContent = designCount;
  }

  function renderProjects() {
    const grid = document.getElementById('projectsGrid');
    const emptyState = document.getElementById('projectsEmptyState');
    if (!grid) return;

    // Filter by category
    let filtered = allProjects.filter(item => {
      if (currentFilter === 'all') return true;
      return item.category === currentFilter;
    });

    // Filter by search query
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(item => {
        const titleMatch = item.title.toLowerCase().includes(q);
        const descMatch = item.description.toLowerCase().includes(q);
        const tagsMatch = item.tags && item.tags.some(t => t.toLowerCase().includes(q));
        const badgeMatch = item.badge && item.badge.toLowerCase().includes(q);
        return titleMatch || descMatch || tagsMatch || badgeMatch;
      });
    }

    if (filtered.length === 0) {
      grid.innerHTML = '';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';

    grid.innerHTML = filtered.map(project => createProjectCardHTML(project)).join('');

    // Trigger IntersectionObserver on newly inserted cards
    observeElements(grid.querySelectorAll('.project-card'));
  }

  function createProjectCardHTML(p) {
    const isDesign = p.category === 'design';
    let badgeClass = 'project-badge-tag';
    if (p.badge === 'FEATURED') badgeClass += ' badge-featured';
    if (isDesign) badgeClass += ' badge-design';

    const tagsHTML = (p.tags || []).map(tag => 
      `<span class="project-tag-pill">${escapeHTML(tag)}</span>`
    ).join('');

    // Primary link & Github link logic
    let actionButtons = '';

    if (p.github) {
      actionButtons += `
        <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="project-link-btn" title="View GitHub Repository" aria-label="View source code on GitHub">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
          </svg>
          <span>Source</span>
        </a>
      `;
    }

    if (p.link) {
      let linkLabel = 'Explore';
      let linkIcon = `
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
        </svg>
      `;

      if (p.tool === 'figma' || p.link.includes('figma.com')) {
        linkLabel = 'Figma';
      } else if (p.tool === 'canva' || p.link.includes('canva.link')) {
        linkLabel = 'Canva';
      } else if (p.badge === 'FEATURED' || p.category === 'code') {
        linkLabel = 'Launch';
      }

      actionButtons += `
        <a href="${p.link}" target="_blank" rel="noopener noreferrer" class="project-link-btn primary-link" aria-label="${linkLabel} project">
          ${linkIcon}
          <span>${linkLabel}</span>
        </a>
      `;
    }

    return `
      <article class="project-card reveal" data-category="${p.category}">
        <div class="project-card-header">
          <span class="project-id-badge">${escapeHTML(p.id)}</span>
          <span class="${badgeClass}">${escapeHTML(p.badge || 'PROJECT')}</span>
        </div>

        <div class="project-media">
          <img 
            src="${p.image}" 
            alt="${escapeHTML(p.title)}" 
            class="project-thumbnail" 
            loading="lazy"
            onerror="this.src='https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80';"
          >
          <div class="project-media-overlay"></div>
        </div>

        <div class="project-body">
          <h3 class="project-title">${escapeHTML(p.title)}</h3>
          <p class="project-description">${escapeHTML(p.description)}</p>
          <div class="project-tags">${tagsHTML}</div>
          <div class="project-footer">
            <span class="font-mono" style="font-size:0.68rem; color:var(--text-muted); text-transform:uppercase;">
              ${isDesign ? (p.tool || 'Design') : 'Software System'}
            </span>
            <div class="project-links">${actionButtons}</div>
          </div>
        </div>
      </article>
    `;
  }

  function initProjectFilters() {
    const filterButtonsContainer = document.getElementById('projectFilterButtons');
    const searchInput = document.getElementById('projectSearchInput');
    const resetFiltersBtn = document.getElementById('resetProjectFilters');

    if (filterButtonsContainer) {
      filterButtonsContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;

        filterButtonsContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        currentFilter = btn.dataset.filter || 'all';
        renderProjects();
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderProjects();
      });
    }

    if (resetFiltersBtn) {
      resetFiltersBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        searchQuery = '';
        currentFilter = 'all';

        if (filterButtonsContainer) {
          filterButtonsContainer.querySelectorAll('.filter-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.filter === 'all');
          });
        }
        renderProjects();
      });
    }
  }

  // =========================================================================
  // 9. GITHUB LIVE TELEMETRY
  // =========================================================================
  async function initGithubTelemetry() {
    fetchGithubProfile();
    fetchGithubRecentRepos();
  }

  async function fetchGithubProfile() {
    const elRepos = document.getElementById('ghReposCount');
    const elFollowers = document.getElementById('ghFollowersCount');
    const elFollowing = document.getElementById('ghFollowingCount');
    const elGists = document.getElementById('ghGistsCount');

    try {
      const res = await fetch(CONFIG.userApiUrl);
      if (!res.ok) throw new Error('API Rate Limit or Network Error');
      const data = await res.json();

      animateCounter(elRepos, data.public_repos || 8);
      animateCounter(elFollowers, data.followers || 0);
      animateCounter(elFollowing, data.following || 1);
      animateCounter(elGists, data.public_gists || 0);
    } catch (err) {
      console.info('Using telemetry fallbacks for GitHub profile:', err);
      // Realistic baseline fallbacks
      animateCounter(elRepos, 8);
      animateCounter(elFollowers, 1);
      animateCounter(elFollowing, 2);
      animateCounter(elGists, 0);
    }
  }

  function animateCounter(element, target) {
    if (!element) return;
    const duration = 1200;
    const start = 0;
    const steps = 30;
    const stepTime = duration / steps;
    const increment = target / steps;
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, stepTime);
  }

  async function fetchGithubRecentRepos() {
    const reposGrid = document.getElementById('reposGrid');
    if (!reposGrid) return;

    try {
      const res = await fetch(CONFIG.reposApiUrl);
      if (!res.ok) throw new Error('Repo fetch failed');
      const repos = await res.json();
      renderRepos(repos.slice(0, 6));
    } catch (err) {
      console.info('Using curated recent repos fallback:', err);
      // Fallback repositories curated for Aman Kumar
      const fallbackRepos = [
        {
          name: 'StudyOS',
          description: 'Feature-rich Python terminal study application with task management, analytics, and JSON configurations.',
          html_url: 'https://github.com/kuaman-student/StudyOS',
          language: 'Python',
          stargazers_count: 0,
          forks_count: 0,
          updated_at: '2026-03-12T10:00:00Z'
        },
        {
          name: 'simcompanies-tools',
          description: 'Market monitoring and real-time automation tool for SimCompanies with Firebase RTDB integration.',
          html_url: 'https://github.com/kuaman-student/simcompanies-tools',
          language: 'Python',
          stargazers_count: 0,
          forks_count: 0,
          updated_at: '2026-02-28T14:30:00Z'
        },
        {
          name: 'engineering-branch-explorer',
          description: 'Interactive web application exploring IIT branch cutoffs, curriculum insights, and career directions.',
          html_url: 'https://github.com/kuaman-student/engineering-branch-explorer',
          language: 'JavaScript',
          stargazers_count: 0,
          forks_count: 0,
          updated_at: '2026-02-15T18:00:00Z'
        },
        {
          name: 'cpp-dsa-striver',
          description: 'C++ algorithms, data structures, and problem-solving tracking Striver A2Z DSA sheet.',
          html_url: 'https://github.com/kuaman-student/cpp-dsa-striver',
          language: 'C++',
          stargazers_count: 0,
          forks_count: 0,
          updated_at: '2026-02-10T09:15:00Z'
        },
        {
          name: 'quiz-master-arena',
          description: 'Web-based MCQ answer checker with custom answer keys, countdown timer, and analytics review.',
          html_url: 'https://github.com/kuaman-student/quiz-master-arena',
          language: 'JavaScript',
          stargazers_count: 0,
          forks_count: 0,
          updated_at: '2026-01-20T16:45:00Z'
        },
        {
          name: 'jee-ultimate-tracker',
          description: 'Web dashboard for JEE preparation syllabus tracking, study hours log, and countdown.',
          html_url: 'https://github.com/kuaman-student/jee-ultimate-tracker',
          language: 'JavaScript',
          stargazers_count: 0,
          forks_count: 0,
          updated_at: '2026-01-05T12:00:00Z'
        }
      ];
      renderRepos(fallbackRepos);
    }
  }

  function renderRepos(repos) {
    const reposGrid = document.getElementById('reposGrid');
    if (!reposGrid) return;

    const languageColors = {
      Python: '#3572A5',
      JavaScript: '#f1e05a',
      'C++': '#f34b7d',
      HTML: '#e34c26',
      CSS: '#563d7c',
      default: '#6366f1'
    };

    reposGrid.innerHTML = repos.map(repo => {
      const lang = repo.language || 'Code';
      const color = languageColors[lang] || languageColors.default;
      const updatedDate = new Date(repo.updated_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      });

      return `
        <div class="repo-card reveal">
          <div class="repo-card-top">
            <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="repo-name-link">
              ${escapeHTML(repo.name)}
            </a>
            <span class="repo-visibility">Public</span>
          </div>

          <p class="repo-desc">${escapeHTML(repo.description || 'No description provided for this repository.')}</p>

          <div class="repo-card-bottom">
            <div class="repo-lang-box">
              <span class="lang-circle" style="background-color: ${color}"></span>
              <span>${escapeHTML(lang)}</span>
            </div>

            <div class="repo-meta-counts">
              <span class="repo-meta-item" title="Stars">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                  <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.784 1.399 8.163L12 18.896l-7.333 3.86 1.399-8.163-5.934-5.784 8.2-1.192z"/>
                </svg>
                ${repo.stargazers_count}
              </span>
              <span class="repo-meta-item" title="Forks">
                <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="18" r="3"></circle>
                  <circle cx="6" cy="6" r="3"></circle>
                  <circle cx="18" cy="6" r="3"></circle>
                  <path d="M6 9v3a3 3 0 003 3h6a3 3 0 003-3V9"></path>
                </svg>
                ${repo.forks_count}
              </span>
              <span title="Last updated">${updatedDate}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');

    observeElements(reposGrid.querySelectorAll('.repo-card'));
  }

  // =========================================================================
  // 10. CONTACT FORM & CLIPBOARD ACTIONS
  // =========================================================================
  function initContactAndActions() {
    // Copy Email Button
    const copyEmailBtn = document.getElementById('copyEmailBtn');
    const copyBtnText = document.getElementById('copyBtnText');

    if (copyEmailBtn) {
      copyEmailBtn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(CONFIG.email);
          if (copyBtnText) copyBtnText.textContent = 'Copied!';
          showToast('Email address copied to clipboard!', 'success');
          setTimeout(() => {
            if (copyBtnText) copyBtnText.textContent = 'Copy';
          }, 2500);
        } catch (err) {
          // Fallback prompt
          window.prompt('Copy email address:', CONFIG.email);
        }
      });
    }

    // Terminal Quickbar Click
    const terminalQuickBar = document.getElementById('terminalQuickBar');
    if (terminalQuickBar) {
      terminalQuickBar.addEventListener('click', async () => {
        const cmd = 'curl -sL https://aman.dev/status';
        try {
          await navigator.clipboard.writeText(cmd);
          showToast(`Command copied: "${cmd}"`, 'success');
        } catch (e) {
          showToast(`Terminal query: ${cmd}`, 'info');
        }
      });
    }

    // Contact Form Submission Handler
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');
    const formSubmitBtn = document.getElementById('formSubmitBtn');

    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('contactName')?.value.trim() || '';
        const email = document.getElementById('contactEmail')?.value.trim() || '';
        const subject = document.getElementById('contactSubject')?.value.trim() || '';
        const message = document.getElementById('contactMessage')?.value.trim() || '';

        if (!name || !email || !subject || !message) {
          showFormFeedback('Please fill out all required transmission parameters.', 'error');
          return;
        }

        // Show dispatching indicator
        if (formSubmitBtn) {
          formSubmitBtn.disabled = true;
          formSubmitBtn.innerHTML = `
            <span class="loader-spinner" style="width:14px; height:14px; margin-bottom:0;"></span>
            <span>Dispatching...</span>
          `;
        }

        setTimeout(() => {
          // Build pre-filled mailto URL for direct transmission
          const mailtoUrl = `mailto:${CONFIG.email}?subject=${encodeURIComponent(`[Portfolio Inquiry] ${subject}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
          
          window.location.href = mailtoUrl;

          showFormFeedback('Transmission generated! Opening your mail client to dispatch...', 'success');
          showToast('Drafting message to amankr022008@gmail.com', 'success');

          contactForm.reset();

          if (formSubmitBtn) {
            formSubmitBtn.disabled = false;
            formSubmitBtn.innerHTML = `
              <span>Dispatch Transmission</span>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            `;
          }
        }, 700);
      });
    }

    function showFormFeedback(text, type) {
      if (!formFeedback) return;
      formFeedback.textContent = text;
      formFeedback.className = `form-feedback font-mono ${type}`;
      formFeedback.style.display = 'block';

      setTimeout(() => {
        formFeedback.style.display = 'none';
      }, 7000);
    }

    // Back to top button
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  // =========================================================================
  // 11. SCROLL REVEAL (INTERSECTION OBSERVER)
  // =========================================================================
  let revealObserver;
  function initScrollReveal() {
    const options = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    };

    revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, options);

    observeElements(document.querySelectorAll('.reveal'));
  }

  function observeElements(elements) {
    if (!revealObserver) return;
    elements.forEach(el => revealObserver.observe(el));
  }

  // Helper: Escape HTML to avoid XSS
  function escapeHTML(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // =========================================================================
  // INITIALIZE EVERYTHING
  // =========================================================================
  initAdminMode();
  initScrollTracking();
  initMobileMenu();
  initHeroCanvas();
  initTypewriter();
  initProjectFilters();
  loadProjectsData();
  initGithubTelemetry();
  initContactAndActions();
  initScrollReveal();

  console.log('%c[SYSTEM] Aman Kumar Portfolio Initialized — IIT Mandi EE', 'color: #6366f1; font-weight: bold; font-family: monospace;');
});
