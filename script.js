/* =============================================
   ATHARV DORLE — PORTFOLIO JAVASCRIPT
   script.js
   ============================================= */

/* =============================================
   1. NAVBAR — scroll shadow + active link highlight
   ============================================= */
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  // Add shadow when scrolled
  if (window.scrollY > 20) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Highlight active nav link based on scroll position
  let current = '';
  sections.forEach(sec => {
    const sectionTop = sec.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = sec.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

/* =============================================
   2. HAMBURGER MENU — mobile nav toggle
   ============================================= */
const hamburger = document.getElementById('hamburger');

// Create mobile nav dynamically from existing nav links
const mobileNav = document.createElement('div');
mobileNav.classList.add('mobile-nav');

const navItems = ['home','projects','skills','education','certificates','contact'];
navItems.forEach(item => {
  const a = document.createElement('a');
  a.href = `#${item}`;
  a.textContent = item.charAt(0).toUpperCase() + item.slice(1);
  a.addEventListener('click', closeMobileNav);
  mobileNav.appendChild(a);
});

// Mobile Resume link
const mobileResume = document.createElement('a');
mobileResume.href = 'assets/Resume.pdf';
mobileResume.target = '_blank';
mobileResume.textContent = 'Resume ↗';
mobileResume.classList.add('mobile-resume');
mobileResume.addEventListener('click', (e) => {
  closeMobileNav();
  handleResumeClick.call(mobileResume, e);
});
mobileNav.appendChild(mobileResume);

document.body.appendChild(mobileNav);

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
});

function closeMobileNav() {
  hamburger.classList.remove('open');
  mobileNav.classList.remove('open');
}

// Close mobile nav when clicking outside
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target) && !mobileNav.contains(e.target)) {
    closeMobileNav();
  }
});

/* =============================================
   3. TYPEWRITER EFFECT — hero section
   ============================================= */
const roles = [
  'AI Enthusiast',
  'Machine Learning Engineer',
  'Deep Learning Explorer',
  'Computer Vision Developer',
  'Full Stack Developer'
];

let roleIndex  = 0;
let charIndex  = 0;
let isDeleting = false;
const twEl     = document.getElementById('typewriter');

function typeWriter() {
  const currentWord = roles[roleIndex];

  if (!isDeleting) {
    // Typing forward
    twEl.textContent = currentWord.slice(0, ++charIndex);
    if (charIndex === currentWord.length) {
      // Pause at end of word then start deleting
      isDeleting = true;
      setTimeout(typeWriter, 1800);
      return;
    }
  } else {
    // Deleting
    twEl.textContent = currentWord.slice(0, --charIndex);
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex  = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeWriter, isDeleting ? 55 : 95);
}

typeWriter();

/* =============================================
   4. SCROLL REVEAL — project cards fade in one by one
   ============================================= */
const projectCards = document.querySelectorAll('.project-card');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 100);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

projectCards.forEach(card => revealObserver.observe(card));



/* =============================================
   5. SCROLL REVEAL — education, cert, contact cards
   ============================================= */
const fadeEls = document.querySelectorAll(
  '.edu-card, .cert-card, .contact-card, .skill-item'
);

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 60);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.06 });

fadeEls.forEach(el => {
  // Set initial hidden state
  el.style.opacity    = '0';
  el.style.transform  = 'translateY(22px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  fadeObserver.observe(el);
});

/* =============================================
   6. SCROLL DOWN INDICATOR — click to scroll to projects
   ============================================= */
const scrollDown = document.getElementById('scrollDown');
if (scrollDown) {
  scrollDown.addEventListener('click', () => {
    document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
  });
}

/* =============================================
   7. BACK TO TOP BUTTON — footer link
   ============================================= */
const backTop = document.getElementById('backTop');
if (backTop) {
  backTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* =============================================
   8. SKILL ITEM — tooltip on hover
   ============================================= */
const skillItems = document.querySelectorAll('.skill-item');

skillItems.forEach(item => {
  const name = item.querySelector('span').textContent;

  item.addEventListener('mouseenter', () => {
    item.title = name;
  });
});

/* =============================================
   9. ACTIVE SECTION HIGHLIGHT on nav click
   ============================================= */
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

/* =============================================
   10. CURSOR BLINK — typewriter cursor
   ============================================= */
// Already handled in CSS via .cursor class animation

/* =============================================
   11. DYNAMIC FOOTER YEAR
   ============================================= */
const yearEl = document.getElementById('current-year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

/* =============================================
   12. RESUME HANDLER & COPY EMAIL
   ============================================= */
function handleResumeClick(e) {
  const href = this.getAttribute('href');
  if (!href) return;
  fetch(href, { method: 'HEAD' })
    .then(resp => {
      if (!resp.ok) {
        e.preventDefault();
        showToast('📄 Resume will be available shortly! Please connect via LinkedIn or Email.');
      }
    })
    .catch(() => {
      e.preventDefault();
      showToast('📄 Resume will be available shortly! Please connect via LinkedIn or Email.');
    });
}

document.querySelectorAll('a[href*="Resume.pdf"]').forEach(link => {
  link.addEventListener('click', handleResumeClick);
});

const contactCards = document.querySelectorAll('.contact-card');

contactCards.forEach(card => {
  const href = card.getAttribute('href');
  if (href && href.startsWith('mailto:')) {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const email = href.replace('mailto:', '');
      if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
          showToast('📋 Email copied to clipboard!');
        });
      } else {
        window.location.href = href;
      }
    });
  }
});

/* =============================================
   13. TOAST NOTIFICATION — helper function
   ============================================= */
function showToast(message) {
  // Remove existing toast
  const existing = document.getElementById('toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'toast';
  toast.textContent = message;

  Object.assign(toast.style, {
    position:     'fixed',
    bottom:       '2rem',
    right:        '2rem',
    background:   'var(--gradient)',
    color:        '#fff',
    padding:      '0.75rem 1.3rem',
    borderRadius: '10px',
    fontSize:     '0.88rem',
    fontWeight:   '600',
    fontFamily:   "'Poppins', sans-serif",
    zIndex:       '9999',
    boxShadow:    '0 8px 30px rgba(0, 0, 0, 0.45)',
    border:       '1px solid rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    opacity:      '0',
    transform:    'translateY(10px)',
    transition:   'all 0.3s ease',
  });

  document.body.appendChild(toast);

  // Animate in
  setTimeout(() => {
    toast.style.opacity   = '1';
    toast.style.transform = 'translateY(0)';
  }, 10);

  // Animate out after 2.8s
  setTimeout(() => {
    toast.style.opacity   = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

/* =============================================
   14. SMOOTH SCROLL — all anchor links
   ============================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* =============================================
   15. THEME CUSTOMIZER — Change accent colors dynamically
   ============================================= */
const themeDefs = {
  purple: {
    accent: '#a855f7',
    accent2: '#ec4899',
    accent3: '#22d3ee',
    border: 'rgba(236, 72, 153, 0.22)',
    card: 'rgba(30, 20, 56, 0.55)',
    tagBg: 'rgba(168, 85, 247, 0.14)',
    tagColor: '#e3c9ff',
    tagBorder: 'rgba(168, 85, 247, 0.35)'
  },
  cyber: {
    accent: '#06b6d4',
    accent2: '#6366f1',
    accent3: '#ec4899',
    border: 'rgba(99, 102, 241, 0.25)',
    card: 'rgba(12, 20, 46, 0.55)',
    tagBg: 'rgba(6, 182, 212, 0.14)',
    tagColor: '#cffafe',
    tagBorder: 'rgba(6, 182, 212, 0.35)'
  },
  emerald: {
    accent: '#10b981',
    accent2: '#06b6d4',
    accent3: '#eab308',
    border: 'rgba(6, 182, 212, 0.25)',
    card: 'rgba(12, 38, 28, 0.55)',
    tagBg: 'rgba(16, 185, 129, 0.14)',
    tagColor: '#d1fae5',
    tagBorder: 'rgba(16, 185, 129, 0.35)'
  },
  solar: {
    accent: '#f97316',
    accent2: '#ef4444',
    accent3: '#ec4899',
    border: 'rgba(239, 68, 68, 0.25)',
    card: 'rgba(46, 18, 12, 0.55)',
    tagBg: 'rgba(249, 115, 22, 0.14)',
    tagColor: '#ffedd5',
    tagBorder: 'rgba(249, 115, 22, 0.35)'
  }
};

const themeDots = document.querySelectorAll('.theme-dot');

function applyTheme(themeName) {
  const definition = themeDefs[themeName] || themeDefs.purple;
  const root = document.documentElement;

  root.style.setProperty('--accent', definition.accent);
  root.style.setProperty('--accent2', definition.accent2);
  root.style.setProperty('--accent3', definition.accent3);
  root.style.setProperty('--border', definition.border);
  root.style.setProperty('--card', definition.card);
  root.style.setProperty('--tag-bg', definition.tagBg);
  root.style.setProperty('--tag-color', definition.tagColor);
  root.style.setProperty('--tag-border', definition.tagBorder);

  themeDots.forEach(dot => {
    dot.classList.toggle('active', dot.dataset.theme === themeName);
  });

  localStorage.setItem('portfolioTheme', themeName);

  if (window.updateParticleTheme) {
    window.updateParticleTheme(definition.accent, definition.accent2, definition.accent3);
  }
}

themeDots.forEach(dot => {
  dot.addEventListener('click', () => {
    applyTheme(dot.dataset.theme);
  });
});

applyTheme(localStorage.getItem('portfolioTheme') || 'purple');

/* =============================================
   16. PARTICLE NETWORK BACKGROUND — animated tech grid
   ============================================= */
(function initParticleNetwork() {
  const canvas = document.getElementById('particle-network');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let themeColors = ['#a855f7', '#ec4899', '#22d3ee'];
  let linkRgb = '180, 140, 255';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const LINK_DIST = 170;

  function hexToRgb(hex) {
    const clean = hex.replace('#', '');
    const num = parseInt(clean, 16);
    return `${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}`;
  }

  window.updateParticleTheme = function(c1, c2, c3) {
    themeColors = [c1, c2, c3];
    linkRgb = hexToRgb(c1);
    particles.forEach(p => {
      p.color = themeColors[Math.floor(Math.random() * themeColors.length)];
    });
  };

  let particles = [];
  let width, height, dpr;
  let animationId = null;

  function resize() {
    dpr = window.devicePixelRatio || 1;
    width  = window.innerWidth;
    height = window.innerHeight;
    canvas.width  = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width  = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const count = Math.min(130, Math.max(40, Math.round((width * height) / 11000)));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.6 + 0.9,
      color: themeColors[Math.floor(Math.random() * themeColors.length)],
    }));
  }

  function drawDots() {
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = 0.55;
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }

  function drawLinks() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < LINK_DIST) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(${linkRgb}, ${0.45 * (1 - dist / LINK_DIST)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
  }

  function step() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x <= 0 || p.x >= width)  p.vx *= -1;
      if (p.y <= 0 || p.y >= height) p.vy *= -1;
    });

    drawDots();
    drawLinks();

    animationId = requestAnimationFrame(step);
  }

  function drawStatic() {
    ctx.clearRect(0, 0, width, height);
    drawDots();
    drawLinks();
  }

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      resize();
      if (reduceMotion) drawStatic();
    }, 150);
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    } else if (!reduceMotion) {
      if (!animationId) step();
    }
  });

  resize();
  if (reduceMotion) {
    drawStatic();
  } else {
    step();
  }

  // Sync initial theme colors with particles
  const currentSaved = localStorage.getItem('portfolioTheme') || 'purple';
  const def = themeDefs[currentSaved] || themeDefs.purple;
  window.updateParticleTheme(def.accent, def.accent2, def.accent3);
})();
